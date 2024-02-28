import { Response } from '@/validator/base'
import { z } from 'zod'

export const LoginByPhoneDataSchema = z.object({
  user: z.object({
    userID: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    username: z.string(),
    ip: z.string(),
    saying: z.string(),
    avatar: z.string().nullable(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    isDeleted: z.boolean(),
    balance: z.number().nullable(),
    roleIDs: z.array(z.string())
  }),
  identifier: z.object({
    userIdentifierID: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    loginType: z.string(),
    loginClient: z.string(),
    loginDeviceName: z.string(),
    loginIP: z.string(),
    loginMethod: z.string(),
    identifier: z.string(),
    userID: z.string()
  }),
  access_token: z.string()
})

export const LoginByPhoneSchema = Response(LoginByPhoneDataSchema)
