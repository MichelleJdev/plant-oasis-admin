import { useState } from "react";
import axiosInstance from "../API/axiosInstance";
import { toast } from "react-toastify";

function useDelete(endpoint, setLoading, setData, resourceName) {
  const [resourceToDelete, setResourceToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(
        `${endpoint}/${resourceToDelete}`
      );
      setData((prev) =>
        prev.filter((resource) => resource._id !== response.data.id)
      );
      setResourceToDelete(null);
      setLoading(false);
      toast.info(`${resourceName} deleted`);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return {
    handleDelete,
    resourceToDelete,
    setResourceToDelete,
  };
}

export default useDelete;
