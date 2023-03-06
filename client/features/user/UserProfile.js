import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser, updateUser } from "./UserProfileSlice";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.singleUser.user);
  const status = useSelector((state) => state.singleUser.status);
  const error = useSelector((state) => state.singleUser.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSingleUser(id));
    }
  }, [status, dispatch, id]);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, name, email, isAdmin }));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Is Admin</label>
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserProfile;
