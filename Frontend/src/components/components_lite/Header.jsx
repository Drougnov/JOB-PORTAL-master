import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Search for Jobs and Internships");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Update placeholder text based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {  // Adjust the width as needed
        setPlaceholderText("Search for Jobs");
      } else {
        setPlaceholderText("Search for Jobs and Internships");
      }
    };

    handleResize(); // Set initial placeholder text
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="text-center max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-5 mt-20 mb-10">
          {/* Changed items alignment to items-start on mobile */}
          <span className="slogan-container px-4 mx-auto flex justify-center items-center py-2 gap-2 rounded-full bg-gray-200 text-red-600 font-medium">
            <span className="text-[#614232]">
              <PiBuildingOfficeBold />
            </span>{" "}
            Premier University's Own Job Portal
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Find Jobs & <br />
            Build Your Career at <span className="text-[#6A38C2]">PUC</span>
          </h2>

          {/* Hide the <br /> on mobile */}
          <p className="text-sm sm:text-base md:text-lg mt-4">
            Welcome to Premier University's exclusive job portal—connecting students and employers.
            <span className="hero-text-lb block"> Browse job listings, apply for internships, and start your career within the university network.</span>
          </p>

          <div className="flex w-[100%] h-16 shadow-xl border border-gray-300 pl-5 rounded-lg items-center gap-4 mx-auto bg-white max-w-3xl">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholderText}
              className="outline-none border-none w-full text-gray-700 placeholder-gray-500"
            />
            <Button
              data-hero-search-button
              onClick={searchjobHandler}
              className="bg-[#6A38C2] text-white px-6 rounded-lg hover:bg-[#5a2ea0] h-full flex items-center"
            >
              <Search className="h-8 w-8" style={{ width: "18px", height: "18px" }} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
