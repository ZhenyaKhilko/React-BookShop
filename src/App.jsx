import React from "react";
import axios from "axios";
import { Route, Routes } from 'react-router-dom';

import AppContext from "./context";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

function App() {
  const [books, setBooks] = React.useState([]);
  const [cartBooks, setCartBooks] = React.useState([]);
  const [openedCart, setOpenedCart] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [favBooks, setFavBooks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
      (async function fetchData () {
        try {
          setIsLoading(true);

          const [cartBooksResponse, favBooksResponse, booksResponse] = await Promise.all([
            axios.get("https://633a063fe02b9b64c60bc6ae.mockapi.io/cart"),
            axios.get("https://633a063fe02b9b64c60bc6ae.mockapi.io/favorites"),
            axios.get("https://633a063fe02b9b64c60bc6ae.mockapi.io/books"),
          ]);
  
          setIsLoading(false);
  
          setCartBooks(cartBooksResponse.data);
          setFavBooks(favBooksResponse.data);
          setBooks(booksResponse.data);
        } catch (error) {
          alert("Error! Couldn't get data from server :(");
          console.error(error);
        }
      })();
  }, []);

  const onAddToCart = async (cartBook) => {
    const findBook = cartBooks.find(book => +book.parentId === +cartBook.id);
    try {
      if (findBook) {
        setCartBooks((prevState) => prevState.filter((book) => +book.parentId !== +cartBook.id));
        await axios.delete(`https://633a063fe02b9b64c60bc6ae.mockapi.io/cart/${+findBook.id}`);
      }
      else {
        setCartBooks((prevState) => [...prevState, cartBook]);
        const {data} = await axios.post("https://633a063fe02b9b64c60bc6ae.mockapi.io/cart", cartBook);
        setCartBooks((prevState) => prevState.map(book => {
          if (book.parentId === data.parentId) {
            return {
              ...book,
              id: data.id
            };
          }
          return book;
        }));
      }  
    } catch (error) {
      alert("Error! Couldn't add book to cart :(");
      console.error(error);
    }
  }

  const onRemoveFromCart = (id) => {
    try {
      axios.delete(`https://633a063fe02b9b64c60bc6ae.mockapi.io/cart/${id}`);
      setCartBooks((prevState) => prevState.filter((book) => +book.id !== +id));
    } catch (error) {
      alert("Error! Couldn't remove book from cart");
      console.error(error);
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const onAddToFavorites = async (favBook) => {
    const findBook = favBooks.find(book => +book.parentId === +favBook.id);
    try {
      if (findBook) {
        setFavBooks((prevState) => prevState.filter((book) => +book.parentId !== +favBook.id));
        await axios.delete(`https://633a063fe02b9b64c60bc6ae.mockapi.io/favorites/${findBook.id}`);
      }
      else {
        setFavBooks((prevState) => [...prevState, favBook]);
        const { data } = await axios.post("https://633a063fe02b9b64c60bc6ae.mockapi.io/favorites", favBook);
        setFavBooks((prevState) => prevState.map(book => {
          if (book.parentId === data.parentId) {
            return {
              ...book,
              id: data.id,
            };
          }
          return book;
        }));
      }
    } 
    catch (error) {
      alert("Couldn't add favorites");
      console.error(error);
    }
  }

  const onRemoveFromFavorites = (favBook) => {
    try {
      axios.delete(`https://633a063fe02b9b64c60bc6ae.mockapi.io/favorites/${favBook.id}`);
      setFavBooks((prevState) => prevState.filter((book) => +book.id !== +favBook.id));
    } catch (error) {
      alert("Error! Couldn't remove book from favorites");
      console.error(error);
    }
  }

  const isBookAdded = (id) => {
    return cartBooks.some((cartBook) => +cartBook.parentId === +id);
  }

  const isBookLiked = (id, isFromFavs) => {
    return isFromFavs ? isFromFavs : favBooks.some((favBook) => +favBook.parentId === +id);
  }

  return (
    <AppContext.Provider 
      value={{books, cartBooks, favBooks, isBookAdded, isBookLiked, 
              onAddToFavorites, onRemoveFromFavorites, setOpenedCart, setCartBooks, onAddToCart}}>
        <div className="wrapper">
          <Cart books={cartBooks} onClickClose={() => setOpenedCart(false)} 
                onClickRemove={onRemoveFromCart} opened={openedCart}/>
          <Header onClickCart={() => setOpenedCart(true)}/>
          <Routes>
            <Route path="/React-BookShop/"
              element={<Home
                books={books} cartBooks={cartBooks} searchValue={searchValue}
                setSearchValue={setSearchValue} onChangeSearchInput={onChangeSearchInput} 
                onAddToCart={onAddToCart} onAddToFavorites={onAddToFavorites} isLoading={isLoading}/>}
              />
            <Route path="/React-BookShop/favorites" exact element={<Favorites />} />
            <Route path="/React-BookShop/orders" exact element={<Orders />} />
          </Routes>
        </div>
    </AppContext.Provider>
  )
}

export default App;
