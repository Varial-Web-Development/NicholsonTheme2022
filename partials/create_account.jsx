import Link from "next/link";
import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"

export default function CreateAccount() {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_CLIENT_KEY
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [emailInUse, setEmailInUse] = useState(false)
  const [verified, setVerified] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    if (event.target.password1.value !== event.target.password2.value) {
      setPasswordsMatch(false)
    } else {
      setPasswordsMatch(true)

      fetch('/api/auth/user', {
        method: 'POST',
        body: JSON.stringify({
          name: event.target.name.value,
          email: event.target.email.value,
          password1: event.target.password1.value,
          password2: event.target.password2.value, 
          mailingList: event.target.mailingList.checked,
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response.error_message === 'Email already in use') setEmailInUse(true)
        if (response) {}
      })
      .catch(error => console.error('error', error))
    }
  }

  return (
    <div className="grid w-full h-full place-items-center px-4 py-8">
      <form onSubmit={handleSubmit} className="border p-4 grid gap-4 w-full max-w-[50ch]">
        <h1>Create Account</h1>
        <div className="grid">
          {emailInUse && <p className="text-red-500">Email already in use</p>}
          {!passwordsMatch && <p className="text-red-500">Passwords do not match</p>}
          <label htmlFor="name">Name</label>
          <input name="name" required className="input" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required className="input" />
          <label htmlFor="password1">Password</label>
          <input type="password" name="password1" required className="input" />
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" required className="input" />
          <div className="flex items-center gap-4 mt-2">
            <label htmlFor="mailingList">Sign up for mailing list?</label>
            <input type="checkbox" name="mailingList" />
          </div>
        </div>
        <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={value => setVerified(value ? true : false) } />
        <button disabled={!verified} className="action-btn">Create Account</button>
        <p>Already have an account? <Link href="/account/login"><a>Log in</a></Link></p>
      </form>
    </div>
    )
}
