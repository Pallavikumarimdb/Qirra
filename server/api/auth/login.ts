import { H3Event, readBody, appendHeader, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event: H3Event) => {
  const { email, password } = await readBody(event)

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  // 🪙 Create JWT tokens
  const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' })

  // Set cookies manually (proxy-style)
  appendHeader(event, 'set-cookie', `Authorization=${accessToken}; Path=/; HttpOnly; Secure`)
  appendHeader(event, 'set-cookie', `Refresh-Token=${refreshToken}; Path=/; HttpOnly; Secure`)

  return { message: 'Login successful' }
})
