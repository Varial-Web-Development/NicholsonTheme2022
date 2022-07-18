import Link from "next/link"
import { useEffect, useState } from "react"

export default function Cart({ items }) {
  const [total, setTotal] = useState([...items].map(i => i.quantity * parseInt(i.priceMoney.amount)))

  useEffect(() => {
    if (total.length > 0) {
      setTotal([...total].reduce((a, b) => a + b))
    }
  }, [])

  return (
    <div className="grid w-full h-full place-items-center px-4 py-8">
      <main className="w-full">
        <h1>Cart</h1>
        <section className="grid gap-4 my-8">
          {items.map(item => (
            <div key={item.variationId} className="grid grid-cols-2 p-4 gap-4 bg-slate-100 rounded-xs">
              <img src={item.image?.url || '/icons/gallery.png'} alt="" className="w-full" />
              <div className="grid gap-2">
                <div>
                  <label className="font-medium">Name:</label>
                  <p>{item.name}</p>
                </div>
                <div>
                  <label className="font-medium">Price:</label>
                  <p>${parseFloat(item.priceMoney.amount / 100).toFixed(2)}</p>
                </div>
                <div>
                  <label className="font-medium">Quantity:</label>
                  <p>{item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
        <h2 className="text-base text-right">Subtotal</h2>
        <p className="text-right">${parseFloat(total / 100).toFixed(2)}</p>
        <Link href="/checkout">
          <a className="no-underline visited:text-white action-btn">Proceed to checkout</a>
        </Link>
      </main>
    </div>
  )
}
