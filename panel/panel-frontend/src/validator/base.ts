import { z } from 'zod'

const ResponseSchema = z.object({
  statusCode: z.number(),
  code: z.number().or(z.string()),
  message: z.string(),
  data: z.any(),
  timestamp: z.string()
})
export type ResponseType = z.infer<typeof ResponseSchema>

const PipeErrorResponseSchema = z.object({
  statusCode: z.number(),
  code: z.number().or(z.string()),
  message: z.string(),
  constraint: z.string(),
  timestamp: z.string()
})
export type PipeErrorResponseType = z.infer<typeof PipeErrorResponseSchema>

export function Response<T extends z.ZodType = z.ZodType>(data: T) {
  return z
    .object({
      statusCode: z.number(),
      code: z.number().or(z.string()),
      message: z.string(),
      data: data,
      timestamp: z.string()
    })
    .strict()
}
