import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { getSchemaPath } from "@nestjs/swagger";

export class ChatCompletionSystemMessageParamDTO {
  /**
   * zh-CN: 系统消息的内容。
   */
  content: string;

  /**
   * 消息作者的角色，这里是 `system`。
   */
  role: "system";

  /**
   * zh-CN: 参与者的可选名称。提供模型信息以区分相同角色的参与者。
   */
  name?: string;
}

export class ChatCompletionContentPartTextDTO {
  /**
   * 文本内容。
   */
  text: string;

  /**
   * 内容部分的类型。这里是`text`。
   */
  type: "text";
}

export class ImageURLDTO {
  /**
   * 图像的URL或base64编码的图像数据。
   */
  url: string;

  /**
   * 指定图像的细节级别。在[视觉指南](https://platform.openai.com/docs/guides/vision/low-or-high-fidelity-image-understanding)中了解更多。
   */
  detail?: "auto" | "low" | "high";
}

export class ChatCompletionContentPartImageDTO {
  image_url: ImageURLDTO;

  /**
   * 内容部分的类型。这里是`image_url`。
   */
  type: "image_url";
}

export class ChatCompletionUserMessageParamDTO {
  /**
   * 消息的内容。
   */
  @ApiProperty({
    oneOf: [
      { type: "string" },
      {
        type: "array",
        items: { oneOf: [{ $ref: getSchemaPath(ChatCompletionContentPartTextDTO) }, { $ref: getSchemaPath(ChatCompletionContentPartImageDTO) }] },
      },
    ],
  })
  content: string | Array<ChatCompletionContentPartTextDTO | ChatCompletionContentPartImageDTO>;

  /**
   * 消息作者的角色，这里是 `user`。
   */
  role: "user";

  /**
   * 参与者的可选名称。提供模型信息以区分相同角色的参与者。
   */
  name?: string;
}

export class SSEGPTChatBodyDTO {
  /**
   * 要使用的模型的名称 限制必须是字符串
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @type {string}
   * @memberof SSEGPTChatBodyDTO
   * @example "gpt-3.5-turbo"
   * @example "gpt-4"
   */
  @IsString()
  @IsNotEmpty()
  model: string;
  /**
   * 要发送的消息 限制必须是数组
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @type {Array<any>}
   * @memberof SSEGPTChatBodyDTO
   */
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    isArray: true,
    anyOf: [{ $ref: getSchemaPath(ChatCompletionSystemMessageParamDTO) }, { $ref: getSchemaPath(ChatCompletionUserMessageParamDTO) }],
  })
  messages: Array<ChatCompletionSystemMessageParamDTO | ChatCompletionUserMessageParamDTO>;
}
