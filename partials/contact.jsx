import { useState } from "react"
import { Spinner } from '../../../admin/ui/UI'

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  function handleRequest(event) {
    event.preventDefault()
    setSending(true)
  
    const name = event.target.name.value
    const email = event.target.email.value
    const phone = event.target.phone.value
    const message = event.target.message.value
    const mailingList = event.target.mailingList.checked
  
    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        first: name.split(' ')[0],
        last: name.split(' ').length > 1 ? name.split(' ')[1] : '',
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
    <div className="w-full grid  place-items-center pt-8 pb-12 md:pt-16 md:pb-24 lg:pt-24 lg:pb-32 px-4 md:px-[54px] lg:px-16 gap-8 md:gap-12 lg:gap-24">
      <h1 className="text-center tracking-[1.75px] font-medium text-[28px] md:text-[40px] lg:text-[64px]">Contact <span className="text-[#4A79CB]">Us</span></h1>
      <div className="grid gap-8 lg:grid-cols-2 md:gap-12 lg:gap-16 items-center max-w-[1600px]">
        <form
          onSubmit={handleRequest}
          className="w-full grid gap-4 md:gap-6"
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              placeholder="John Doe"
              className="input md:p-3 md:text-lg"
              required 
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="someone@somewhere.com"
              className="input md:p-3 md:text-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input 
              name="phone"
              placeholder="(555) 555-5555"
              className="input md:p-3 md:text-lg"
            />
          </div>
          <div>
            <label htmlFor="message">Questions or Comments</label>
            <textarea
              name="message"
              placeholder="Your message here..."
              rows="6" 
              className="input md:p-3 md:text-lg" 
              required
            />
          </div>
          <div className="flex items-center gap-3">
            <input name="mailingList" type="checkbox" className="ml-2 mt-0.5" />
            <label htmlFor="mailingList">Sign up for mailing list?</label>
          </div>
          <button disabled={sent} className="bg-[#4B7BCB] text-white text-base py-2.5 px-24 w-full lg:w-fit disabled:bg-[#8AECC8] disabled:!text-[#333333] rounded-full">
            {sent ? <span className="text-[#333333]">✓ message sent</span> : (
              sending ? <Spinner className="w-6" /> : <span>Submit</span>
            )}
          </button>
        </form>
        <iframe 
          // src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d704876.3712223133!2d-122.87471595329961!3d46.36098850649458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1658292057814!5m2!1sen!2sus" 
          src="https://www.google.com/maps/d/u/0/embed?mid=1jFYMtPzOj0kMDmO0mQ-scIyy1sY-6RY&usp=sharing"
          width="600" 
          height="450" 
          style={{
            border: '0'
          }}
          allowFullScreen={false}
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade" 
          className="w-full lg:w-fit lg:h-full aspect-[4/3]"
          />
      </div>
    </div>
  )
}


