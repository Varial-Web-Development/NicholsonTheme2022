import { useState } from "react"
import { Spinner } from '../../../admin/ui/UI'

export default function ChangePassword() {
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  
  function updatePassword(event) {
    event.preventDefault()

    const { new_password, confirm_password } = event.target

    if (new_password.value !== confirm_password.value) return setError('Passwords do not match')

    setLoading(true)
    
    fetch('/api/auth/user', {
      method: 'PUT',
      body: JSON.stringify({
        updatePassword: true,
        newPassword: new_password.value,
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.password !== 'updated') {
        setError('Error updating password')
      } else {
        setMessage('Password successfully updated')
      }
      
      setLoading(false)
    })
    .catch(error => {
      console.log(error)
      setError('Error updating password')
      setLoading(false)
    })
  }

  return (
    <main className="grid h-full place-items-center">
      <form onSubmit={updatePassword} className="border w-full max-w-lg p-4 grid gap-4">
        <h1 className="text-center text-lg">Update password</h1>
        {error && <p className="text-red-600">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}
        <div className="grid">
          <label htmlFor="new_password">New password</label>
          <input name="new_password" className="input" />
        </div>
        <div className="grid">
          <label htmlFor="confirm_password">Confirm password</label>
          <input name="confirm_password" className="input" />
        </div>
        <button className="action-btn w-full">{loading ? <Spinner className="w-6" /> : <span>Submit</span>}</button>
      </form>
      
    </main>
  )
}