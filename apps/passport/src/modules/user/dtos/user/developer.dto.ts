import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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
  subscribeID: string;

  @IsNumber()
  days: number;
}

export class UserDeveloperReceiptDTO {
  @IsString()
  userID: string;
}

export class UserDeveloperReceiptSingleDTO {
  @IsString()
  userReceiptID: string;
}
