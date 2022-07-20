import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Nav({ siteSettings }) {
  const router = useRouter()
  const [navLinksOpen, setNavLinksOpen] = useState(false)
  const [user, setUser] = useState()
  const { companyInfo, navLinks, userRegistrations } = siteSettings
  const [cart, setCart] = useState({ items: [] })
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const cookies = document.cookie.split(';')

    cookies.map(cookie => {
      const [key, value] = cookie.split('=')

      if (key.trim() === 'user') {
        setUser(JSON.parse(value.trim()))
      }

      if (key.trim() === 'cart') {
        setCart(JSON.parse(value.trim()))
      }
    })
  }, [])

  useEffect(() => {
    function handleScroll(event) {
      setScroll(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll, { passive: true })
    }
  })

  return (
    // <nav className={`sticky top-0 flex lg:gap-4 justify-between items-center p-4 md:py-6 lg:py-8 md:px-6 lg:px-[128px] shadow z-10 bg-white h-fit transition duration-1000`}>
    <nav className="sticky top-0 left-0 bg-white p-4 md:py-6 lg:px-32 lg:py-8 shadow z-10 h-fit flex justify-between items-center">
      <header className="flex items-center gap-2 lg:justify-center">
        {siteSettings.useLogo && (
          <Link href="/">
            <a>
              <picture>
                {siteSettings.logo.computer && <source srcSet={scroll > 0 ? siteSettings.logo.tablet : siteSettings.logo.computer} media="(min-width: 1024px)" />}
                {siteSettings.logo.tablet && <source srcSet={siteSettings.logo.tablet} media="(min-width: 501px)" />}
                <img src={siteSettings.logo.mobile} alt={siteSettings.companyInfo.name} width="116" className="md:w-40 lg:w-[240px]" />
              </picture>
            </a>
          </Link>
        )}
        {siteSettings.useTitle && (
          <Link href="/">
            <a className="no-underline text-black visited:text-black">{siteSettings.companyInfo.name}</a>
          </Link>
        )}
      </header>
      <button
        onClick={() => setNavLinksOpen(!navLinksOpen)}
        className="lg:hidden"
      >
        <img src="/icons/menu.svg" alt="menu" width="28" height="28" className="md:w-10" />
      </button>
      <section className={`${navLinksOpen ? 'block' : 'hidden'} absolute top-0 left-0 w-4/5 h-screen p-4 lg:p-0 bg-white lg:static lg:h-fit lg:w-fit lg:flex lg:items-center shadow-[2px_2px_4px_rgb(0_0_0_/_0.075)] lg:shadow-none text-[clamp(1rem,_1vw,_24px)]`}>
        {siteSettings.useLogo && (
          <Link href="/">
            <a>
              <picture>
                {siteSettings.logo.computer && <source srcSet={scroll > 0 ? siteSettings.logo.tablet : siteSettings.logo.computer} media="(min-width: 1024px)" />}
                {siteSettings.logo.tablet && <source srcSet={siteSettings.logo.tablet} media="(min-width: 501px)" />}
                <img src={siteSettings.logo.mobile} alt={siteSettings.companyInfo.name} width="116" className="md:w-40 lg:w-[240px] lg:hidden mb-8" />
              </picture>
            </a>
          </Link>
        )}
        <div className={`grid gap-2.5 lg:flex lg:items-center lg:gap-4 text-lg`}>
          {navLinks.map(navLink => (
            navLink.menu ? (
              <details key={`${navLink.href}${navLink.text}`} className="group relative">
                <summary className={`list-none flex select-none cursor-pointer ${navLink.menuLinks.some(i => i.href === router.asPath) && '!underline underline-offset-4 decoration-[#8AECC8] decoration-2'}`}>{navLink.text}</summary>
                <div className="lg:absolute lg:top-[300%] lg:-left-3 w-fit bg-white py-2 lg:py-4 px-3 rounded lg:shadow grid gap-2">
                  {navLink.menuLinks.map(menuLink => (
                    <Link
                      key={`${navLink.href}${navLink.text}${menuLink.href}${menuLink.text}`}
                      href={menuLink.href}
                    >
                      <a className="no-underline text-[#333333] visited:text-[#333333] whitespace-nowrap">{menuLink.text}</a>
                    </Link>
                  ))}
                </div>
              </details>  
            ) : (
              <Link key={`${navLink.href}${navLink.text}`} href={navLink.href}><a className={`no-underline text-[#333333] visited:text-[#333333] tracking-[0.03em] ${router.asPath === navLink.href && '!underline underline-offset-4 decoration-[#8AECC8] decoration-2'}`}>{navLink.text}</a></Link>
            )
          ))}
          <Link href="/forms/free-quote">
            <a className="no-underline bg-[#8AECC8] text-[#333333] visited:text-[#333333] py-1.5 lg:py-2.5 px-8 lg:px-6 text-[clamp(1rem,_1vw,_21px)] rounded-full w-fit shadow-[0_2px_4px_rgb(0_0_0_/_0.15)] mt-4 lg:mt-0">Get quote</a>
          </Link>
          {/* <span className="hidden lg:inline text-xl text-gray-300">|</span> */}
          <div className="flex gap-4 lg:gap-4 lg:absolute lg:top-5 lg:right-4 items-center mt-0.5">
            {userRegistrations && (
              user ? (
                <Link href="/account">
                  <a><img src="/icons/user.png" alt="Go to account page" width="24" height="24" /></a>
                </Link>
              ) : (
                  <>
                    <Link href="/account/create">
                      <a className="text-black visited:text-black no-underline action-btn-alt-xs text-sm">Sign up</a>
                    </Link>
                    <Link href="/account/login">
                      <a className="action-btn-xs text-sm text-white visited:text-white no-underline">Login</a>
                    </Link>
                  </>
                
              )
            )}
            {siteSettings.eCommerce && (
              <Link href="/cart">
                <a className="relative no-underline w-fit mt-1">
                  <img src="/icons/cart.svg" alt="cart" width="24" height="24" className="" />
                  {cart.items.length > 0 && <span className="absolute -top-2 -right-2 bg-blue-500 w-5 h-5 pt-0.5 text-center rounded-full text-xs text-white">{cart.items.length}</span>}
                </a>
              </Link>
            )}
          </div>
        </div>
      </section>
    </nav>
  )
}
