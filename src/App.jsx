
function App() {
  return (
  <div className="wrapper">
    <header>
      <div className="headerLeft">
        <img width={40} height={40} src="/img/logo.png" alt="Logo"/>
        <div className="headerInfo">
          <h3>Book shop</h3>
          <p>Only the best</p>
        </div>
      </div>
      <ul className="headerRight">
        <li>
          <img width={18} height={18} src="/img/cart.svg" alt="Logo"/>
          <span>10$</span>
        </li>
        <li>
          <img width={20} height={20} src="/img/user.svg" alt="User"/>
        </li>
      </ul>
    </header>
    <div className="content">
      <h1>All books</h1>
      <div className="cards">
        <div className="card">
          <img width={100} height={135} className="book" src="/img/books/OfHumanBondage.jpg" alt="" />
          <h5>Of human bondage by Maugham, W. Somerset</h5>
          <div className="card-bottom">
            <div className="price">
              <span>Price:</span>
              <b>30$</b>
            </div>
            <img className="plus" src="/img/plus.svg" alt="Plus" />
          </div>
        </div>
        <div className="card">
          <img width={100} height={135} className="book" src="/img/books/1984.jpg" alt="" />
          <h5>Of human bondage by Maugham, W. Somerset</h5>
          <div className="card-bottom">
            <div className="price">
              <span>Price:</span>
              <b>30$</b>
            </div>
            <img className="plus" src="/img/plus.svg" alt="Plus" />
          </div>
        </div>
        <div className="card">
          <img width={100} height={135} className="book" src="/img/books/MartinEden.jpg" alt="" />
          <h5>Of human bondage by Maugham, W. Somerset</h5>
          <div className="card-bottom">
            <div className="price">
              <span>Price:</span>
              <b>30$</b>
            </div>
            <img className="plus" src="/img/plus.svg" alt="Plus" />
          </div>
        </div>
        <div className="card">
          <img width={100} height={135} className="book" src="/img/books/Moon.jpg" alt="" />
          <h5>Of human bondage by Maugham, W. Somerset</h5>
          <div className="card-bottom">
            <div className="price">
              <span>Price:</span>
              <b>30$</b>
            </div>
            <img className="plus" src="/img/plus.svg" alt="Plus" />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default App;
