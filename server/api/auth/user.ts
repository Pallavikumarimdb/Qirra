
import { H3Event, parseCookies, getCookie, createError } from 'h3'
import jwt from 'jsonwebtoken'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const token = getCookie(event, 'Authorization')

    if (!token) {
      throw createError({ statusCode: 401, message: 'Not authenticated' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.userId) },
      select: {
        id: true,
        email: true,
        createdAt: true,
      }
    })

    if (!user) {
      throw createError({ statusCode: 404, message: 'User not found' })
    }

    return user
  } catch (error: any) {
    console.error('[GET USER ERROR]', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to authenticate user'
    })
  }
})
