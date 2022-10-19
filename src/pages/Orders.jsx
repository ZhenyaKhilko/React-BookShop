import axios from "axios";
import React from "react";

import Card from "../components/Card";
import Emptiness from "../components/Emptiness";
import AppContext from "../context";

const Orders = () => {
  const {  } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("https://633a063fe02b9b64c60bc6ae.mockapi.io/orders");
        //setOrders(data.map((order) => order.items).flat());
        setOrders(data.reduce((prevState, order) => [...prevState, ...order.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Error! While trying to request orders");
        alert(error);
      }
    })();
  }, []);

  return (
      <div className="content">
          <div className="content-item">
              <h2>My orders</h2>
          </div>
          <div className="cards">
              {(isLoading ? [...Array(12)] : orders).map((book, index) => 
                <Card
                  key={index}
                  {...book} 
                  loading={isLoading}
                />)}
              {!orders.length && <Emptiness title={"You didn't add anything to orders yet!"} image={"img/sad-emotion1.svg"}/>}
          </div>
      </div>
  )
}

export default Orders;