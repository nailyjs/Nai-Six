import { Injectable } from "@nestjs/common";
import { AfterListen, BeforeListen } from "@nailyjs.nest.modules/prisma";
import { CommonLogger } from "cc.naily.six.shared";

@Injectable()
export class UserLoggerSubscriber {
  constructor(private readonly commonLogger: CommonLogger) {
    commonLogger.setContext(UserLoggerSubscriber.name);
  }

  @BeforeListen("user", "findMany")
  public beforeListenUserFindMany() {
    console.log("User findMany!");
  }

  /**
   * 用户创建后的监听器
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/04
   * @memberof UserLoggerSubscriber
   */
  @AfterListen("user", "create")
  public afterListenUserCreate() {
    this.commonLogger.log("User created!");
  }
}
