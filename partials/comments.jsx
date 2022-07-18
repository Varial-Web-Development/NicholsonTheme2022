import { useEffect, useState } from "react"

export default function Comments({ parentId, }) {
  const [comments, setComments] = useState([])
  const [user, setUser] = useState()

  useEffect(() => {
    const cookies = document.cookie.split(';')

    cookies.map(cookie => {
      const [key, value] = cookie.split('=')

      if (key.trim() === 'user') setUser(JSON.parse(value.trim()))
    })


    fetch('/api/comments', { method: 'POST', body: JSON.stringify({ parentId })})
    .then(response => response.json())
    .then(response => {
      console.log('comments response', response)
      if (response.results) setComments(response.results.length > 0 ? [...response.results] : [])

      if (response.error_message) console.error('error fetching comments')
    })
    .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    console.log('comments', comments)
  }, [comments])

  useEffect(() => console.log('user', user?.avatar), [user])

  function addComment(event) {
    event.preventDefault()

    const comment = event.target.comment.value
    fetch('/api/comment', { method: 'POST', body: JSON.stringify({ parentId, comment })})
    .then(response => response.json())
    .then(response => {
      if (response.comment) {
        let newComments = [...comments]
        newComments.push({
          ...response.comment,
          author: [{
            _id: user._id,
            name: user.name,
            avatar: user.avatar || { src: '/icons/user.png' },
          }]
        })
        setComments([...newComments])
        event.target.comment.value = ''
      }
    })
  }

  function deleteComment(_id) {
    fetch('/api/comment', { method: 'DELETE', body: JSON.stringify({ _id })})
    .then(response => response.json())
    .then(response => {
      if (response.comment === 'deleted') {
        setComments([...comments].filter(i => i._id !== _id))
      }
    })
  }

  return (
    <section>
      <hr className="mb-2" />
      <h2 className="text-xl">Comments</h2>
      <div className="grid gap-2 my-2">
        {comments.map(comment => (
          <div
            key={comment._id}
            className="bg-slate-100 p-2 grid gap-2 max-w-lg shadow"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <img src={comment.author[0].avatar.src} alt="" width="20" height="20" className="rounded-full" />
                <p>{comment.author[0].name}</p>
              </div>
              <div className="flex items-center text-xs gap-2">
                <p className="text-xs">{new Date(comment.createdOn).toLocaleString()}</p>
                {comment.author[0]._id === user._id && (
                  <button 
                    onClick={() => {
                      if (confirm('Are you sure? This action cannot be undone.')) deleteComment(comment._id)
                    }}
                    className="bg-rose-200 border border-rose-300 hover:bg-rose-300 rounded-full p-1"
                  >
                    <img src="/icons/trash.svg" alt="Delete comment" width="14" />
                  </button>
                )}
              </div>
            </div>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
      {user ? (
        <form
          onSubmit={addComment}
          className="grid gap-2 max-w-lg"
        >
          <div className="grid">
            <label htmlFor="comment">Add comment</label>
            <textarea 
              name="comment"
              className="border rounded-sm px-2 py-1.5"
            />
          </div>
          <button className="action-btn">Submit</button>
        </form>
      ) : (
        <p>Please login to add a comment</p>
      )}
    </section>
  )
}
