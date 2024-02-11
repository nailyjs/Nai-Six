import { IsIn, IsNumberString, IsOptional, IsString } from "class-validator";
import { CreatedAtEnum, CreatedAtEnumArray, UpdatedAtEnum, UpdatedAtEnumArray } from "../../enums/order.enum";

export class GetUserReceiptQueryDTO {
  /**
   * 根据订单排序时间排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {UpdatedAtEnum}
   * @memberof GetUserReceiptQueryDTO
   */
  @IsIn(CreatedAtEnumArray)
  @IsString()
  @IsOptional()
  orderCreatedAt?: CreatedAtEnum;
  /**
   * 根据订单更新时间排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {UpdatedAtEnum}
   * @memberof GetUserReceiptQueryDTO
   */
  @IsIn(UpdatedAtEnumArray)
  @IsString()
  @IsOptional()
  orderUpdatedAt?: UpdatedAtEnum;
  /**
   * 获取数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {number}
   * @memberof GetUserReceiptQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  take?: number;
  /**
   * 跳过数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {number}
   * @memberof GetUserReceiptQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  skip?: number;
}
