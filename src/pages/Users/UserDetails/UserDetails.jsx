import React from "react";
import "./UserDetails.css";

function UserDetails({ user }) {
  const { name, email, createdAt } = user;
  return (
    <div className="UserDetails">
      <div className="user-name">
        <span>Name:</span> {name}
      </div>

      <div className="user-email">
        <span>Email Address:</span> {email}
      </div>
      {createdAt ? (
        <div className="user-reg-date">
          <span>Date Registered:</span>
          {new Intl.DateTimeFormat("en-GB").format(new Date(createdAt))}
        </div>
      ) : null}
    </div>
  );
}

export default UserDetails;
