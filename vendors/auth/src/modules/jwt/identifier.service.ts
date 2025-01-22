import { Injectable } from "@nestjs/common";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { ILoginMethod, ILoginType, User, UserIdentifier } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { JwtLoginPayload } from "./jwt.protocol";

export interface ILoginPayload {
  loginType: ILoginType;
  loginMethod: ILoginMethod;
  loginIP: string;
  loginClient?: string;
  loginDeviceName: string;
  identifier?: string;
}

@Injectable()
export class CommonIdentifierService {
  private readonly WatchOS: number;
  private readonly Android: number;
  private readonly Web: number;
  private readonly HarmonyOS_Wearable: number;
  private readonly IOS: number;
  private readonly Panel: number;

  constructor(
    private readonly prismaService: PrismaService,
    configService: ConfigService,
  ) {
    const maxIdentifierCount = configService.getOrThrow<Record<ILoginType, number>>("passport.maxIdentifierCount");
    for (const loginTypekey in maxIdentifierCount) {
      this[loginTypekey] = maxIdentifierCount[loginTypekey];
    }
  }

  public getMaxIdentifierCount(loginType: ILoginType): number {
    return this[loginType];
  }

  /**
   * 需要保护的路由：检查登录标识符是否存在，jwtpayload参数有问题则返回`ERROR`
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {JwtLoginPayload} jwtPayload
   * @return {Promise<"ERROR">}
   * @memberof CommonIdentifierService
   */
  public async checkIdentifier(jwtPayload: JwtLoginPayload): Promise<"ERROR">;
  /**
   * 需要保护的路由：检查登录标识符是否存在，jwtpayload参数没问题但是没找到identifier则返回`NOT_FOUND`
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {JwtLoginPayload} jwtPayload
   * @return {Promise<"NOT_FOUND">}
   * @memberof CommonIdentifierService
   */
  public async checkIdentifier(jwtPayload: JwtLoginPayload): Promise<"NOT_FOUND">;
  /**
   * 需要保护的路由：检查登录标识符是否存在，jwtpayload参数没问题且找到identifier则返回`OK`
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {JwtLoginPayload} jwtPayload
   * @return {Promise<"ERROR" | "NOT_FOUND" | "OK">}
   * @memberof CommonIdentifierService
   */
  public async checkIdentifier(jwtPayload: JwtLoginPayload): Promise<"ERROR" | "NOT_FOUND" | "OK"> {
    const loginType = jwtPayload.loginType;
    const loginMethod = jwtPayload.loginMethod;
    const loginClient = jwtPayload.loginClient;
    const identifier = jwtPayload.identifier;
    const userID = jwtPayload.userID;
    if (!jwtPayload || !loginType || !loginMethod || !loginClient || !identifier || !userID) {
      return "ERROR";
    }
    const findIdentifier = await this.prismaService.userIdentifier.findFirst({
      where: {
        loginMethod,
        loginType,
        loginClient,
        identifier,
        userID,
      },
    });
    if (!findIdentifier) return "NOT_FOUND";
    return "OK";
  }

  /**
   * 登录时：创建新的登录标识符
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {User} user
   * @param {ILoginPayload} loginPayload
   * @memberof CommonIdentifierService
   */
  public async renewIdentifier(user: User, loginPayload: ILoginPayload) {
    const { loginType, loginMethod, loginIP, loginClient, loginDeviceName, identifier } = loginPayload;
    // Web端登录时，identifier和loginClient可以为空
    // 其他端登录时，identifier不能为空
    if (loginType !== "Web" && (!identifier || !loginClient || !loginMethod)) return "ERROR";
    // 找到当前用户的所有identifier
    const identifiers = await this.prismaService.userIdentifier.findMany({
      where: {
        userID: user.userID,
      },
    });
    // 找到当前登录标识符
    const singleIdentifier = identifiers.find(
      (item) =>
        item.identifier === identifier &&
        item.loginType === loginType &&
        item.loginClient === loginClient &&
        item.loginMethod === loginMethod &&
        item.loginDeviceName === loginDeviceName,
    );
    // 如果当前登录标识符存在，则不需要创建新的登录标识符 直接返回给上层
    if (singleIdentifier) return singleIdentifier;
    // 标识符最大数量 从配置文件中获取
    const maxCount = this.getMaxIdentifierCount(loginType);
    // 如果登录标识符数量超过最大数量，则删除最早的登录标识符
    // 删除最早的登录标识符 保留最新的maxCount - 1个登录标识符
    const willRemoveIdentifiers: UserIdentifier[] = identifiers.slice(0, identifiers.length - maxCount + 1);
    await this.prismaService.userIdentifier.deleteMany({
      where: {
        identifier: {
          in: willRemoveIdentifiers.map((item) => item.identifier),
        },
      },
    });
    // 创建新的登录标识符
    return this.prismaService.userIdentifier.create({
      data: {
        identifier,
        loginType,
        loginMethod,
        loginIP,
        loginClient,
        loginDeviceName,
        user: {
          connect: {
            userID: user.userID,
          },
        },
      },
    });
  }
}
