'use server'

import { cookies } from 'next/headers'

const DYMMU_NAME = 'Test'
const DYMMU_PASSWORD = '1111'

export interface FormState {
  message: string | null
}

function isInvalidText(text: string | null) {
  return !text || text.trim() === ''
}

export const singInUser = async (
  prevState: FormState | undefined,
  formData: FormData
) => {
  const user = {
    name: formData.get('name'),
    password: formData.get('password'),
  }

  if (
    isInvalidText(user.name as string) ||
    isInvalidText(user.password as string)
  ) {
    return {
      message: 'Invalid inputs',
    }
  }

  console.log('user', user)

  // Check hardcoded credentials
  if (user.name === DYMMU_NAME && user.password === DYMMU_PASSWORD) {
    const cookieStore = await cookies()

    cookieStore.set('auth_token', 'your-secure-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })

    return { message: 'Login successful' }
  }

  return { message: 'Invalid credentials' }
}
