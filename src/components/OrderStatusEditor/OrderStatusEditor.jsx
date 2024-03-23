import { useState } from "react";
import SelectInput from "../SelectInput/SelectInput";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import "./OrderStatusEditor.css";
import axiosInstance from "../../API/axiosInstance";
import { ORDERS_STATUS_ENDPOINT } from "../../API/endpoints";

const orderStatusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

function OrderStatusEditor({ id, initialStatus, refresh }) {
  const [newStatus, setNewStatus] = useState();
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => setNewStatus(event.target.value);
  const handleConfirm = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.patch(
        `${ORDERS_STATUS_ENDPOINT}/${id}`,
        { order: { status: newStatus } }
      );
      setLoading(false);
      refresh();
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleCancel = () => setNewStatus("");

  return (
    <div className="OrderStatusEditor">
      <SelectInput
        selectName="Status"
        selected={newStatus}
        initialValue={initialStatus}
        options={orderStatusOptions}
        handleChange={handleChange}
      />
      {newStatus && newStatus !== initialStatus ? (
        <ConfirmModal
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
          text={`Change order status to ${newStatus.toUpperCase()}`}
          loading={loading}
        />
      ) : null}
    </div>
  );
}

export default OrderStatusEditor;
