import { User } from "@prisma/client";

export type IPayType = "Xunhupay_Alipay" | "Xunhupay_Wechat" | "Wechat_Official";
export const PayTypeArray: IPayType[] = ["Xunhupay_Alipay", "Xunhupay_Wechat", "Wechat_Official"];

export interface PayServiceImpl {
  pay(amount: number, payType: IPayType, user: User, productName: string): Promise<any>;
  notify(body: any): Promise<any>;
}
