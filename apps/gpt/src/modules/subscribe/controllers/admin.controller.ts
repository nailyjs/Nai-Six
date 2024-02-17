import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Body, Controller, Delete, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PostGPTSubscribeAdminBodyDTO, PostGPTSubscribeBodyDTO } from "../dtos/subscribe.dto";
import { ResInterceptor } from "cc.naily.six.shared";
import { Auth, MustPermissions } from "cc.naily.six.auth";

@ApiTags("管理套餐 仅管理员")
@Controller("gpt/subscribe/admin")
export class AdminSubscribeController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 创建GPT订阅套餐
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {PostGPTSubscribeAdminBodyDTO} { name, description, price, days }
   * @memberof AdminSubscribeController
   */
  @Post()
  @Auth()
  @MustPermissions("Must_Admin", "Must_GPT_Admin")
  @UseInterceptors(ResInterceptor)
  public createSubscribePackage(@Body() { name, description, price, days }: PostGPTSubscribeAdminBodyDTO) {
    return this.prismaService.gPTSubscribePackage.create({
      data: {
        name,
        description,
        price,
        days,
      },
    });
  }

  /**
   * 删除GPT订阅套餐
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @memberof AdminSubscribeController
   */
  @Delete()
  @Auth()
  @UseInterceptors(ResInterceptor)
  @MustPermissions("Must_Admin", "Must_GPT_Admin")
  public deleteSubscribePackage(@Body() { packageID }: PostGPTSubscribeBodyDTO) {
    return this.prismaService.gPTSubscribePackage.deleteMany({
      where: { packageID },
    });
  }
}
