import { Response } from '@/validator/base'
import { z } from 'zod'

export const LoggingDataUserSchema = z.object({
  userID: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  username: z.string(),
  password: z.string().nullable(),
  ip: z.string().nullable(),
  saying: z.string().nullable(),
  avatar: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  isDeleted: z.boolean(),
  balance: z.number().nullable(),
  roleIDs: z.array(z.string())
})

export const LoggingDataSchema = z.object({
  user: LoggingDataUserSchema
})

export const LoggingSchema = Response(LoggingDataSchema)
