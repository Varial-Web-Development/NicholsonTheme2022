import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='grid h-full place-items-center'>
      <div>
        <h1>500 - Server Error</h1>
        <p>If you think this is a mistake, feel free to <Link href="/contact"><a className='text-blue-700 visited:text-blue-700'>contact us</a></Link></p>
      </div>
    </main>
  )
}
