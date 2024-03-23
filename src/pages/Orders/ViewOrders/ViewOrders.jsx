import "./ViewOrders.css";
import { useState, useMemo } from "react";
import OrdersTable from "../OrdersTable/OrdersTable";
import useFetch from "../../../hooks/useFetch";
import { ORDERS_ENDPOINT } from "../../../API/endpoints";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ContentLoading from "../../../components/ContentLoading/ContentLoading";

function ViewOrders() {
  const { data: orders, loading, refresh } = useFetch(ORDERS_ENDPOINT);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOrders = useMemo(() => {
    if (!searchTerm.length) return orders;
    return orders.filter(
      (order) =>
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, orders]);
  return (
    <div className="ViewOrders">
      {loading ? (
        <ContentLoading text="Loading Orders" />
      ) : (
        <>
          <div className="sticky">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchByText="customer email or order number"
            />
          </div>

          <OrdersTable orders={filteredOrders} refresh={refresh} />
        </>
      )}
    </div>
  );
}

export default ViewOrders;
