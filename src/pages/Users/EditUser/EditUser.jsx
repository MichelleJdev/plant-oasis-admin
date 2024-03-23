import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../API/axiosInstance";
import AccordionItem from "../../../components/AccordionItem/AccordionItem";
import { USERS_ENDPOINT } from "../../../API/endpoints";
import { toast } from "react-toastify";
import ContentLoading from "../../../components/ContentLoading/ContentLoading";
import "./EditUser.css";
import UserDetails from "../UserDetails/UserDetails";
import NameEditor from "../../../components/NameEditor/NameEditor";
import useFetch from "../../../hooks/useFetch";
import useRename from "../../../hooks/useRename";
import useToggleState from "../../../hooks/useToggleState";

function EditUser() {
  const { id } = useParams();

  const [updateLoading, setUpdateLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    data: user,
    loading: userLoading,
    setLoading: setUserLoading,
    refresh,
  } = useFetch(`${USERS_ENDPOINT}/${id}`);
  const { newName, setNewName, resourceToRename, setResourceToRename } =
    useRename();

  const { state: showPassContent, toggleState: togglePassAccordion } =
    useToggleState();

  const nameUnchanged = user?.name === newName;
  const disabled = userLoading || updateLoading;
  const handleRename = async () => {
    if (nameUnchanged) return;
    setUserLoading(true);
    try {
      const response = await axiosInstance.patch(`${USERS_ENDPOINT}/${id}`, {
        user: {
          name: newName,
        },
      });
      setUserLoading(false);
      refresh();
    } catch (error) {
      setUserLoading(false);
      console.log(error);
      toast.error("Failed to rename resource");
    }
  };

  const handlePasswordChange = (evt) => {
    setNewPassword(evt.target.value);
  };
  const handleConfirmPasswordChange = (evt) => {
    setConfirmPassword(evt.target.value);
  };
  const changePassword = async (evt) => {
    evt.preventDefault();
    try {
      setUpdateLoading(true);
      await axiosInstance.patch(`/users/password/${id}`, {
        user: {
          password: newPassword,
        },
      });
      setUpdateLoading(false);
    } catch (error) {
      setUpdateLoading(false);
      console.log(error);
    }
  };

  return userLoading ? (
    <ContentLoading text="Loading user details" />
  ) : (
    <div className="EditUser section">
      <UserDetails user={user} />

      <div className="accordion">
        <AccordionItem
          key="rename"
          title="Change Name"
          showContent={!!resourceToRename}
          toggleShowContent={() => setResourceToRename(!!!resourceToRename)}
        >
          <div className="accordion-content">
            <NameEditor
              newName={newName}
              setNewName={setNewName}
              setResourceToRename={setResourceToRename}
              handleRename={handleRename}
              currentName={user.name}
            />
          </div>
        </AccordionItem>
        <AccordionItem
          key="pass"
          title="Change Password"
          showContent={showPassContent}
          toggleShowContent={togglePassAccordion}
        >
          <form
            className="user-pass-form accordion-content"
            action=""
            onSubmit={changePassword}
          >
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                value={newPassword}
                type="password"
                name="password"
                id="password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                type="password"
                name="confirm-pass"
                id="confirm-pass"
              />
            </div>
            <button className="btn submit-btn" type="submit">
              Submit
            </button>
          </form>
        </AccordionItem>
      </div>
    </div>
  );
}

export default EditUser;
