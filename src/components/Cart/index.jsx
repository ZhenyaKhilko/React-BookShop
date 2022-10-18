import React from 'react';
import axios from 'axios';

import Info from "../Info";
import { useCart } from '../../hooks/useCart';

import styles from "./Cart.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Cart = ({ books = [], onClickClose, onClickRemove, opened }) => {

    const { cartBooks, setCartBooks, totalPrice} = useCart();

    const [orderId, setOrderId] = React.useState(null);
    const [isOrdered, setIsOrdered] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post("https://633a063fe02b9b64c60bc6ae.mockapi.io/orders", {items : cartBooks});
            setOrderId(data.id);
            setIsOrdered(true);
            setCartBooks([]);
            for (let i = 0; i < cartBooks.length; ++i) {
              let book = cartBooks[i];
              await axios.delete("https://633a063fe02b9b64c60bc6ae.mockapi.io/cart/" + book.id);
              //await delay(1000);
            }
        } catch (error) {
            alert("Oops! Something went wrong, please try again :(");
        }
        setIsLoading(false);
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2>Cart <img className="classItem-remove" onClick={onClickClose}  src="/img/remove-btn.svg" alt="Remove" /></h2>
                
                {books.length > 0 ? (
                    <>
                        <div className={styles.items}>
                            {books.map((book) => (
                                <div key={book.description} className="cartItem">
                                    <img width={80} height={100} className="cartItem-book" src={book.img} alt="Book" />
                                    <div className="cartItem-description">
                                        <p>{book.description}</p>
                                        <b>{book.price}$</b>
                                    </div>
                                    <img className="classItem-remove" onClick={() => onClickRemove(book.id)} src="/img/remove-btn.svg" alt="Remove" />
                                </div>
                            ))}
                        </div>

                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Total:</span>
                                    <div></div>
                                    <b>{totalPrice}$</b>
                                </li>
                                <li>
                                    <span>Tax 10%:</span>
                                    <div></div>
                                    <b>{totalPrice/10}$</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Make order <img src="/img/arrow.svg" alt="Arrow" /></button>
                        </div>
                    </>
                    ) : (
                      <Info title={isOrdered ? "Order completed" : "Cart is empty"}
                            image={isOrdered ? "/img/ordered.svg" : "/img/emptyCart.svg"}
                            description={isOrdered ? `Your order ${orderId} soon will be handled to courier` : "Add at least 1 book to make an order"} />
                    )}
            </div>
        </div>
    )
}

export default Cart;