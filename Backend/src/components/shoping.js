import { useState, useContext } from "react";
import AuthContext from "../context/auth-context";

const Shoping = (props) => {
  const [bucketID, setBucketID] = useState("");
  const bucketIDChangeHandler = (e) => {
    setBucketID(e.target.value);
  };

  const ctx = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <h3>Welcome [user], Select bucket</h3>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label>Bucket ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter bucket id"
            value={bucketID}
            onChange={bucketIDChangeHandler}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </div>
      </form>
    </>
  );
};

export default Shoping;
