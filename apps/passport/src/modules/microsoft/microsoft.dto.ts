import { IsNotEmpty, IsString } from "class-validator";

export class PostAndPutMicrosoftBodyDTO {
  /**
   * 微软账号邮箱
   *
   * @type {string}
   * @memberof PostMicrosoftBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  info: string;
}
