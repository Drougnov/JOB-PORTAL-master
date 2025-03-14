import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";
import axios from "axios";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{width: "100%", display: "flex", justifyContent: "center", alignItemsc: "center", paddingInline: "1.5rem"}}>
        <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-10 sm:mt-20">
          <div className="my-6">
            <h1 className="font-bold text-3xl text-gray-800">Create a New Company</h1>
            <p className="text-gray-600 mt-2">Fill in the details below to register your company.</p>
          </div>

          <div className="mb-4">
            <Label className="text-gray-700">Company Name</Label>
            <Input
              type="text"
              placeholder="Enter Company Name"
              className="my-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              variant="outline"
              className="w-full sm:w-auto py-2"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto py-2"
              onClick={registerNewCompany}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
