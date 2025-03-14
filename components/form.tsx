'use client'

import React, { FC, useActionState } from 'react'

import { singInUser, type FormState } from '@/lib/actions'
import { FORM_STATUS } from '@/constants/status'

const Form: FC = () => {
  const [state, formAction, isPending] = useActionState(singInUser, {
    message: null,
  } as FormState)

  const classWarning =
    state?.message === FORM_STATUS.INVALID_INPUTS ||
    state?.message === FORM_STATUS.INVALID_CRED
      ? 'text-red-400'
      : 'text-green-400'

  return (
    <form
      className='flex flex-col gap-4 bg-gray-100 border border-gray-200 p-8 rounded-sm max-w-lg mx-auto'
      action={formAction}
    >
      <input
        className='p-4 border border-gray-200 bg-white rounded-sm focus:outline-none focus:border-gray-400'
        type='text'
        placeholder='Your name'
        name='name'
      />
      <input
        className='p-4 border border-gray-200 bg-white rounded-sm focus:outline-none focus:border-gray-400'
        type='password'
        placeholder='Your password'
        name='password'
      />
      {state?.message && <p className={classWarning}>{state.message}</p>}
      <button
        className='p-2 border border-gray-400 rounded-sm self-center hover:bg-gray-200 cursor-pointer disabled:opacity-75'
        type='submit'
        disabled={isPending}
      >
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

export default Form
