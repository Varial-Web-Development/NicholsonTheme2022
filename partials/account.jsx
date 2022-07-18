import { useState } from "react"
import { MediaLibraryButton, MediaUploadButton } from "../../../admin/ui/UI"

export default function Account({ user }) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [avatar, setAvatar] = useState(user.avatar)

  const changes = (name !== user.name || email !== user.email || avatar !== user.avatar)

  function saveChanges() {

  }

  return (
    <div className="grid h-full place-items-center">
      <main className="border p-4">
        {/* {user.role !== 'user' && (
          <div className="mb-4">
            <img src={avatar.src} alt="" width="64" height="64" className="mx-auto" />
            <div>
              
            </div>
          </div>
        )} */}
        <div className="grid gap-4">
          <div className="grid">
            <label className="text-sm">Name</label>
            <input 
              value={name}
              onChange={event => setName(event.target.value)}
              className="input"
            />
          </div>
          <div className="grid">
            <label className="text-sm">Email</label>
            <input 
              value={email}
              onChange={event => setEmail(event.target.value)}
              className="input"
            />
          </div>
          <button onClick={saveChanges} disabled={!changes} className="action-btn text-sm">Update</button>
        </div>
      </main>
    </div>
  )
}