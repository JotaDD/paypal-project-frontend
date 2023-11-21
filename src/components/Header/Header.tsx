import { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext'

const Header = () => {
  const { form } = useContext(ProductsContext)
  return (
    <header>
      <h1>{form ? 'Shopping Cart' : 'Checkout'}</h1>
    </header>
  )
}

export default Header
