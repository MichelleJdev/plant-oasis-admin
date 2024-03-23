import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import formatUnitAmount from "../../../utils/formatUnitAmount";
import AccordionItem from "../../../components/AccordionItem/AccordionItem";
import "./OrderDetails.css";
import ContentLoading from "../../../components/ContentLoading/ContentLoading";

function OrderDetails() {
  const { id } = useParams();

  const { data: orderData, loading: orderDataLoading } = useFetch(
    `/orders/${id}`
  );
  const { order } = orderData;
  return orderDataLoading ? (
    <ContentLoading text="Loading order details" />
  ) : (
    <div className="OrderDetails">
      <h2 className="order-no">
        {" "}
        <span>Order:</span> {order.orderNo}
      </h2>

      <section>
        <h3>Customer Details</h3>
        <dl>
          <dt>Email: {order.customer.email}</dt>
          <dt>Registered: {order.customer.user ? "Yes" : "No"}</dt>
        </dl>
      </section>
      <section>
        <h3>Delivery Address</h3>
        <address>
          {order.shippingAddress.line1}
          <br />
          {order.shippingAddress.line2 ? (
            <>
              {" "}
              {order.shippingAddress.line2}
              <br />
            </>
          ) : null}
          {order.shippingAddress.city}
          <br />
          {order.shippingAddress.postalCode}
          <br />
          United Kingdom
          <br />
        </address>
      </section>
      <section>
        <h3>Order Items</h3>
        <ul>
          {order.items.map((item) => (
            <li key={item.product}>
              <dl>
                <dt>{item.name}</dt>
                <dt>Qty: {item.quantity}</dt>
                <dt className="price">{formatUnitAmount(item.unitAmount)}</dt>
              </dl>
            </li>
          ))}
        </ul>
        <h2 className="total">
          {" "}
          <span>Total:</span> {formatUnitAmount(order.total)}
        </h2>
      </section>
    </div>
  );
}

export default OrderDetails;
