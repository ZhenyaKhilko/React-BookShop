import React from 'react'
import AppContext from '../context';

const Info = ({ title="Cart is empty", image, description="Add at least 1 book to make an order" }) => {
  
  const { setOpenedCart } = React.useContext(AppContext);

  return (
    <div className="cartEmpty">
      <img className="emptyBox" src={image} alt="EmptyBox" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => setOpenedCart(false)} className="greenButton">
          <img className="emptyCartArrow" src="img/arrow.svg" alt="Arrow" />Back
      </button>
    </div>
  )
}

export default Info;
