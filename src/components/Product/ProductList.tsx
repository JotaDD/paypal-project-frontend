import { useContext } from 'react'
import ProductCard from './ProductCard'
import { ProductsContext } from '../../context/ProductsContext'

const ProductList = () => {
  const { products, form } = useContext(ProductsContext)

  return (
    <div>
      {form ? (
        <>
          {products.map((product) => (
            <ProductCard key={product.reference_id} product={product} />
          ))}
        </>
      ) : (
        <p>
          Total: R${' '}
          {products
            .reduce(
              (acc: number, curr: { amount: { value: string | number } }) =>
                acc + +curr.amount.value,
              0,
            )
            .toFixed(2)}
        </p>
      )}
    </div>
  )
}

export default ProductList
