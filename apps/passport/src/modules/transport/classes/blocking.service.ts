import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.DEFAULT })
export class BlockingService {
  private readonly blockList: string[] = [];

  public async block(verifyData: string) {
    this.blockList.push(verifyData);
    return "block";
  }

  public async unblock(verifyData: string) {
    this.blockList.splice(this.blockList.indexOf(verifyData), 1);
    return "unblock";
  }

  public async checkBlock(verifyData: string) {
    return this.blockList.includes(verifyData);
  }
}
