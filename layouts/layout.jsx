import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="font-['Montserrat'] text-[#333333]">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </Head>
      <div className="prose-p:max-w-prose prose-p:leading-[1.636] prose-p:font-light prose-p:text-[16px] sm:prose-p:text-xl sm:prose-p:leading-[1.6] lg:text-[22px]">
        {children}
      </div>
    </div>
  )
}
