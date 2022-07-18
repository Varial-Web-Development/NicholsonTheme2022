import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='grid h-full place-items-center'>
      <div>
        <h1>404 - Page not found</h1>
        <p>If you think this is an error, feel free to <Link href="/contact"><a className='text-blue-700 visited:text-blue-700'>contact us</a></Link></p>
      </div>
    </main>
  )
}
