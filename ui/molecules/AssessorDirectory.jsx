import { getallassessors } from "@/redux/slice/user-slice";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const AssessorDirectory = () => {
  const dispatch = useDispatch();
  const [assessors, setAssessors] = useState([]);

  useEffect(() => {
    const fetchAssessors = async () => {
      const res = await dispatch(getallassessors());
      if (res.payload && res.payload.data) {
        setAssessors(res.payload.data);
      }
    };
    fetchAssessors();
  }, [dispatch]);

  return (
    <div className="p-6 space-y-5 bg-white shadow rounded-xl">
      <div className="flex justify-between">
        <h3 className="text-secondary font-bold text-2xl">
          Assessor Directory
        </h3>
        <select
          className="font-normal text-sm text-tertiary h-fit px-2 rounded border border-gray-300"
          name=""
          id=""
        >
          <option value="">January</option>
          <option value="">February</option>
          <option value="">March</option>
          <option value="">April</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1000px] lg:min-w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th>Trainer Name</th>
                <th>Mobile No</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assessors.length > 0 ? (
                assessors.map((assessor) => (
                  <tr key={assessor._id}>
                    <td className="flex gap-2 justify-center items-center">
                      {assessor.name}
                    </td>
                    <td>{assessor.mobile}</td>
                    <td>{assessor.role}</td>
                    <td>
                      <span
                        className={`${
                          assessor.status === "offline"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {assessor.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No Assessors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssessorDirectory;
