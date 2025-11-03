import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Jobs() {
  const [allJobs, setAllJobs] = useState([]); // original jobs from API
  const [filteredJobs, setFilteredJobs] = useState([]); // filtered jobs
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [filter, setFilter] = useState({
    category: "",
    location: "",
    workFromHome: false,
    partTime: false,
    salary: 0,
    experience: "",
  });

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/job");
        const jobsArray = Array.isArray(response.data) ? response.data : [];
        setAllJobs(jobsArray);
        setFilteredJobs(jobsArray);
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Handle filter input changes
  const handleFilterChange = (field, value) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  // Apply filters
  const applyFilters = () => {
    const filtered = allJobs.filter((job) => {
      const matchesCategory = filter.category
        ? job.category?.toLowerCase().includes(filter.category.toLowerCase())
        : true;

      const matchesLocation = filter.location
        ? job.location?.toLowerCase().includes(filter.location.toLowerCase())
        : true;

      const matchesExperience = filter.experience
        ? job.Experience?.toLowerCase().includes(filter.experience.toLowerCase())
        : true;

      const matchesWorkFromHome = filter.workFromHome
        ? job.location?.toLowerCase().includes("remote")
        : true;

      const matchesPartTime = filter.partTime
        ? job.type?.toLowerCase().includes("part-time")
        : true;

      const matchesSalary = job.CTC
        ? parseInt(job.CTC.replace(/\D/g, "")) >= filter.salary * 100000
        : true;

      return (
        matchesCategory &&
        matchesLocation &&
        matchesExperience &&
        matchesWorkFromHome &&
        matchesPartTime &&
        matchesSalary
      );
    });

    setFilteredJobs(filtered);
    setIsFilterVisible(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen bg-gray-50">
      {/* Sidebar Filters for Desktop */}
      <div className="w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-md hidden md:block">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        <input
          type="text"
          placeholder="Category"
          value={filter.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />

        <input
          type="text"
          placeholder="Location (e.g. Mumbai)"
          value={filter.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />

        <input
          type="text"
          placeholder="Experience (e.g. 2 years)"
          value={filter.experience}
          onChange={(e) => handleFilterChange("experience", e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />

        <label className="block mb-2">Annual Salary (LPA)</label>
        <input
          type="range"
          min="0"
          max="100"
          value={filter.salary}
          onChange={(e) => handleFilterChange("salary", e.target.value)}
          className="w-full mb-2"
        />
        <p className="mb-4">{filter.salary} LPA+</p>

        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={filter.workFromHome}
            onChange={(e) => handleFilterChange("workFromHome", e.target.checked)}
            className="mr-2"
          />
          Work From Home
        </label>

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={filter.partTime}
            onChange={(e) => handleFilterChange("partTime", e.target.checked)}
            className="mr-2"
          />
          Part Time
        </label>

        <button
          onClick={applyFilters}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Apply Filters
        </button>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg"
        >
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Mobile Filters */}
      {isFilterVisible && (
        <div className="bg-white p-6 rounded-2xl shadow-md mb-4 md:hidden">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <input
            type="text"
            placeholder="Category"
            value={filter.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Location (e.g. Mumbai)"
            value={filter.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Experience (e.g. 2 years)"
            value={filter.experience}
            onChange={(e) => handleFilterChange("experience", e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          />

          <label className="block mb-2">Annual Salary (LPA)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filter.salary}
            onChange={(e) => handleFilterChange("salary", e.target.value)}
            className="w-full mb-2"
          />
          <p className="mb-4">{filter.salary} LPA+</p>

          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filter.workFromHome}
              onChange={(e) => handleFilterChange("workFromHome", e.target.checked)}
              className="mr-2"
            />
            Work From Home
          </label>

          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={filter.partTime}
              onChange={(e) => handleFilterChange("partTime", e.target.checked)}
              className="mr-2"
            />
            Part Time
          </label>

          <button
            onClick={applyFilters}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* Jobs Listing */}
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-bold mb-6">Job Listings</h2>
        {filteredJobs.length === 0 ? (
          <p className="text-gray-600">No jobs found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <div
                key={job._id || job.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-1">{job.company}</p>
                <p className="text-gray-500 mb-1">{job.location}</p>
                <p className="text-gray-500 mb-1">{job.Experience}</p>
                <p className="text-gray-500 mb-2">Salary: {job.CTC}</p>
                <button className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
