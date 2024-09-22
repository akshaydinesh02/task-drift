import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="fixed w-full">
      <div className="py-2 px-4 md:px-12 h-12 border-b bg-gray-200 border-gray-200">
        <div className="max-w-5xl mx-auto flex justify-between">
          <button
            className="text-xl font-extrabold"
            onClick={() => {
              if (user) return;
              navigate("/");
            }}
          >
            Task Drift &#10004;
          </button>
          {user ? (
            <button
              disabled={pathname === "/auth/sign-up"}
              onClick={() => {
                signOut();
              }}
              className="font-semibold"
            >
              Sign Out
            </button>
          ) : (
            <button
              disabled={pathname === "/auth/sign-in"}
              onClick={() => navigate("/auth/sign-in")}
              className="font-semibold disabled:strikethrough"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
