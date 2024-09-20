import { useAuth } from "../contexts/Auth";
import { Link } from "react-router-dom";

const UserHeader = () => {
  const user = useAuth().user;
  return user ? (
    <div className="w-full bg-gray-200">
      <div className="max-w-5xl mx-auto py-2 flex justify-start items-center">
        <nav className="flex gap-12 items-center justify-start uppercase text-xl font-extrabold tracking-widest">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default UserHeader;
