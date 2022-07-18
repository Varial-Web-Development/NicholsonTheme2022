import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

export default function Blog({ blogPosts }) {
  const router = useRouter()
  const [pageSize, setPageSize] = useState(5)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (router.query.page) {
      if (router.query.page <= (blogPosts.length / pageSize)) {
        setPageNumber(parseInt(router.query.page) || 1)
      } else {
        router.push('/blog', undefined, { shallow: true })
      }
    }
  }, [])
  
  function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  return (
    <main className="px-4 py-8 max-w-4xl mx-auto">
      <h1 className="text-center">Recent Articles</h1>
      <div className="mx-auto w-fit grid my-8">
        <section className="grid lg:grid-cols-2 mx-auto gap-4 lg:gap-8">
          {paginate([...blogPosts].reverse(), pageSize, pageNumber).map(blogPost => {
            return (
              <article key={blogPost._id} className="border w-full lg:first-of-type:col-span-2">
                <img src={blogPost.coverImg.src} alt={blogPost.coverImg.alt} className="w-full aspect-[4/3] lg:aspect-[5/3] object-cover bg-slate-100" />
                <div className="p-2 grid">
                  <h2>{blogPost.title}</h2>
                  <div className="flex gap-1 flex-wrap">
                    {blogPost.authors.map((author, index) => (
                      <div 
                        key={`author_${index}`}
                        className="flex gap-1 items-center"
                      >
                        <img src={author.avatar.src} alt="" width="16" height="16"/>
                        <p>{author.name}{index < blogPost.authors.length - 1 && ', '}</p>
                      </div>
                    ))}
                  </div>
                  <p>{new Date(blogPost.createdOn).toLocaleString()}</p>
                  <p>{blogPost.description}</p>
                  <Link href={`/blog/${blogPost.url.join('/')}`}><a className="action-btn no-underline visited:text-white mt-4">Read full article</a></Link>
                </div>
              </article>
            )
          })}
        </section>
      </div>
      {blogPosts.length / pageSize > 1 && (
        <div className="grid grid-cols-3 gap-4 justify-items-center">
          {pageNumber > 1 ? <Link href={`/blog?page=${pageNumber - 1}`}><a>Prev</a></Link> : <span></span>}
          <span>{pageNumber}</span>
          {pageNumber < (blogPosts.length / pageSize) ? <Link href={`/blog?page=${pageNumber + 1}`}><a>Next</a></Link> : <span />}
        </div>)
      }
    </main>
  )
}