import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";

const Companies = () => {
  const navigate = useNavigate();

  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between my-5 space-y-4 sm:space-y-0 sm:space-x-4">
        <Input
            className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Filter by Name"
            onChange={(e) => setInput(e.target.value)}
        />

          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="w-full sm:w-auto"
          >
            Add Company
          </Button>
        </div>
        <div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
