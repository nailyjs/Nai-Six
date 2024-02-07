import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CommonLogger } from "cc.naily.six.shared";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";

@Injectable()
export class ScriptFileService {
  private readonly scriptPath = join(process.env.RESOURCE_ROOT, "cache", "script");

  constructor(private readonly commonLogger: CommonLogger) {
    if (!existsSync(this.scriptPath)) {
      mkdirSync(this.scriptPath, { recursive: true });
    }
  }

  public addCacheScript(originalname: string, buffer: Buffer, randomOruserID: string = Math.random().toString()): [string, () => void] {
    const serverPath = join(this.scriptPath, `${randomOruserID}-${new Date().getTime()}-${originalname}`);
    try {
      writeFileSync(serverPath, buffer);
    } catch (error) {
      console.error(error);
      this.commonLogger.error("添加缓存脚本失败!!请立马排查权限,错误信息:", JSON.stringify(error));
      throw new InternalServerErrorException(1067);
    }
    let count = 0;
    const clear = () => {
      try {
        unlinkSync(serverPath);
      } catch (error) {
        if (count < 5) {
          console.error(error);
          clear();
          count++;
        }
      }
    };
    return [serverPath, clear];
  }
}
