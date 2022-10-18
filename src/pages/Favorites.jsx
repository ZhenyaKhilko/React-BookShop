import React from "react";
import AppContext from "../context";
import Card from "../components/Card";
import Emptiness from "../components/Emptiness";

const Favorites = () => {
    const { favBooks, onRemoveFromFavorites } = React.useContext(AppContext);

    return (
        <div className="content">
            <div className="content-item">
                <h2>My favorites</h2>
            </div>
            <div className="cards">
                {favBooks.map((book) => <Card {...book} onFavorite={onRemoveFromFavorites} key={book.description} isFromFavorites={true} loading={false}/>)}
                {!favBooks.length && <Emptiness title={"You didn't add anything to favorites yet!"} image={"/img/sad-emotion1.svg"}/>}
            </div>
        </div>
    )
}

export default Favorites;