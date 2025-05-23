export const useAuthService = () => {

    async function login(email: string, password: string) : Promise<void> {
        try {

            // Do a login request from the client side
            await $fetch('/api/auth/login', {
                body: {
                    email,
                    password
                },
                method: 'POST'
            })

        } catch(err) {
            return Promise.reject(err)
        }
    } 

    async function register(email: string, password: string) : Promise<void> {
        try {

            // Do a login request from the client side
            await $fetch('/api/auth/register', {
                body: {
                    email,
                    password
                },
                method: 'POST'
            })

        } catch(err) {
            return Promise.reject(err)
        }
    }

    async function logout() : Promise<void> {
        try {

            await $fetch('/api/auth/logout', {
                method: 'POST'
            })

        } catch(err) {
            return Promise.reject(err)
        }
    }

    async function getUser() : Promise<any> {
        try {
          const user = await $fetch('/api/auth/user', {
            headers: useRequestHeaders(['cookie'])
          })
          return user
        } catch (err) {
          return Promise.reject(err)
        }
      }
      

    return {
        login,
        register,
        getUser,
        logout
    }

}