import React, { useState, useContext } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate, useLocation } from 'react-router-dom'

const Placeorder = () => {
  const { cartItems, food_list } = useContext(StoreContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Delivery information submitted:', form)
    // TODO: integrate with order flow
  }

  // Cart calculations (reused from Cart page)
  const itemIds = Object.keys(cartItems || {}).filter(id => cartItems[id] > 0)

  const grandTotal = itemIds.reduce((sum, id) => {
    const food = food_list.find(f => f._id === id)
    const price = food ? food.price : 0
    return sum + price * cartItems[id]
  }, 0)

  // Attempt to read a promo passed through location state, otherwise none
  const appliedPromo = location?.state?.appliedPromo || null

  const discount = appliedPromo
    ? (appliedPromo.type === 'percent' ? (grandTotal * appliedPromo.value) / 100 : appliedPromo.value)
    : 0

  const discountedTotal = Math.max(0, grandTotal - discount)

  const deliveryCharge = itemIds.length > 0 ? Math.max(2, Math.min(5, Number((discountedTotal * 0.05).toFixed(2) || 2))) : 0;

  const finalTotal = Math.max(0, discountedTotal + deliveryCharge);

  const handleProceedToPayment = () => {
    // navigate to a (future) payment page, passing total
    navigate('/payment', { state: { total: finalTotal } })
  }

  // Layout moved to `Placeorder.css`
  // classNames: .placeorder-container, .placeorder-section, .row, .two-cols, .three-cols, .order-summary, .input-field, .btn-primary, .btn-payment


  return (
    <div className="placeorder-container">
      <section className="placeorder-section">
        <h2 style={{ marginTop: 0 }}>Delivery Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="row two-cols">
            <label>
              First name
              <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="First name" className="input-field" />
            </label>
            <label>
              Last name
              <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Last name" className="input-field" />
            </label>
          </div>

          <div className="row">
            <label>
              Email address
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="input-field" />
            </label>
          </div>

          <div className="row">
            <label>
              Street
              <input name="street" value={form.street} onChange={handleChange} required placeholder="Street address" className="input-field" />
            </label>
          </div>

          <div className="row three-cols">
            <label>
              City
              <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="input-field" />
            </label>
            <label>
              State
              <input name="state" value={form.state} onChange={handleChange} required placeholder="State" className="input-field" />
            </label>
            <label>
              Zip code
              <input name="zip" value={form.zip} onChange={handleChange} required placeholder="Zip code" className="input-field" />
            </label>
          </div>

          <div className="row">
            <label>
              Country
              <input name="country" value={form.country} onChange={handleChange} required placeholder="Country" className="input-field" />
            </label>
          </div>

          <div>
            <button type="submit" className="btn-primary">Save delivery info</button>
          </div>
        </form>
      </section>

      <section className="placeorder-section order-summary">
        <h3 style={{ marginTop: 0 }}>Order Summary</h3>
        <div className='cart-total'>
          <p><strong>Grand Total: </strong> ${grandTotal.toFixed(2)}</p>
          {appliedPromo && (
            <p className='cart-discount'><strong>Discount:</strong> -${discount.toFixed(2)} ({appliedPromo.type === 'percent' ? `${appliedPromo.value}%` : `$${appliedPromo.value}`})</p>
          )}
          <p className='cart-final'><strong>Total after promo: </strong> ${discountedTotal.toFixed(2)}</p>
          <p className='delivery-charge'><strong>Delivery charge:</strong> ${deliveryCharge.toFixed(2)}</p>
          <p className='payable-total'><strong>Amount Payable:</strong> ${finalTotal.toFixed(2)}</p>

          <div className="payment-button-wrap">
            <button onClick={handleProceedToPayment} className="btn-payment" disabled={itemIds.length === 0}>Proceed to Payment</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Placeorder