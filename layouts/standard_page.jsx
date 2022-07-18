import Footer from "../components/footer";
import Nav from "../components/nav";
import Head from 'next/head'
import { useRouter } from "next/router";
import Layout from "./layout";


export default function StandardPageLayout({ siteSettings, children, title, description = '' }) {
  const router = useRouter()
  const url = process.env.NEXT_PUBLIC_BASE_URL + router.asPath

  return (
    <Layout>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white">
        <Head>
          <title>{title} - {siteSettings.companyInfo.name}</title>
          <meta name="description" content={description} />
          <link rel="icon" href={siteSettings.logo.favicon} />
          <link rel="canonical" href={url} />
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
          <meta property="og:url" content={url} />
          <meta name="twitter:url" content={url} />
        </Head>
        <Nav siteSettings={siteSettings} />
        <main>
          {children}
        </main>
        <Footer siteSettings={siteSettings} />
      </div>
    </Layout>
  )
}
