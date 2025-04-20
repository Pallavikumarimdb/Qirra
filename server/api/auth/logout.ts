import { appendHeader } from 'h3'

export default defineEventHandler(async (event) => {

  appendHeader(event, 'set-cookie', 'Authorization=; Path=/; HttpOnly; Secure; Max-Age=0')
  appendHeader(event, 'set-cookie', 'Refresh-Token=; Path=/; HttpOnly; Secure; Max-Age=0')

  return { message: 'Logged out successfully' }
})
