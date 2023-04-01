import { useDispatch } from "react-redux";

import { logout } from "/src/features/authentication/stores/auth-slice";

const Homepage = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={() => dispatch(logout(""))}>Log out</button>
    </div>
  );
};

export default Homepage;
