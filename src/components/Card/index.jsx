import React from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';
import styles from './Card.module.scss'

const Card = ({id, img, description, price, onFavorite, onPlus, isFromFavorites=false, loading=true}) => {

    const { isBookAdded, isBookLiked } = React.useContext(AppContext);
    const book = { id, parentId: id, img, description, price };

    const onCLickPlus = () => {
      onPlus(book);
    }

    const onClickLike = () => {
      onFavorite(book);
    }

    return (
        <div className={styles.card}>
          {loading ? <ContentLoader 
            speed={2}
            width={400}
            height={387}
            viewBox="0 0 400 387"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <rect x="0" y="0" rx="5" ry="5" width="27" height="27" />
            <rect x="30" y="23" rx="15" ry="15" width="180" height="250" /> 
            <rect x="1" y="295" rx="5" ry="5" width="240" height="31" /> 
            <rect x="1" y="353" rx="5" ry="5" width="45" height="35" /> 
            <rect x="205" y="353" rx="5" ry="5" width="33" height="32" />
          </ContentLoader> : <>
            <div className={styles.favorite}>
              {onFavorite && <img  onClick={onClickLike} src={isBookLiked(id, isFromFavorites) ? "/img/liked.png" : "/img/unliked.png"} width={25} height={23} alt="Unliked" />}
            </div>
            <img width={180} height={250} className={styles.book} src={img} alt="" />
            <h5>{description}</h5>
            <div className={styles.cardBottom}>
              <div className={styles.price}>
              <span>Price:</span>
              <b>{price} $</b>
              </div>
              {onPlus && <img className={styles.plus} onClick={onCLickPlus} src={isBookAdded(id) ? "/img/btn-checked.svg" : "/img/plus.svg"} alt="Plus" />}
            </div>
          </>}
        </div>)
}

export default Card;