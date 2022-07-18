import { useState } from "react"
import { Spinner } from '../../../admin/ui/UI'

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  function handleRequest(event) {
    event.preventDefault()
    setSending(true)
  
    const first = event.target.first.value
    const last = event.target.last.value
    const email = event.target.email.value
    const phone = event.target.phone.value
    const message = event.target.message.value
    const mailingList = event.target.mailingList.checked
  
    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        first,
        last,
        email,
        phone,
        message,
        mailingList,
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setSending(false)
      setSent(true)
    })
    .catch(error => console.error(error))
  }

  return (
    <div className="w-full h-full grid place-items-center rounded-sm">
      <form
        onSubmit={handleRequest}
        className="border p-4 w-[calc(100%-32px)] my-8 max-w-3xl"
      >
        <h1 className="text-center">Contact Us</h1>
        <hr className="my-2" />
        <label htmlFor="first">First name (*)</label>
        <input
          name="first"
          className="input"
          required 
        />
        <label htmlFor="first">Last name</label>
        <input
          name="last"
          className="input" 
        />
        <label htmlFor="email">Email (*)</label>
        <input
          type="email"
          name="email" 
          className="input"
          required
        />
        <label htmlFor="phone">Phone</label>
        <input 
          name="phone"
          className="input"
        />
        <label htmlFor="message">Message (*)</label>
        <textarea
          name="message"
          rows="6" 
          className="input" 
          required
        />
        <label htmlFor="mailingList">Sign up for mailing list?</label>
        <input name="mailingList" type="checkbox" className="ml-2 mt-0.5" />
        <button disabled={sent} className="action-btn w-full md:w-fit mt-4 disabled:bg-green-500">
          {sent ? <span className="text-white">✓ message sent</span> : (
            sending ? <Spinner className="w-6" /> : <span>Send message</span>
          )}
        </button>
      </form>
    </div>
  )
}


