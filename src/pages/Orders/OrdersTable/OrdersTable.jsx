import { Link } from "react-router-dom";
import "./OrdersTable.css";
import { BiEdit } from "react-icons/bi";

import OrderStatusEditor from "../../../components/OrderStatusEditor/OrderStatusEditor";
import ViewOrEditBtn from "../../../components/ViewOrEditBtn/ViewOrEditBtn";

function OrdersTable({ orders = [], refresh }) {
  return orders.length ? (
    <div className="orders-table-wrapper">
      <table className="OrdersTable">
        <thead>
          <tr>
            <th>Order No.</th>
            <th>Customer Email</th>
            <th>Date </th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td data-cell="order no">{order.orderNo}</td>
              <td data-cell="customer email">{order.customer.email}</td>
              <td data-cell="date ordered">
                {new Intl.DateTimeFormat("en-GB").format(
                  new Date(order.createdAt)
                )}
              </td>

              <td data-cell="status">
                <OrderStatusEditor
                  id={order._id}
                  initialStatus={order.status}
                  refresh={refresh}
                />
              </td>
              <td data-cell="view/edit">
                <ViewOrEditBtn path={`/orders/${order._id}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div>No orders to display</div>
  );
}

export default OrdersTable;
