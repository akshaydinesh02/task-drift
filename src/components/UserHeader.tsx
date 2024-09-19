import { useAuth } from "../contexts/Auth";
import { Link } from "react-router-dom";

const UserHeader = () => {
  const user = useAuth().user;
  return user ? (
    <div className="max-w-5xl mx-auto pt-4">
      <nav className="flex gap-12 items-center justify-start uppercase text-xl font-extrabold tracking-widest">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </div>
  ) : (
    <></>
  );
};

export default UserHeader;
