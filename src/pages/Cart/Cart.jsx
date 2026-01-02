import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoMessage, setPromoMessage] = useState('')
  const navigate = useNavigate()

  const itemIds = Object.keys(cartItems || {}).filter(id => cartItems[id] > 0);

  const grandTotal = itemIds.reduce((sum, id) => {
    const food = food_list.find(f => f._id === id);
    const price = food ? food.price : 0;
    return sum + price * cartItems[id];
  }, 0);

  const discount = appliedPromo
    ? (appliedPromo.type === 'percent' ? (grandTotal * appliedPromo.value) / 100 : appliedPromo.value)
    : 0

  const discountedTotal = Math.max(0, grandTotal - discount)

  // Delivery charge is 5% of discounted total but bounded between $2 and $5 when cart is not empty
  const deliveryCharge = itemIds.length > 0 ? Math.max(2, Math.min(5, Number((discountedTotal * 0.05).toFixed(2) || 2))) : 0;

  const finalTotal = Math.max(0, discountedTotal + deliveryCharge);

  const handleApplyPromo = () => {
    const code = (promoInput || '').trim().toUpperCase()
    if (!code) {
      setPromoMessage('Enter a promo code')
      return
    }
    if (code === 'SAVE10') {
      setAppliedPromo({ type: 'percent', value: 10 })
      setPromoMessage('Promo applied: 10% off')
    } else if (code === 'FLAT5') {
      setAppliedPromo({ type: 'flat', value: 5 })
      setPromoMessage('Promo applied: $5 off')
    } else {
      setPromoMessage('Invalid promo code')
    }
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoInput('')
    setPromoMessage('Promo removed')
  }

  const handleCheckout = () => {
    // navigate to placeorder and pass total via state (optional)
    navigate('/placeorder', { state: { total: finalTotal } })
  }

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
             <p>Items</p>
             <p>Title</p>
             <p>Price</p>
             <p>Quantity</p>
             <p>Total</p>
             <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {itemIds.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          itemIds.map(id => {
            const item = food_list.find(f => f._id === id);
            const qty = cartItems[id];
            const price = item ? item.price : 0;
            return (
              <div className='cart-item-row' key={id}>
                {item?.image && <img src={item.image} alt={item?.name} width={60} />}
                <p>{item?.name || 'Unknown'}</p>
                <p>${price}</p>
                <p>{qty}</p>
                <p>${(price * qty).toFixed(2)}</p>
                <button onClick={() => removeFromCart(id)}>Remove</button>
              </div>
            )
          })
        )}
        <hr/>
        <div className='cart-total'>
          <p><strong>Grand Total: </strong> ${grandTotal.toFixed(2)}</p>
          {appliedPromo && (
            <p className='cart-discount'><strong>Discount:</strong> -${discount.toFixed(2)} ({appliedPromo.type === 'percent' ? `${appliedPromo.value}%` : `$${appliedPromo.value}`})</p>
          )}
          <p className='cart-final'><strong>Total after promo: </strong> ${discountedTotal.toFixed(2)}</p>
          <p className='delivery-charge'><strong>Delivery charge:</strong> ${deliveryCharge.toFixed(2)}</p>
          <p className='payable-total'><strong>Amount Payable:</strong> ${finalTotal.toFixed(2)}</p>

          <div className='cart-promo'>
            <input
              className='promo-input'
              placeholder='Enter promo code'
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              disabled={!!appliedPromo}
            />
            <button className='promo-apply' onClick={handleApplyPromo} disabled={!!appliedPromo}>Apply</button>
            {appliedPromo && <button className='promo-remove' onClick={handleRemovePromo}>Remove Promo</button>}
          </div>
          {promoMessage && <p className='promo-message'>{promoMessage}</p>}

          <div className='cart-footer'>
            <button className='checkout-button' onClick={handleCheckout} disabled={itemIds.length === 0}>Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart