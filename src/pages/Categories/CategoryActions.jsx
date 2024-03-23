import RenameBtn from "../../components/RenameBtn/RenameBtn";
import ViewOrEditBtn from "../../components/ViewOrEditBtn/ViewOrEditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";

function CategoryActions({
  categoryId,
  setResourceToRename,
  setResourceToDelete,
}) {
  return (
    <div className="QuickActions">
      <RenameBtn handleClick={() => setResourceToRename(categoryId)} />
      <ViewOrEditBtn path={`/categories/${categoryId}`} />
      <DeleteBtn handleClick={() => setResourceToDelete(categoryId)} />
    </div>
  );
}

export default CategoryActions;
