import joi from "joi";

export function checkBackendAddressResponse(data: unknown, random: string) {
  const validated = joi
    .object({
      statusCode: joi.number().allow(200).required(),
      code: joi.number().allow(1000).required(),
      message: "backend" + random,
      timestamp: joi.string().required(),
    })
    .validate(typeof data === "object" ? data : JSON.parse(data as string));
  return validated;
}
