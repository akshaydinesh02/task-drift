import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import UserHeader from "./UserHeader";

const Header = () => {
  const signOut = useAuth().signOut;
  const user = useAuth().user;
  const navigate = useNavigate();
  const path = useLocation().pathname;

  return (
    <div className="fixed w-full">
      <div className="py-2 px-12 border-b bg-gray-50 border-b border-gray-400">
        <div className="max-w-5xl mx-auto flex justify-between">
          <h1 className="text-xl font-extrabold">Task Drift &#10004;</h1>
          {user ? (
            <button
              disabled={path === "/auth/sign-up"}
              onClick={() => {
                console.log("signout");
                signOut();
              }}
              className="font-semibold"
            >
              Sign Out
            </button>
          ) : (
            <button
              disabled={path === "/auth/sign-in"}
              onClick={() => navigate("/auth/sign-in")}
              className="font-semibold disabled:strikethrough"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <UserHeader />
    </div>
  );
};

export default Header;
