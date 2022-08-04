import Paypal from "./PayPal/PayPal";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import Itemscheckout from "./ItemsCheckout";
import { getCart, getUser } from "../../redux/actions";
import { useAuth } from "../Context/Contestautenticacion";

export default function Checkout() {
  const dispatch = useDispatch();

  const checkoutinfo = JSON.parse(localStorage.getItem("carrito"));
  let precio = checkoutinfo.map((e) => e.cant * e.price);
  let users = useSelector((state) => state.user);
  const { user } = useAuth();

  let precioTotal = precio.reduce(function (a, b) {
    return a + b;
  }, 0);
  precioTotal = Number(precioTotal.toFixed(2));

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  let currentUser;
  let userId;
  let userEmail
  if (user !== null) {
    currentUser = users.filter((u) => u.email === user.email);
    userId = currentUser[0].id;
    userEmail = currentUser[0].email
  }

  const purchaseDetails = [];
  checkoutinfo.forEach((beer) => {
    purchaseDetails.push(beer.id);
  });

  return (
    <div className="checkout">
      <div className="checkoutCont">
        <div>
          {checkoutinfo?.map((e) => (
            <Itemscheckout
              key={e.id}
              image={e.image}
              name={e.name}
              price={e.price * e.cant}
              cant={e.cant}
            />
          ))}
        </div>
        <div className="pay">
          <h1 style={{ textAlign: "center", fontSize: "30px" }}>Order Total</h1>
          <h3>Total: ${precioTotal} </h3>
          <div className="paypal">
            <Paypal
              email={userEmail}
              userId={userId}
              precioTotal={precioTotal}
              purchaseDetails={purchaseDetails}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
