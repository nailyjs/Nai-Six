import { IsNotEmpty, IsString } from "class-validator";

export class UserDeveloperAllDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
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
