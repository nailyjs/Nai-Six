import { Response } from '@/validator/base'
import { z } from 'zod'

export const UserListDataUsersSchema = z.object({
  userID: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  username: z.string(),
  ip: z.string().nullable(),
  saying: z.string().nullable(),
  avatar: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  isDeleted: z.boolean(),
  balance: z.number().nullable(),
  roleIDs: z.array(z.string())
})

export const UserListDataSchema = z.object({
  users: z.array(UserListDataUsersSchema)
})

export const UserListSchema = Response(UserListDataSchema)
export type UserList = z.infer<typeof UserListDataUsersSchema>
