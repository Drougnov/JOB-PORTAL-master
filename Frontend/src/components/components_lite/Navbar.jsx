import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error("Error logging out. Please try again.");
      }
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };

  const navLinks = user?.role === "Recruiter"
    ? [
        { to: "/admin/companies", label: "Companies" },
        { to: "/admin/jobs", label: "Jobs" },
      ]
    : [
        { to: "/Home", label: "Home" },
        { to: "/Browse", label: "Browse" },
        { to: "/Jobs", label: "Jobs" },
        { to: "/Creator", label: "About" },
      ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto p-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <img
            src="../../../public/puc_logo.png"
            alt="Logo"
            className="w-10 h-10"
            style={{ objectFit: "contain" }}
          />
          <span className="text-[#6B3AC2]">Job</span>
          <span className="text-[#FA4F09]">Portal</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`lg:flex items-center gap-8 absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent p-6 lg:p-0 transition-transform duration-300 ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full lg:translate-y-0"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.to} onClick={() => setIsMenuOpen(false)}>
              <Link
                to={link.to}
                className="block py-2 text-lg font-medium text-gray-900 hover:text-[#6B3AC2] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Authentication / Profile */}
          {!user ? (
            <div className="flex flex-col lg:flex-row gap-6 mt-6 lg:mt-0 items-center justify-center">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full lg:w-auto px-6 py-3 text-lg font-medium">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full lg:w-auto px-6 py-3 text-lg font-medium bg-red-600 hover:bg-red-700">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-transparent hover:border-gray-300 transition-all duration-200 ease-in-out">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-full sm:w-96 md:w-80 shadow-lg rounded-xl bg-white p-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-gray-900">{user?.fullname}</h3>
                    {user?.profile?.bio && (
                      <p className="text-sm text-gray-600 mt-1">{user.profile.bio}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {user.role === "Student" && (
                    <Link
                      to="/Profile"
                      className="flex items-center gap-2 hover:text-[#6B3AC2] transition-all duration-200"
                    >
                      <User2 /> Profile
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-all duration-200"
                  >
                    <LogOut /> Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
