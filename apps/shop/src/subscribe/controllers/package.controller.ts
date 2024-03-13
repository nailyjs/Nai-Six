import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { BadRequestException, Body, Controller, Delete, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { GetSubscribePackageQueryDTO, PostSubscribePackageBodyDTO } from "../dtos/package.dto";
import { Auth, JwtLoginPayload, MustPermissions, User } from "cc.naily.six.auth";

@ApiTags("订阅套餐")
@Controller("subscribe/package")
export class PackageController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 获取订阅套餐列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @memberof PackageController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  public getSubscribePackages(@Query() query: GetSubscribePackageQueryDTO) {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    if ((query.filterIsOnSale as unknown as "true" | "false") === "true") query.filterIsOnSale = true;
    if ((query.filterIsOnSale as unknown as "true" | "false") === "false") query.filterIsOnSale = false;
    return this.prismaService.shopSubscribePackage.findMany({
      where: {
        authorID: {
          in: query.filterAuthorUserID
            ? Array.isArray(query.filterAuthorUserID)
              ? query.filterAuthorUserID
              : [query.filterAuthorUserID]
            : undefined,
        },
        isOnSale: query.filterIsOnSale ? query.filterIsOnSale : undefined,
      },
      orderBy: {
        createdAt: query.orderCreatedAt || undefined,
        updatedAt: query.orderUpdatedAt || undefined,
        days: query.orderDay || undefined,
        price: query.orderPrice || undefined,
      },
      take: parseInt(query.take as unknown as string) || 10,
      skip: parseInt(query.skip as unknown as string) || 0,
    });
  }

  /**
   * 根据ID获取单个订阅套餐
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/03/13
   * @param {string} packageID
   * @memberof PackageController
   */
  @Get("single")
  @UseInterceptors(ResInterceptor)
  public async getSubscribePackage(@Query("packageID") packageID: string) {
    const data = await this.prismaService.shopSubscribePackage.findUnique({
      where: { packageID },
    });
    if (!data) throw new BadRequestException(1084);
    return data;
  }

  /**
   * 创建订阅套餐
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @param {PostSubscribePackageBodyDTO} body
   * @param {JwtLoginPayload} user
   * @memberof PackageController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  @MustPermissions("Must_Can_Create_Shop_Subscribe_Package", "Must_Admin")
  @ApiOperation({ summary: "创建订阅套餐", description: "必须有`Must_Can_Create_Shop_Subscribe_Package`或`Must_Admin`权限的用户才可以创建" })
  public async createSubscribePackage(@Body() body: PostSubscribePackageBodyDTO, @User() user: JwtLoginPayload) {
    const checkName = await this.prismaService.shopSubscribePackage.findFirst({
      where: { name: body.name },
    });
    if (checkName) throw new BadRequestException(1085);
    return this.prismaService.shopSubscribePackage.create({
      data: {
        name: body.name,
        days: body.days,
        author: { connect: { userID: user.userID } },
        price: body.price,
        description: body.description,
      },
    });
  }

  /**
   * 下架订阅套餐
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @memberof PackageController
   */
  @Auth()
  @Delete()
  @UseInterceptors(ResInterceptor)
  // @MustPermissions("Must_Can_Create_Shop_Subscribe_Package", "Must_Admin")
  @ApiOperation({ summary: "下架订阅套餐", description: "必须有`Must_Can_Create_Shop_Subscribe_Package`或`Must_Admin`权限的用户才可以删除" })
  public async deleteSubscribePackage(@Body() body) {
    const packageInfo = await this.prismaService.shopSubscribePackage.findUnique({
      where: { packageID: body.packageID },
    });
    if (packageInfo.isOnSale === false) throw new BadRequestException(1088);
    return this.prismaService.shopSubscribePackage.update({
      where: { packageID: body.packageID },
      data: { isOnSale: false },
    });
  }
}
