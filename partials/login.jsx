import { useRouter } from 'next/router'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Link from 'next/link'
import { Spinner } from '../../../admin/ui/UI'

export default function Login() {
  const router = useRouter()
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_CLIENT_KEY
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const [invalid, setInvalid] = useState(false)

  return (
    <main className="grid w-full h-full place-items-center px-4 py-8">
      <form
        onSubmit={event => {
          event.preventDefault()
          setLoading(true)

          fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
              email: event.target.email.value,
              password: event.target.password.value,
            }),
          })
            .then(response => response.json())
            .then(response => {
              if (response.auth === 'successful') {
                if (router.query?.redirect) {
                  router.push(`/${router.query.redirect}`, undefined, { shallow: true })
                } else {
                  router.push('/', undefined, { shallow: true })
                }
              }

              if (response.error_message === 'Invalid username/password') {
                setInvalid(true)
              }

              setLoading(false)
            })
            .catch(error => console.error(error))
        }}
        className="border p-4 grid gap-4 w-full max-w-[50ch]"
      >
        <h1>Login</h1>
        {invalid && <p className='text-red-600'>Invalid username and/or password</p>}
        <div className="field">
          <label htmlFor="email">Email</label>
          <input name="email" type="email" required className="input" />
        </div>
        <div className="field">
          <label htmlFor="email">Password</label>
          <input name="password" type="password" className="input" required />
        </div>
        <ReCAPTCHA
          sitekey={recaptchaSiteKey}
          onChange={value => setVerified(value ? true : false)}
        />
        <button disabled={!verified} className="action-btn">
          {loading ? <Spinner className="w-6" /> : 'Log in'}
        </button>
        <p>
          Dont have an account?{' '}
          <Link href="/account/create">
            <a className='text-blue-700 visited:text-blue-700'>Create an account</a>
          </Link>
        </p>
      </form>
    </main>
  )
}
