import Link from "next/link";

export default function Footer({ siteSettings }) {
  return (
    <footer className="bg-[#111720] text-white p-16 px-12 grid gap-8 md:gap-12 lg:gap-16 justify-center justify-items-center">
      <div className="grid gap-8 md:gap-12 lg:gap-16 sm:grid-cols-2 lg:grid-cols-4">
        {siteSettings.locations.map((location, index) => (
          <address key={location.name + index} className="not-italic text-center tracking-[0.02rem] text-lg prose-p:font-normal grid gap-[2px]">
            <span className="text-xl md:text-2xl text-[#8AECC8] !tracking-[0.06rem] !font-semibold">{location.name}</span>
            <p>{location.address}</p>
            <p>{location.city}, {location.state} {location.zip}</p>
            <p>{location.phone}</p>
            <p>{location.fax}</p>
            <Link href="#">
              <a className="no-underline text-[#81A6E4] visited:text-[#81A6E4] font-medium block">View on map</a>
            </Link>
            <Link href="#">
              <a className="no-underline text-[#81A6E4] visited:text-[#81A6E4] font-medium">Driving Directions</a>
            </Link>
          </address>
        ))}
      </div>
      <section className="flex gap-12 md:gap-14">
          <Link href={siteSettings.companyInfo.facebook}>
            <a>
              <img 
                src="https://media.nicholson-insurance.com/objects/icons/facebook"
                className="w-10 md:w-12" 
              />
            </a>
          </Link>
          <Link href={siteSettings.companyInfo.instagram}>
            <a>
              <img 
                src="https://media.nicholson-insurance.com/objects/icons/instagram"
                className="w-10 md:w-12"
              />
            </a>
          </Link>
          <Link href={siteSettings.companyInfo.linkedin}>
            <a>
              <img 
                src="https://media.nicholson-insurance.com/objects/icons/linkedin" 
                className="w-10 md:w-12 rounded-md"
              />
            </a>
          </Link>
      </section>
      <section className="grid justify-items-center gap-2">
        <p className="!font-normal">©2022 Nicholson & Associates, LLC</p>
        <p className="!font-normal !text-sm lg:absolute lg:right-16">Created by <Link href="https://www.varial.dev"><a className="no-underline text-[#81A6E4] visited:text-[#81A6E4] font-medium">Varial Web Services</a></Link></p>
      </section>
    </footer>
    // <footer className="bg-slate-900 text-slate-200 p-4 grid gap-4">
    //   <address className="not-italic mx-auto text-center">
    //     <p className="text-sm">{siteSettings.companyInfo.name}</p>
    //     <p className="text-sm">{siteSettings.companyInfo.address}</p>
    //     <p className="text-sm">{siteSettings.companyInfo.city}, {siteSettings.companyInfo.state} {siteSettings.companyInfo.zip}</p>
    //     <p className="text-sm">{siteSettings.companyInfo.phone}</p>
    //     <p className="text-sm">{siteSettings.companyInfo.email}</p>
    //   </address>
    //   {(siteSettings.companyInfo.facebook || siteSettings.companyInfo.instagram || siteSettings.companyInfo.linkedin || siteSettings.companyInfo.twitter) && (
    //     <div className="flex gap-4 mx-auto">
    //       {siteSettings.companyInfo.facebook && <Link href={siteSettings.companyInfo.facebook}><a><img src="/icons/icon_facebook.svg" width="32" height="32" className="md:w-12" /></a></Link>}
    //       {siteSettings.companyInfo.instagram && <Link href={siteSettings.companyInfo.instagram}><a><img src="/icons/icon_instagram.svg" width="32" height="32" className="md:w-12" /></a></Link>}
    //       {siteSettings.companyInfo.linkedin && <Link href={siteSettings.companyInfo.linkedin}><a><img src="/icons/linkedin.svg" width="32" height="32" className="md:w-12" /></a></Link>}
    //       {siteSettings.companyInfo.twitter && <Link href={siteSettings.companyInfo.linkedin}><a><img src="/icons/icon_twitter.svg" width="32" height="32" className="md:w-12" /></a></Link>}
    //     </div>
    //   )}
    //   <p className="text-center text-sm">©2022 {siteSettings.companyInfo.name}</p>
    // </footer>
  )
}