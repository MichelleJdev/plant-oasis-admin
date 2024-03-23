import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../API/axiosInstance";
import ImagePicker from "../../../components/ImagePicker/ImagePicker";
import PulseLoader from "react-spinners/PulseLoader";
import handleValidation from "../../../utils/handleValidation";
import { toast } from "react-toastify";
import "./CreateCategory.css";

import { categorySchema } from "../../../schemas";

const CATEGORY_ENDPOINT = "/categories";

function CreateCategory({ isEditMode }) {
  const [loading, setLoading] = useState(false);
  const [storedCategory, setStoredCategory] = useState("");

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    imageDataUrl: "",
  });
  const navigate = useNavigate();
  const imageInputRef = useRef();
  const { id } = useParams();

  const isValid = handleValidation(categorySchema, formState);
  const disabled = loading || !isValid;

  const handleChange = (evt) => {
    if (evt.target.name === "imageDataUrl") {
      const imageFile = evt.target.files[0];
      if (!imageFile)
        return setFormState({
          ...formState,
          [evt.target.name]: "",
        });

      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setFormState({
          ...formState,
          [evt.target.name]: reader.result,
        });
      };
      return;
    }

    setFormState({
      ...formState,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (disabled) return;
    let category = {};
    if (isEditMode) {
      for (let key in formState) {
        if (storedCategory[key] !== formState[key]) {
          category[key] = formState[key];
        }
      }
      if (!Object.keys(category).length)
        return toast.info("Make some changes to update resource");
    } else {
      category = { ...formState };
    }

    const sendForm = async () => {
      try {
        setLoading(true);
        if (isEditMode) {
          await axiosInstance.patch(`${CATEGORY_ENDPOINT}/${id}`, { category });

          setLoading(false);
          toast.info("Category updated!");
          navigate("/categories");
        } else {
          await axiosInstance.post(CATEGORY_ENDPOINT, {
            category,
          });
          setLoading(false);
          toast.success("New category created!");
          navigate("/categories");
        }
      } catch (error) {
        setLoading(false);
        if (error.response?.status === 500)
          return toast.error("Oops, something went wrong");
        toast.error(error.response?.data || "Oops, Something went wrong");
        console.log(error);
      }
    };

    sendForm();
  };

  useEffect(() => {
    if (isEditMode) {
      const getCategoryData = async () => {
        try {
          const response = await axiosInstance.get(
            `${CATEGORY_ENDPOINT}/${id}`
          );
          const { category } = response?.data;
          let imageDownload = await fetch(category.imageUrl);
          const blob = await imageDownload.blob();
          const file = new File(
            [blob],
            `${category?.name || "category"}.${category?.image?.format}`,
            { type: "image/png" }
          );
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setStoredCategory({ ...category, imageDataUrl: reader.result });
            setFormState({
              name: category?.name,
              description: category?.description,
              imageDataUrl: reader.result,
            });
          };
        } catch (error) {
          toast.error("Something went wrong");
          navigate("/");
        }
      };
      getCategoryData();
    }
  }, [isEditMode]);

  const { name, description, imageDataUrl } = formState;

  return (
    <div className="CreateCategory">
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
                <label htmlFor="description">Description</label>
                <textarea
                  onChange={handleChange}
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                />
              </div>
            </div>
            <ImagePicker
              inputRef={imageInputRef}
              imageDataUrl={imageDataUrl}
              handleChange={handleChange}
            />
          </div>
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
              "Create"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCategory;
