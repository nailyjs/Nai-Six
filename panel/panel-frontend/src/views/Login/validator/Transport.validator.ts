import { Response } from '@/validator/base'
import { z } from 'zod'

export const TransportEmailSchema = Response(z.object({}).optional())

export const TransportPhoneDataSchema = z.object({
  SendStatusSet: z.array(
    z.object({
      Code: z.string(),
      Fee: z.number(),
      Message: z.string(),
      SessionContext: z.string(),
      PhoneNumber: z.string(),
      IsoCode: z.string(),
      SerialNo: z.string()
    })
  )
})

export const TransportPhoneSchema = Response(TransportPhoneDataSchema)
