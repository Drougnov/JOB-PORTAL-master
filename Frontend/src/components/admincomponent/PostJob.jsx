import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, ChevronLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany?._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <div className="max-w-4xl flex justify-center px-4 py-8" style={{width: "100%",flexDirection: "column", gap: "1rem"}}>
          {/* Back Link with Chevron Icon */}
          <div
            onClick={() => navigate("/admin/Jobs")}
            className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="text-base">Back</span>
          </div>
          <form
            onSubmit={submitHandler}
            className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Post a New Job
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Title", name: "title", type: "text" },
                { label: "Description", name: "description", type: "text" },
                { label: "Location", name: "location", type: "text" },
                { label: "Salary", name: "salary", type: "number" },
                { label: "Position", name: "position", type: "number" },
                { label: "Requirements", name: "requirements", type: "text" },
                { label: "Experience", name: "experience", type: "number" },
                { label: "Job Type", name: "jobType", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <Label>{field.label}</Label>
                  <Input
                    type={field.type}
                    name={field.name}
                    value={input[field.name]}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className="my-1 focus:ring-blue-500 hover:shadow-md"
                    onChange={changeEventHandler}
                  />
                </div>
              ))}

              <div style={{ minHeight: "4.25rem" }}>
                <Label className="block mb-2">Company</Label>
                {companies.length > 0 && (
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company.name.toLowerCase()}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            <div className="mt-4">
              {loading ? (
                <Button
                  disabled
                  className="w-full bg-gray-600 text-white flex items-center justify-center"
                >
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Posting...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Post Job
                </Button>
              )}
            </div>

            {companies.length === 0 && (
              <p className="text-center text-red-500 mt-4">
                *Please register a company to post jobs.*
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
