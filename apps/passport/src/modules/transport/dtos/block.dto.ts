import { IsString } from "class-validator";

export class BlockDTO {
  @IsString()
  data: string;
}
