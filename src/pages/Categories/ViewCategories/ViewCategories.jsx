import useFetch from "../../../hooks/useFetch";
import useRename from "../../../hooks/useRename";
import useDelete from "../../../hooks/useDelete";
import axiosInstance from "../../../API/axiosInstance";
import CategoryActions from "../CategoryActions";
import ContentLoading from "../../../components/ContentLoading/ContentLoading";
import NameEditor from "../../../components/NameEditor/NameEditor";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { CATEGORIES_ENDPOINT } from "../../../API/endpoints";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./ViewCategories.css";

function ViewCategories() {
  const {
    loading: categoriesLoading,
    setLoading: setCategoriesLoading,
    data: categories,
    setData: setCategories,
  } = useFetch(CATEGORIES_ENDPOINT);

  const { handleDelete, resourceToDelete, setResourceToDelete } = useDelete(
    CATEGORIES_ENDPOINT,
    setCategoriesLoading,
    setCategories,
    "Category"
  );

  const { newName, setNewName, resourceToRename, setResourceToRename } =
    useRename();

  const handleRename = async () => {
    try {
      setCategoriesLoading(true);
      const response = await axiosInstance.patch(
        `${CATEGORIES_ENDPOINT}/${resourceToRename}`,
        {
          category: {
            name: newName,
          },
        }
      );
      console.log(response);
      setCategories((prev) =>
        prev.map((resource) =>
          resource._id !== resourceToRename
            ? resource
            : { ...resource, name: response.data.name }
        )
      );

      setResourceToRename(null);
      setCategoriesLoading(false);
      toast.success("Rename successful!");
    } catch (error) {
      console.log(error);
      setCategoriesLoading(false);
      toast.error("Failed to rename resource");
    }
  };

  return (
    <>
      <div className="ViewCategories">
        {categoriesLoading ? (
          <ContentLoading text="Loading Categories" />
        ) : (
          <ul className="resource-list">
            {categories.map((category) => (
              <li key={category._id}>
                {category._id === resourceToRename ? (
                  <NameEditor
                    newName={newName}
                    setNewName={setNewName}
                    handleRename={handleRename}
                    setResourceToRename={setResourceToRename}
                    currentName={category.name}
                  />
                ) : (
                  <>
                    <div className="name-img-group">
                      <div className="image-container">
                        <img src={category.imageUrl} alt="" />
                      </div>
                      <Link to={`/categories/${category._id}`}>
                        {category.name}{" "}
                      </Link>
                    </div>

                    <CategoryActions
                      categoryId={category._id}
                      setCategories={setCategories}
                      setResourceToRename={setResourceToRename}
                      setResourceToDelete={setResourceToDelete}
                    />
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {resourceToDelete ? (
        <ConfirmModal
          text="Do you wish to delete this category?"
          handleConfirm={handleDelete}
          handleCancel={() => setResourceToDelete(null)}
        />
      ) : null}
    </>
  );
}

export default ViewCategories;
