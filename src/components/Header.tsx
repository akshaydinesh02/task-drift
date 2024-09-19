import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

const Header = () => {
  const signOut = useAuth().signOut;
  const user = useAuth().user;
  const navigate = useNavigate();
  const path = useLocation().pathname;

  return (
    <div className="py-2 px-12 border-b bg-gray-200 flex justify-between">
      <h1 className="border text-lg font-extrabold">Task Drift</h1>
      {user ? (
        <button
          disabled={path === "/auth/sign-up"}
          onClick={() => {
            console.log("signout");
            signOut();
          }}
          className="border font-semibold"
        >
          Sign Out
        </button>
      ) : (
        <button
          disabled={path === "/auth/sign-in"}
          onClick={() => navigate("/auth/sign-in")}
          className="border font-semibold disabled:strikethrough"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
