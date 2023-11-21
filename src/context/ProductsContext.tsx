import { ReactNode, createContext, useState } from 'react'
import { ProductType } from '../types/types'

const MOCK_PRODUCTS = [
  {
    reference_id: '12',
    description: 'Mug',
    amount: {
      value: '90.00',
    },
  },
  {
    reference_id: '13',
    description: 'Guitar',
    amount: {
      value: '250.00',
    },
  },
  {
    reference_id: '14',
    description: 'TV',
    amount: {
      value: '500.00',
    },
  },
]

type ProductsContextType = {
  products: ProductType[]
  form: boolean
  setForm: (value: boolean) => void
}
const ProductsContext = createContext<ProductsContextType>({
  products: MOCK_PRODUCTS,
  form: true,
  setForm: () => {},
})

type ProductsProviderProps = {
  children: ReactNode
}
const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [form, setForm] = useState(true)

  return (
    <ProductsContext.Provider
      value={{ products: MOCK_PRODUCTS, form, setForm }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export { ProductsContext, ProductsProvider }
