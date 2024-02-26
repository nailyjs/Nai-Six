import { Injectable } from "@nestjs/common";
import { EmailService } from "src/modules/transport/providers/email.service";
import { PhoneService } from "src/modules/transport/providers/phone.service";

@Injectable()
export class ChangeService {
  constructor(
    private readonly emailService: EmailService,
    private readonly phoneService: PhoneService,
  ) {}

  public verifyCode(type: "email" | "phone", code: number, value: string) {
    if (type === "email") {
      return this.emailService.checkCode(value, code);
    } else if (type === "phone") {
      return this.phoneService.checkCode(value, code);
    }
  }
}
