import Head from "next/head"

export default function Layout() {
  return (
    <div>
      <Head>
        <link rel="icon" href={siteSettings.logo.favicon} />
      </Head>
      Landing page layout
    </div>
  )
}