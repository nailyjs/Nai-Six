import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";

@Injectable()
export class GPTService {
  public readonly openai: OpenAI;

  constructor(configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: configService.get("gpt.openai.apiKey"),
      baseURL: configService.get("gpt.openai.baseURL"),
      timeout: configService.get("gpt.openai.timeout") || 10000,
    });
  }
}
