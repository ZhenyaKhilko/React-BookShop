import React from 'react';

import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Header = ({ onClickCart }) => {

    const { totalPrice } = useCart();

    return (
        <header>
            <Link to="/">
                <div className="headerLeft">
                    <img width={40} height={40} src="/img/logo.png" alt="Logo" />
                    <div className="headerInfo">
                        <h3>Book shop</h3>
                        <p>Only the best</p>
                    </div>
                </div>
            </Link>
            <ul className="headerRight">
                <li onClick={onClickCart} >
                    <img className="cartButton" width={18} height={18} src="/img/cart.svg" alt="Cart" />
                    <span>{totalPrice} $</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img className="favoriteButton" width={18} height={18} src="/img/favorite.svg" alt="Favorite" />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="/img/user.svg" alt="User" />
                    </Link>
                </li>
            </ul>
        </header>)
}

export default Header;