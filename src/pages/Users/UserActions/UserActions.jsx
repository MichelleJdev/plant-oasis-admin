import React from "react";
import "./UserActions.css";
import ViewOrEditBtn from "../../../components/ViewOrEditBtn/ViewOrEditBtn";
import DeleteBtn from "../../../components/DeleteBtn/DeleteBtn";
import RenameBtn from "../../../components/RenameBtn/RenameBtn";

function UserActions({ userId, setResourceToRename, setResourceToDelete }) {
  return (
    <div className="QuickActions ">
      <RenameBtn handleClick={() => setResourceToRename(userId)} />
      <ViewOrEditBtn path={`/users/${userId}`} />
      <DeleteBtn handleClick={() => setResourceToDelete(userId)} />
    </div>
  );
}

export default UserActions;
