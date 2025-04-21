import { H3Event, readBody, appendHeader, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { setCookie } from 'h3'


export default defineEventHandler(async (event: H3Event) => {
  const { email, password } = await readBody(event)

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    throw createError({ statusCode: 409, message: 'User already exists' })
  }

  const hashed = await bcrypt.hash(password, 10)
  const newUser = await prisma.user.create({
    data: { email, password: hashed }
  })

  // 🪙 Create JWT tokens
  const accessToken = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, { expiresIn: '7d' })

  // Manually set the cookies like your original proxy-style
  // appendHeader(event, 'set-cookie', `Authorization=${accessToken}; Path=/; HttpOnly; Secure`)
  // appendHeader(event, 'set-cookie', `Refresh-Token=${refreshToken}; Path=/; HttpOnly; Secure`)


  setCookie(event, 'Authorization', accessToken, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 15, // 15 minutes
    secure: process.env.NODE_ENV === 'production'
  })
  
  setCookie(event, 'Refresh-Token', refreshToken, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === 'production'
  })

  return { message: 'Registered successfully' }
})
