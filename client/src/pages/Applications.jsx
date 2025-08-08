import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  Select Resume
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button
                onClick={(e) => setIsEdit(false)}
                className="bg-green-100 border border-green-400 rounded-lg px-4 py-2"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                href=""
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">
                  Company
                </th>
                <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">
                  Job Title
                </th>
                <th className="py-4 px-6 border-b text-left font-semibold text-gray-700 max-sm:hidden">
                  Location
                </th>
                <th className="py-4 px-6 border-b text-left font-semibold text-gray-700 max-sm:hidden">
                  Date
                </th>
                <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {jobsApplied.map((job, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded object-cover"
                        src={job.logo}
                        alt=""
                      />
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {job.title}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200 max-sm:hidden text-gray-600">
                    {job.location}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200 max-sm:hidden text-gray-600">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                        job.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : job.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Applications;
