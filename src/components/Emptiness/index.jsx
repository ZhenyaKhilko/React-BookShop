import { Link } from 'react-router-dom';
import styles from './Emptiness.module.scss';

function Emptiness ({image, title}) {
    return(
        <div className={styles.content}>
            <p className={styles.image}>
                <img src={image} alt=":(" />
            </p>
            <p className={styles.text}>{title}</p>
            <Link to="/React-BookShop/">
                <button className={styles.button}>
                    <img className={styles.buttonImage} width={18} height={18} src="img/arrow1.svg" alt="Arrow" />Back
                </button>
            </Link>
        </div>
    )
}

export default Emptiness;