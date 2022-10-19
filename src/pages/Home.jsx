import React from "react";

import Card from "../components/Card";

const Home = ({ books, searchValue, setSearchValue, onChangeSearchInput, onAddToCart, onAddToFavorites, isLoading }) => {

  const renderBooks = () => {
  return (isLoading ? [...Array(12)] : books.filter(book => book.description.toLowerCase().includes(searchValue.toLowerCase())))
  .map((book, index) => (
    <Card
      key={index}
      {...book} 
      onPlus={(cartBook) => onAddToCart(cartBook)}
      onFavorite={(favBook) => onAddToFavorites(favBook)}
      loading={isLoading}
    />
  ));
}

  return (
    <div className="content">
      <div className="content-item">
        <h1>{searchValue ? `Search result: "${searchValue}"` : 'All books'}</h1>
        <div className="search-block">
          <img className="search" width={25} height={25} src="img/search.png" alt="Search" />
          {searchValue && <img className="reset" width={15} height={15} onClick={() => setSearchValue('')} src="img/reset.png" alt="Reset" />}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
        </div>
      </div>
      <div className="cards">
        {renderBooks()}
        </div>
    </div>
  )
}

export default Home;