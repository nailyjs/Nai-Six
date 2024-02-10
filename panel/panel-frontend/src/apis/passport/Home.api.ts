import joi from "joi";

export function checkPassportAddressResponse(data: unknown) {
  const validated = joi
    .object({
      statusCode: joi.number().allow(200).required(),
      code: joi.number().allow(1000).required(),
      message: joi.string().allow("成功").required(),
      timestamp: joi.string().required(),
    })
    .validate(typeof data === "object" ? data : JSON.parse(data as string));
  return validated;
}
