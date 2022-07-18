import Link from 'next/link'

export default function Store({ items }) {
  console.log('items', items)
  return (
    <main className="grid w-screen gap-8 px-4 py-8 items-start justify-center">
      <h1 className='text-center'>Our Products</h1>
      {/* <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 max-w-5xl items-start justify-center"> */}
      <div className="flex flex-wrap max-w-5xl items-start justify-center">
        {items.map(item => (
          <div 
            key={item.id}
            className="border border-gray-300 first:col-span-2 lg:w-[calc(50%_-_32px)]"  
          >
            <img
              src={item.coverImage.imageData.url}
              alt=""
              width="400"
              height="300"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="p-4">
              <h2>{item.itemData.name}</h2>
              <p>${parseFloat(item.itemData.variations[0].itemVariationData.priceMoney.amount / 100).toFixed(2)}</p>
              <Link href={`/store/${item.url}`}>
                <a className='no-underline visited:text-white action-btn mt-4'>View more details</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
