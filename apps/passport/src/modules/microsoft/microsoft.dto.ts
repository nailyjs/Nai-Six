import { IsNotEmpty, IsString } from "class-validator";

export class PostMicrosoftBodyDTO {
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
