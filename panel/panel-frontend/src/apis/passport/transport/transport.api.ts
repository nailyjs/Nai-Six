import type { AxiosInstance } from "axios";
import Joi from "joi";

export function validateCode(code: string) {
  Joi.assert(
    code,
    Joi.string()
      .pattern(/^\d{6}$/)
      .required(),
  );
}

export function sendMailCode(instance: AxiosInstance, email: string) {
  return instance.post("/transport/email", { email });
}

export function sendSmsCode(instance: AxiosInstance, phone: string) {
  return instance.post("/transport/sms", { phone });
}

export function validateSendMailCodeResponse(data: unknown) {
  Joi.assert(
    data,
    Joi.object({
      statusCode: Joi.number().required(),
      code: Joi.number().valid(1012).required(),
      message: Joi.string().required(),
      timestamp: Joi.string().required(),
    }),
  );
}
