import { ILoginType, ILoginMethod } from "@prisma/client";

export const LoginMethod: ILoginMethod[] = ["QrCode", "PhoneCode", "EmailCode", "UsernamePassword"];
export const LoginType: ILoginType[] = ["WatchOS", "HarmonyOS_Wearable", "Android", "Web", "IOS", "Panel"];

export interface LoginIdentifier {
  loginType: ILoginType;
  identifier?: string;
  loginClient?: string;
  loginMethod?: ILoginMethod;
}

export interface JwtLoginPayload extends LoginIdentifier {
  userID: string;
}
