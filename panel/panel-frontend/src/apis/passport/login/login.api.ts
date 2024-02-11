import type { AxiosInstance } from "axios";
import Joi from "joi";

export function loginByPhone(instance: AxiosInstance, phone: string, code: number) {
  return instance.post("/login/phone/code", { phone, code });
}

export function loginByEmail(instance: AxiosInstance, email: string, code: number) {
  return instance.post("/login/email/code", { email, code });
}

export function validateLoginResponse(data: unknown) {
  return Joi.object({
    statusCode: Joi.number().required(),
    message: Joi.string().required(),
    data: Joi.object({
      access_token: Joi.string().required(),
    }),
    timestamp: Joi.string().required(),
  }).validate(data);
}
