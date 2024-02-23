import { IsInt, IsNotEmpty, IsNumber, IsString, IsUrl, Max, Min } from "class-validator";

export class PostConnectionCheckCustomBodyDTO {
  @IsUrl({ require_protocol: true, require_host: true })
  @IsString()
  @IsNotEmpty()
  host: string;

  @Min(1)
  @Max(65535)
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  port: number;
}
