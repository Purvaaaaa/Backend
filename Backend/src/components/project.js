import { useState, useContext } from "react";
import AuthContext from "../context/auth-context";

const project = (props) => {
  const [projectID, setProjectID] = useState("");
  const projectIDChangeHandler = (e) => {
    setProjectID(e.target.value);
  };

  const ctx = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <h3>Welcome [user], Select project</h3>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label>Bucket ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter bucket id"
            value={projectID}
            onChange={projectIDChangeHandler}
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

export default project;
