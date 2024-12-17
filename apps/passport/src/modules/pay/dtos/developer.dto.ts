import { IsString } from "class-validator";

export class PostPayDeveloperRefundBodyDTO {
  @IsString()
  reason: string;

  @IsString()
  userReceiptID: string;
}
