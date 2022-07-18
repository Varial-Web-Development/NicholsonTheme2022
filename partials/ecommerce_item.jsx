import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function ECommerceItem({ item }) {
  const router = useRouter()
  const options = item.options
  const variations = item.variations
  const [images, setImages] = useState(item.images)
  const [coverImg, setCoverImg] = useState(images[0])
  const [currentVariation, setCurrentVariation] = useState(0)
  const [currentOptions, setCurrentOptions] = useState([...options].map(option => option.values[0].itemOptionValueData.name))
  const [quantity, setQuantity] = useState(1)

  console.log('item', item)

  useEffect(() => {
    console.log('current variation', variations[currentVariation])
    if (getMaxQuantity()) {
      if (quantity > getMaxQuantity()) setQuantity(getMaxQuantity())
    }
  }, [currentVariation])

  useEffect(() => {
    let newOptions = []

    options.map(option => {
      newOptions.push(option.values[0].itemOptionValueData.name)
    })

    setCurrentOptions([...newOptions])
  }, [options])

  useEffect(() => {
    console.log('current options', currentOptions)

    if (currentOptions) {
      let newVariation = variations.findIndex(i => i.itemVariationData.name === currentOptions.join(', '))
      setCurrentVariation(newVariation)
    }
  }, [currentOptions, variations])

  function getMaxQuantity() {
    let max = item.inventory.counts?.find(i => i.catalogObjectId === variations[currentVariation].id) || undefined

    if (max) return max.quantity

    console.log('MAX', max)
    return undefined
  }
  
  return (
    <div className="grid w-full h-full place-items-center px-4 py-8">
      <main className="max-w-5xl grid lg:grid-cols-2 gap-4 lg:gap-8">
        <section>
          <img src={coverImg} className="w-full aspect-[5/4] object-cover" />
        </section>
        <section className="flex flex-col gap-4 justify-between">
          <h1 className="text-xl lg:text-3xl">{item.name}</h1>
          {item.description && <p>{item.description}</p>}
          <div className="grid lg:gap-6">
            {options.map((option, index) => (
              <div key={`option_${index}_${option.name}`} className="option">
                <label className="lg:text-lg font-semibold">{option.name}</label>
                <select 
                  value={currentOptions ? currentOptions[index] : option.values[0].itemOptionValueData.name}
                  onChange={event => {
                    let newValue = event.target.value
                    let newOptions = [...currentOptions].map((o, i) => {
                      if (i === index) return newValue

                      return o
                    })

                    setCurrentOptions([...newOptions])
                  }}
                  className="input mt-1 text-base lg:text-lg"
                >
                  {option.values.map(value => { 
                    return (
                      <option key={`option_${index}_${option.name}_${value.itemOptionValueData.name}`}>{value.itemOptionValueData.name}</option>
                    )
                  })}
                </select>
              </div>
            ))}
            <div>
              <label className="lg:text-lg font-semibold">Quantity</label>
              <input 
                type="number"
                min="1"
                max={getMaxQuantity()}
                value={quantity}
                onChange={event => {setQuantity(event.target.value)}}
                className="input"
              />
            </div>
          </div>
          <button
            onClick={() => {
              const cookies = document.cookie.split(';')
              let cart = {
                items: [],
              }

              cookies.map(cookie => {
                const [key, value] = cookie.split('=')

                if (key.trim() === 'cart') cart = JSON.parse(value.trim())
              })

              const variation = options.length > 0 ? variations[currentVariation] : item.variations[0]
              const variationId = variation.id
              const itemId = variation.itemVariationData.itemId
              const index = cart.items.findIndex(i => i.variationId === variationId)

              if (index < 0) cart.items.push({ variationId, itemId, quantity })
              if (index >= 0) cart.items[index] = { variationId, itemId, quantity }

              document.cookie = `cart=${JSON.stringify(cart)};max-age=${60 * 60};Path=/`
              router.push('/cart', undefined, { shallow: true })
              // console.log('cart', cart)
            }}
            className="action-btn lg:action-btn-lg lg:text-lg"
          >
            Add to cart 
            ${options.length > 0 ? (variations[currentVariation].itemVariationData.priceMoney.amount / 100).toFixed(2) : (item.variations[0].itemVariationData.priceMoney.amount / 100).toFixed(2)}
          </button>
        </section>
      </main>
    </div>
  )
}
