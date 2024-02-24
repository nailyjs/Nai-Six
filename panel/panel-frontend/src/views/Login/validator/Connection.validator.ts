import { z } from 'zod'

export const DefaultConnectionDataSchema = z
  .object({
    services: z.array(
      z.object({
        name: z.string(),
        host: z.string(),
        port: z.number(),
        state: z.object({
          status: z.enum(['up', 'down', 'failed', 'error']),
          msg: z.string()
        })
      })
    )
  })
  .strict()
