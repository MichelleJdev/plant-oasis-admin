import React, { useMemo, useState } from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import UsersTable from "../UsersTable/UsersTable";
import ContentLoading from "../../../components/ContentLoading/ContentLoading";
import useFetch from "../../../hooks/useFetch";
import useRename from "../../../hooks/useRename";
import useDelete from "../../../hooks/useDelete";
import axiosInstance from "../../../API/axiosInstance";
import { toast } from "react-toastify";
import "./ViewUsers.css";
import { USERS_ENDPOINT } from "../../../API/endpoints";
function ViewUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    loading: usersLoading,
    setLoading: setUsersLoading,
    data: users,
    setData: setUsers,
  } = useFetch(USERS_ENDPOINT);

  const { resourceToDelete, setResourceToDelete, handleDelete } = useDelete(
    USERS_ENDPOINT,
    setUsersLoading,
    setUsers,
    "User"
  );

  const { newName, setNewName, resourceToRename, setResourceToRename } =
    useRename();

  const handleRename = async () => {
    try {
      setUsersLoading(true);
      const response = await axiosInstance.patch(
        `${USERS_ENDPOINT}/${resourceToRename}`,
        {
          user: {
            name: newName,
          },
        }
      );
      setUsers((prev) =>
        prev.map((resource) =>
          resource._id !== resourceToRename
            ? resource
            : { ...resource, name: response.data.name }
        )
      );
      toast.success("Rename successful!");
      setResourceToRename(null);
      setUsersLoading(false);
    } catch (error) {
      console.log();
      setUsersLoading(false);
      toast.error("Failed to rename resource");
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchTerm.length) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  return (
    <div className="ViewUsers">
      {usersLoading ? (
        <ContentLoading text="Loading Users" />
      ) : (
        <>
          <div className="sticky">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchByText="name or email"
            />
          </div>

          <UsersTable
            users={filteredUsers}
            setResourceToDelete={setResourceToDelete}
            setResourceToRename={setResourceToRename}
            resourceToRename={resourceToRename}
            setNewName={setNewName}
            handleRename={handleRename}
            newName={newName}
          />

          {resourceToDelete ? (
            <ConfirmModal
              handleConfirm={handleDelete}
              handleCancel={() => setResourceToDelete(null)}
              text="Are you sure you wish to delete this user?"
            />
          ) : null}
        </>
      )}
    </div>
  );
}

export default ViewUsers;
