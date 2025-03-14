import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    file: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  // Input change handler
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // File change handler
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // Form submission handler
  const submitHandler = async (e) => {
    e.preventDefault();
  
    // Create FormData and only include non-empty fields
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });
  
    console.log("Payload being sent:", Array.from(formData.entries()));
  
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
  
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-6">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg border border-gray-300 rounded-lg p-8 my-10 shadow-lg bg-white"
        >
          <h1 className="font-bold text-3xl mb-8 text-center text-blue-600">
            Register
          </h1>

          <div className="space-y-4">
            {/* Fullname */}
            <div>
              <Label>Fullname</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="johndoe@gmail.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="********"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="+1234567890"
              />
            </div>

            {/* Role Selection */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  required
                />
                <Label>Student</Label>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                />
                <Label>Recruiter</Label>
              </div>
            </div>

            {/* Profile Photo */}
            <div>
              <Label>Profile Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-600 hover:bg-blue-800 rounded-md"
              disabled={loading}
              style={{ marginTop: "2.5rem" }}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {/* Already have an account */}
            <p className="text-gray-600 text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
