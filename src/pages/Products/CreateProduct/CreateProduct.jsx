import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import SelectSkeleton from "../../../components/SelectSkeleton/SelectSkeleton";
import CurrencyInput from "react-currency-input-field";
import axiosInstance from "../../../API/axiosInstance";
import ImagePicker from "../../../components/ImagePicker/ImagePicker";
import handleValidation from "../../../utils/handleValidation";
import useFetch from "../../../hooks/useFetch";
import "./CreateProduct.css";
import { productSchema } from "../../../schemas";
import { toast } from "react-toastify";

import { PRODUCTS_ENDPOINT, CATEGORIES_ENDPOINT } from "../../../API/endpoints";

function CreateProduct({ isEditMode }) {
  const [loading, setLoading] = useState(false);
  const [storedProduct, setStoredProduct] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    numberInStock: 0,
    price: "",
    description: "",
    category: "",
    imageDataUrl: "",
  });

  const { name, numberInStock, price, description, category, imageDataUrl } =
    formState;

  const isValid = handleValidation(productSchema, formState);

  const imageInputRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: categories, loading: loadingCategories } =
    useFetch(CATEGORIES_ENDPOINT);

  const disabled = loading || !isValid || !formState.price?.length;

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (disabled) return;
    let product = {};
    if (isEditMode) {
      for (let key in formState) {
        if (storedProduct[key] !== formState[key]) {
          if (key !== "price") {
            product[key] = formState[key];
          }
        }
      }

      if (storedProduct.unitAmount !== parseFloat(formState.price) * 100) {
        product.unitAmount = parseFloat(formState.price) * 100;
      }
      if (!Object.keys(product).length)
        return toast.info("Make some changes to update resource");
      console.log(product);
    } else {
      product = {
        name,
        numberInStock,
        description,
        category,
        imageDataUrl,
        unitAmount: parseFloat(formState.price) * 100,
      };
    }

    const sendForm = async () => {
      try {
        setLoading(true);
        if (isEditMode) {
          const response = await axiosInstance.patch(
            `${PRODUCTS_ENDPOINT}/${id}`,
            { product }
          );
          console.log(response.data);
          setLoading(false);
          toast.info("Product updated");
          navigate("/products");
        } else {
          const response = await axiosInstance.post(PRODUCTS_ENDPOINT, {
            product,
          });
          console.log(response.data);
          setLoading(false);
          toast.success("Added new product");
          navigate("/products");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong");
        navigate("/products");
        console.log(error);
      }
    };
    sendForm();
  };

  const handlePriceChange = (val) => {
    setFormState({ ...formState, price: val });
  };

  const handleChange = (evt) => {
    if (evt.target.name === "imageDataUrl") {
      const imageFile = evt.target.files[0];
      if (!imageFile) return setFormState({ ...formState, imageDataUrl: "" });
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setFormState({ ...formState, imageDataUrl: reader.result });
      };
      return;
    }
    setFormState({
      ...formState,
      [evt.target.name]: evt.target.value,
    });
  };

  useEffect(() => {
    if (categories.length >= 1) {
      setFormState({ ...formState, category: categories[0]._id });
    }
  }, [categories]);

  useEffect(() => {
    if (isEditMode) {
      const getProductData = async () => {
        try {
          const response = await axiosInstance.get(
            `${PRODUCTS_ENDPOINT}/${id}`
          );
          const { product } = response?.data;
          console.log(product);
          let imageDownload = await fetch(product.imageUrl);
          const blob = await imageDownload.blob();
          const file = new File(
            [blob],
            `${product?.name || "product"}.${product?.image?.format}`,
            { type: "image/png" }
          );
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setStoredProduct({ ...product, imageDataUrl: reader.result });
            setFormState({
              price: parseFloat(product?.unitAmount / 100).toString(),
              name: product.name,
              numberInStock: product?.numberInStock,
              description: product?.description,
              category: product?.category,
              imageDataUrl: reader.result,
            });
            setLoading(false);
          };
        } catch (error) {
          console.log(error);
          toast.error("Unable to fetch data");
        }
      };
      getProductData();
    }
  }, [isEditMode, setFormState, setStoredProduct]);

  return (
    <div className="CreateProduct">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-inputs">
            <div>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                />
              </div>
              <div className="input-group">
                <label htmlFor="numberInStock">Number In Stock</label>
                <input
                  onChange={handleChange}
                  type="number"
                  id="numberInStock"
                  name="numberInStock"
                  min="0"
                  value={numberInStock}
                />
              </div>
              <div className="input-group">
                <label htmlFor="price">Price per item</label>
                <CurrencyInput
                  intlConfig={{ locale: "en-GB", currency: "GBP" }}
                  decimalScale={2}
                  onValueChange={handlePriceChange}
                  value={price}
                  defaultValue={""}
                />
              </div>
              <div className="input-group">
                <label htmlFor="description">Description</label>
                <textarea
                  onChange={handleChange}
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  maxLength={350}
                />
              </div>
            </div>
            <div>
              <div className="input-group">
                <label htmlFor="category">Category</label>
                {loadingCategories ? (
                  <SelectSkeleton text="Loading Categories" />
                ) : (
                  <select
                    name="category"
                    value={category}
                    onChange={handleChange}
                    id="category"
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <ImagePicker
                inputRef={imageInputRef}
                imageDataUrl={imageDataUrl}
                imageInput=""
                handleChange={handleChange}
              />
              <button
                className={`btn submit-btn ${disabled ? "disabled" : ""}`}
                type="submit"
                disabled={disabled}
              >
                {loading ? (
                  <PulseLoader color="grey" />
                ) : isEditMode ? (
                  "Update"
                ) : (
                  "Create Product"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
