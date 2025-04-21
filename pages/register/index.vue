<template>
    <div class="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card class="w-full max-w-md p-6 shadow-2xl rounded-2xl bg-background">
        <CardHeader>
          <CardTitle class="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription class="text-center">Join us to get started!</CardDescription>
        </CardHeader>
  
        <CardContent>
          <div class="space-y-4">
            <Input v-model="email" type="email" placeholder="Email" />
            <Input v-model="password" type="password" placeholder="Password" />
          </div>
        </CardContent>
  
        <CardFooter class="flex flex-col space-y-2">
          <Button class="w-full" @click="register">Register</Button>
          <p class="text-sm text-muted-foreground text-center">
            Already have an account?
            <NuxtLink to="/login" class="text-primary underline ml-1">Login</NuxtLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'
  import { useAuthService } from '~/composibles/useAuthServices'
  import { useStore } from '~/store/store'
  
  definePageMeta({ middleware: 'no-auth' })
  
  const email = ref('')
  const password = ref('')
  const authService = useAuthService()
  const store = useStore()
  const router = useRouter()
  
  async function register() {
    try {
      await authService.register(email.value, password.value)
      const user = await authService.getUser()
      store.setUser(user)
      router.push('/')
    } catch (e) {
      console.error(e)
    }
  }
  </script>
  