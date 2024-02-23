import { Injectable } from "@nestjs/common";
import { hashSync, compareSync, genSaltSync } from "bcrypt";

@Injectable()
export class HashUtil {
  private static getTimestamp() {
    const time = new Date().toTimeString().split(":");
    const date = new Date().toDateString();
    return new Date(`${date} ${time[0]}:${time[1]}`).getTime();
  }

  public static generateHash(hash: string) {
    const raw = this.getTimestamp() + "|||" + hash;
    const data = hashSync(raw, genSaltSync());
    return data;
  }

  public static compareHash(bcrypted: string, hash: string) {
    const raw = this.getTimestamp() + "|||" + hash;
    return compareSync(raw, bcrypted);
  }
}
