import { IsOptional, IsString } from "class-validator";

export class UserDeveloperAllDTO {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  phone: string;
}

export class UserDeveloperAllSubscribedDTO {
  @IsString()
  userID: string;
}

export class UserDeveloperDeleteSubscribeDTO {
  @IsString()
  subscribeID: string;
}

export class UserDeveloperCreateSubscribeDTO {
  @IsString()
  userID: string;

  @IsString()
  packageID: string;
}

export class UserDeveloperReceiptDTO {
  @IsString()
  userID: string;
}

export class UserDeveloperReceiptSingleDTO {
  @IsString()
  orderID: string;
}

export class UserDeveloperOrderRefundDTO {
  @IsString()
  orderID: string;
}

export class UserDeveloperUserDTO {
  @IsString()
  userID: string;
}
