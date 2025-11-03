import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const DetailJob = () => {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [jobdata, setJobData] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://internshala-clone-y2p2.onrender.com/api/job/${id}`
        );
        setJobData(res.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (loading || !jobdata) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {jobdata.title}
          </h1>

          {/* Company & Location */}
          <p className="text-lg text-gray-700 mb-2">
            {jobdata.company} - {jobdata.location}
          </p>

          {/* Posted Date */}
          <p className="text-sm text-gray-500 mb-6">
            Posted on{" "}
            {new Date(jobdata.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* About the Job */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">About the Job</h2>
          <p className="text-gray-600 mb-6">{jobdata.description}</p>

          {/* Who can apply */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">Who can apply</h2>
          <p className="text-gray-600 mb-6">{jobdata.Whocanapply}</p>

          {/* Perks */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">Perks</h2>
          <p className="text-gray-600 mb-6">{jobdata.perks}</p>

          {/* Openings */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Number of openings
          </h2>
          <p className="text-gray-600 mb-6">{jobdata.numberOfopning}</p>

          {/* Additional Info */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Additional Information
          </h2>
          <p className="text-gray-600 mb-6">{jobdata.AdditionalInfo}</p>

          {/* Apply Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Start your application
            </h2>
            <textarea
              className="w-full border rounded-lg p-4 text-gray-700 mb-4"
              rows="4"
              placeholder="Why should you be selected for this job?"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Apply Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailJob;
