import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NailyContext, ResInterceptor } from "cc.naily.six.shared";
import { ConnectionCheckerService, ServiceConnection } from "../providers/checker.service";
import { PostConnectionCheckCustomBodyDTO } from "../dtos/connection.dto";

@ApiTags("服务发现")
@Controller("connection")
export class ConnectionController extends NailyContext {
  constructor(private readonly checkerService: ConnectionCheckerService) {
    super();
  }

  /**
   * 检查默认连接
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/23
   * @memberof ConnectionController
   */
  @Post("check/default")
  @UseInterceptors(ResInterceptor)
  public async checkDefaultConnection() {
    return {
      services: await Promise.all(
        this.checkerService.keys.map(async (key) => {
          const service: ServiceConnection = ConnectionController.ymlConfigCache[key];
          return {
            name: key,
            host: service.host,
            port: service.port,
            state: await this.checkerService.checkStatus(service.host, service.port),
          };
        }),
      ),
    };
  }

  /**
   * 检查自定义连接
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/24
   * @param {PostConnectionCheckCustomBodyDTO} body
   * @memberof ConnectionController
   */
  @Post("check/custom")
  @UseInterceptors(ResInterceptor)
  public checkCustomConnection(@Body() body: PostConnectionCheckCustomBodyDTO) {
    return this.checkerService.checkStatus(body.host, body.port);
  }
}
