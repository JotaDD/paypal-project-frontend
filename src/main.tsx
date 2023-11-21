import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ProductsProvider } from './context/ProductsContext.tsx'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ProductsProvider>
    <PayPalScriptProvider
      options={{
        clientId: CLIENT_ID,
        currency: 'BRL',
        intent: 'capture',
      }}
    >
      <App />
    </PayPalScriptProvider>
  </ProductsProvider>,
)
