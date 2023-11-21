import { ProductType } from '../../types/types'

type CardProps = {
  product: ProductType
}

const ProductCard = ({ product }: CardProps) => {
  const { amount, description, reference_id } = product
  return (
    <div>
      <h4>{description}</h4>
      <span>{`ID: ${reference_id}`}</span>
      <p>{amount.value}</p>
    </div>
  )
}

export default ProductCard
