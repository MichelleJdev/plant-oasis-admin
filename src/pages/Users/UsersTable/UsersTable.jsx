import React from "react";
import "./UsersTable.css";
import UserActions from "../UserActions/UserActions";
import NameEditor from "../../../components/NameEditor/NameEditor";
import truncate from "../../../utils/truncate";

function UsersTable({
  users,
  setResourceToRename,
  setResourceToDelete,
  resourceToRename,
  newName,
  handleRename,
  setNewName,
}) {
  const renameData = {
    user: {
      name: newName,
    },
  };
  return users.length ? (
    <div className="table-wrapper">
      <table className="UsersTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              {resourceToRename === user._id ? (
                <td className={resourceToRename ? "y-ctr" : ""}>
                  <NameEditor
                    newName={newName}
                    setNewName={setNewName}
                    handleRename={handleRename}
                    setResourceToRename={setResourceToRename}
                    currentName={user.name}
                  />
                </td>
              ) : (
                <td data-cell="name" className="caps">
                  {truncate(user.name, 20)}
                </td>
              )}

              <td data-cell="email" className="lowerCase">
                {truncate(user.email, 18)}
              </td>
              <td data-cell="actions">
                <div>
                  <UserActions
                    userId={user._id}
                    setResourceToDelete={setResourceToDelete}
                    setResourceToRename={setResourceToRename}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="mb-1">No users found</p>
  );
}

export default UsersTable;
