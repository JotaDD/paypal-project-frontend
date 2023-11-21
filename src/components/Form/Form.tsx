import { ChangeEvent, useContext, useState } from 'react'
import { ProductsContext } from '../../context/ProductsContext'
import Input from '../Input/Input'
import { InfoType } from '../../types/types'
import Swal from 'sweetalert2'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { OnApproveData } from '@paypal/paypal-js'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Form = () => {
  const { products, form, setForm } = useContext(ProductsContext)
  const [info, setInfo] = useState<InfoType>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  })

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    const newInfo = { ...info, [name]: value }
    if (name === 'country') {
      newInfo[name] = value.toUpperCase()
    }
    setInfo(newInfo)
  }

  const saveInfo = () => {
    sessionStorage.setItem('paypalForm', JSON.stringify(info))
    setForm(false)
  }

  const createOrder = () => {
    return fetch(`${BACKEND_URL}/paypal/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products,
        info: JSON.parse(sessionStorage.getItem('paypalForm') as string),
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id)
  }
  const handleApprove = (orderId: string) => {
    Swal.fire({
      title: 'Compra realizada com sucesso',
      text: orderId,
      icon: 'success',
    })
    setForm(!form)
  }
  const onApprove = (data: OnApproveData) => {
    return fetch(`${BACKEND_URL}/paypal/confirm-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    })
      .then((response) => response.json())
      .then((order) => handleApprove(order.id))
  }
  return (
    <>
      {form ? (
        <>
          <h2>Buyer Info</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <Input
                onChange={handleChange}
                type="text"
                name="firstName"
                label="Fist name"
              />
              <Input
                onChange={handleChange}
                type="text"
                name="lastName"
                label="Last name"
              />
              <Input
                onChange={handleChange}
                type="text"
                name="email"
                label="email"
              />
              <Input
                onChange={handleChange}
                type="text"
                name="phoneNumber"
                label="Phone number"
              />
            </fieldset>
            <h2>Shipping Address</h2>
            <fieldset className="shipping-address">
              <Input
                onChange={handleChange}
                type="text"
                name="address1"
                label="Address 1"
              />
              <Input
                onChange={handleChange}
                type="text"
                name="address2"
                label="Address 2"
              />
              <Input
                onChange={handleChange}
                type="text"
                name="city"
                label="City"
              />
              <Input
                onChange={handleChange}
                type="text"
                name="state"
                label="State"
              />
              <Input
                onChange={handleChange}
                type="text"
                name="zipCode"
                label="Zip Code "
              />
              <Input
                onChange={handleChange}
                type="text"
                name="country"
                label="Country"
                maxLength={2}
              />
            </fieldset>
            <button onClick={saveInfo}>CHECKOUT</button>
          </form>
        </>
      ) : (
        <PayPalButtons
          createOrder={createOrder}
          onApprove={(data) => onApprove(data)}
        />
      )}
    </>
  )
}

export default Form
