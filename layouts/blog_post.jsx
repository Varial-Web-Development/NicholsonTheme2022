import StandardPageLayout from "./standard_page";

export default function BlogPostLayout({ siteSettings, children, coverImg, ...props }) { 
  return (
    <StandardPageLayout siteSettings={siteSettings} {...props}>
      <div className="w-full max-w-4xl mx-auto px-4 py-4 lg:py-8">
        <img src={coverImg.src} alt={coverImg.alt} className="aspect-[4/3] w-full object-cover"/>
        {children}
      </div>
    </StandardPageLayout>
  )
}