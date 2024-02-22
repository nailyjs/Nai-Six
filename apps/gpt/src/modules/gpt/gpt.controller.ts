import { Body, Controller, MessageEvent, Sse } from "@nestjs/common";
import { ApiExtraModels, ApiTags } from "@nestjs/swagger";
import { GPTService } from "./gpt.service";
import { Observable, from, map } from "rxjs";
import { Auth } from "cc.naily.six.auth";
import {
  ChatCompletionContentPartImageDTO,
  ChatCompletionContentPartTextDTO,
  ChatCompletionSystemMessageParamDTO,
  ChatCompletionUserMessageParamDTO,
  SSEGPTChatBodyDTO,
} from "./gpt.dto";
import { randomUUID } from "crypto";

@ApiTags("GPT")
@Controller("gpt/chat")
export class GPTController {
  constructor(private readonly gptService: GPTService) {}

  /**
   * GPT聊天接口
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @param {SSEGPTChatBodyDTO} body
   * @return {Promise<Observable<MessageEvent>>}
   * @memberof GPTController
   */
  @Sse()
  @Auth()
  @ApiExtraModels(
    ChatCompletionSystemMessageParamDTO,
    ChatCompletionUserMessageParamDTO,
    ChatCompletionContentPartTextDTO,
    ChatCompletionContentPartImageDTO,
  )
  async chat(@Body() body: SSEGPTChatBodyDTO): Promise<Observable<MessageEvent>> {
    const response = await this.gptService.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: body.messages,
      stream: true,
    });

    return from(response).pipe(
      map((res) => {
        return {
          data: res,
          type: "chat",
          id: res && res.id ? res.id : randomUUID(),
          retry: 10000,
        };
      }),
    );
  }
}
