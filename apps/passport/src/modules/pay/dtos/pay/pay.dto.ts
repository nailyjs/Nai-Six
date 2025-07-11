import { IsIn, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min } from "class-validator";
import { IPayType, PayTypeArray } from "../../interfaces/interface.impl";
import { ApiProperty } from "@nestjs/swagger";
import { MaxPoint } from "cc.naily.six.shared";

export class PostUserPayBodyDTO {
  /**
   * 支付类型 请看schema enum再取值
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {IPayType}
   * @memberof PostUserPayBodyDTO
   */
  @IsIn(PayTypeArray)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "支付类型 请看schema enum再取值",
    enum: PayTypeArray,
  })
  payType: IPayType;
  /**
   * 金额 单位元，允许小数点后两位
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {number}
   * @memberof PostUserPayBodyDTO
   */
  @MaxPoint(2)
  @Min(0.01)
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  /**
   * 商品名称
   *
   * @type {string}
   * @memberof PostUserPayBodyDTO
   */
  @IsIn(["腕上浏览器一个月会员", "腕上浏览器一年会员"])
  @IsString()
  @IsOptional()
  productName?: string;
  /**
   * 更多充值选项。比如当支付类型为Wechat_Official时，必须传入`extraOptions.openid`，否则会报错
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {Record<string, any>}
   * @memberof PostUserPayBodyDTO
   */
  @IsOptional()
  @IsObject()
  extraOptions?: Record<string, any>;
}

export class PostUserPayV2BodyDTO {
  /**
   * productID
   *
   * @type {string}
   * @memberof PostUserPayV2BodyDTO
   */
  @IsIn(["9fdbcbe1-110f-4057-8b0f-0409bd34de63", "8adfe225-963b-4d5f-ab6b-da8c46855488"])
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "productID",
  })
  productID: string;
}

export class PayXunhupayQueryDTO {
  /**
   * 支付类型 请看schema enum再取值
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {IPayType}
   * @memberof PayXunhupayQueryDTO
   */
  @IsIn(PayTypeArray)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "支付类型 请看schema enum再取值",
    enum: PayTypeArray,
  })
  payType: IPayType;
  /**
   * 订单号
   *
   * @type {string}
   * @memberof PayXunhupayQueryDTO
   */
  orderID: string;
}
