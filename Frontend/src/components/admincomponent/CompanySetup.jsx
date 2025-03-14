import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar.jsx";
import { Button } from "../ui/button.jsx";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../utils/data.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById.jsx";
import { ChevronLeft } from "lucide-react"; // Importing chevron icon

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200 && res.data.message) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      } else {
        throw new Error("Unexpected API response.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
        {/* Back Link with Chevron Icon */}
        <div
          onClick={() => navigate("/admin/companies")}
          className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="text-base">Back</span>
        </div>


        <form onSubmit={submitHandler} className="bg-white p-8 shadow-lg rounded-lg">
          <div className="flex items-center gap-5 mb-6">
            <h1 className="font-bold text-2xl text-gray-800">Company Setup</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="my-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="my-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="my-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="my-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="my-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none"
                style={{ minHeight: "3rem" }}
              />
            </div>
          </div>

          <div className="mt-8">
            {loading ? (
              <Button className="w-full py-3 flex justify-center items-center bg-blue-600 text-white">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button type="submit" className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700">
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
