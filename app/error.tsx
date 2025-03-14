'use client'

export default function Error({ error }: { error: Error }) {
  console.log('error', error)

  return (
    <main className='container mx-auto p-8'>
      <h1 className='text-red-400'>An error occurred!</h1>
    </main>
  )
}
