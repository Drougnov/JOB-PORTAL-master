import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Dhaka",
      "Chittagong",
      "Sylhet",
      "Rajshahi",
      "Khulna",
      "Barishal",
      "Rangpur",
      "Comilla",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "frontend",
      "backend",
      "mobile",
      "desktop",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white shadow-lg rounded-md p-5 space-y-5">
      <h1 className="text-xl font-bold">Filter Jobs</h1>
      <hr className="mt-2 mb-4" />
      <RadioGroup value={selectedValue} onValueChange={handleChange} className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index} className="space-y-3">
            <h2 className="text-lg font-semibold">{data.filterType}</h2>

            <div className="filters-container space-y-3">
              {data.array.map((item, indx) => {
                const itemId = `Id${index}-${indx}`;
                return (
                  <div key={itemId} className="flex items-center space-x-3">
                    <RadioGroupItem value={item} id={itemId} />
                    <label htmlFor={itemId} className="text-sm sm:text-base">{item}</label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filter;
