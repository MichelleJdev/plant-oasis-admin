import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Inventory.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import NameEditor from "../../../components/NameEditor/NameEditor";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import ProductActions from "../ProductActions/ProductActions";
import CheckFilter from "../../../components/CheckFilter/CheckFilter";
import axiosInstance from "../../../API/axiosInstance";
import { PRODUCTS_ENDPOINT, CATEGORIES_ENDPOINT } from "../../../API/endpoints";
import useFetch from "../../../hooks/useFetch";
import useRename from "../../../hooks/useRename";
import useDelete from "../../../hooks/useDelete";
import ContentLoading from "../../../components/ContentLoading/ContentLoading";
import { toast } from "react-toastify";

function Inventory() {
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: categories, loading: categoriesLoading } =
    useFetch(CATEGORIES_ENDPOINT);

  const {
    loading: productsLoading,
    setLoading: setProductsLoading,
    data: products,
    setData: setProducts,
  } = useFetch(PRODUCTS_ENDPOINT);

  const { resourceToDelete, setResourceToDelete, handleDelete } = useDelete(
    PRODUCTS_ENDPOINT,
    setProductsLoading,
    setProducts,
    "Product"
  );

  const { newName, setNewName, resourceToRename, setResourceToRename } =
    useRename();

  const handleRename = async () => {
    try {
      setProductsLoading(true);
      const response = await axiosInstance.patch(
        `${PRODUCTS_ENDPOINT}/${resourceToRename}`,
        {
          product: {
            name: newName,
          },
        }
      );
      setProducts((prev) =>
        prev.map((resource) =>
          resource._id !== resourceToRename
            ? resource
            : { ...resource, name: response.data.name }
        )
      );
      toast.success("Rename successful!");
      setResourceToRename(null);
      setProductsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to rename resource");
      setProductsLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!checkedCategories.length && !searchTerm.length) return products;
    let filtered = [];
    if (checkedCategories.length) {
      filtered = products.filter((product) =>
        checkedCategories.includes(product.category)
      );
    }
    if (searchTerm) {
      if (checkedCategories.length) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
      } else {
        filtered = products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
      }
    }
    return filtered;
  }, [products, searchTerm, checkedCategories]);

  return (
    <>
      <div className="Inventory">
        {productsLoading ? (
          <ContentLoading text="Loading Products" />
        ) : (
          <>
            <div className="sticky">
              <SearchBar
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                searchByText="product name"
              />

              <CheckFilter
                loading={categoriesLoading}
                text="Filter by category"
                setCheckedVals={setCheckedCategories}
                checkedVals={checkedCategories}
                possibleValues={categories}
              />
            </div>

            <ul className="resource-list">
              {filteredProducts.map((product) => (
                <li key={product._id} className="product-list-item">
                  {product._id === resourceToRename ? (
                    <NameEditor
                      newName={newName}
                      setNewName={setNewName}
                      handleRename={handleRename}
                      setResourceToRename={setResourceToRename}
                      currentName={product.name}
                    />
                  ) : (
                    <>
                      <div className="name-img-group">
                        <div className="image-container">
                          <img src={product.thumbnail} alt={product.name} />{" "}
                        </div>
                        <Link to={`/products/${product._id}`}>
                          {product.name}
                        </Link>
                      </div>
                      <ProductActions
                        productId={product._id}
                        setRenaming={setResourceToRename}
                        setDeleting={setResourceToDelete}
                      />
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {resourceToDelete ? (
        <ConfirmModal
          text="Do you wish to delete this product?"
          handleConfirm={handleDelete}
          handleCancel={() => setResourceToDelete(null)}
        />
      ) : null}
    </>
  );
}

export default Inventory;
