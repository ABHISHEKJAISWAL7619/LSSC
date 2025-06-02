"use client";
import data from "@/public/db/data.json";
import StatsCard from "../molecules/StatsCard";
import Button from "../atoms/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import OverlayModal from "../common/OverlayModal";
import AddTrainer from "../molecules/AddTrainer";
import { useDispatch } from "react-redux";
import { getalltrainers } from "@/redux/slice/user-slice";

const Trainer = () => {
  const { trainerstat } = data;
  const [isTrainer, setIsTrainer] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const dispatch = useDispatch();

  const getAllTrainer = async () => {
    const res = await dispatch(getalltrainers());
    if (res.payload?.data) {
      setTrainers(res.payload.data);
    }
  };

  useEffect(() => {
    getAllTrainer();
  }, []);

  const totalPages = Math.ceil(trainers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTrainers = trainers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="space-y-6">
      <h2 className="text-secondary font-bold text-3xl">Trainer Management</h2>

      <div className="p-6 rounded-xl space-y-4 bg-white shadow">
        <h3 className="text-secondary font-bold text-2xl">Quick Action</h3>
        <div className="flex flex-col gap-4 lg:flex-row justify-between">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            <Link className="w-full" href={"/trainer/report"}>
              <Button
                label="View Reports"
                icon="ri-arrow-right-up-line"
                style="bg-[#B8FFF4] text-[#00B69B] w-full"
              />
            </Link>
            <Link className="w-full" href={"/trainer/notification"}>
              <Button
                label="Send Notification"
                icon="ri-notification-3-line"
                style="bg-[#FFE6B8] text-[#A36A00] w-full"
              />
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            <Button
              onClick={() => setIsTrainer(true)}
              label="Add Trainers"
              icon="ri-add-fill"
              style="bg-blue-500 text-white w-full"
            />
            <Button
              label="Export Data"
              icon="ri-import-line"
              style="bg-blue-500 text-white w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {trainerstat?.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="rounded-xl space-y-4 bg-white shadow">
        <div className="px-4 pt-6 flex justify-between">
          <h3 className="text-secondary font-bold text-2xl">
            Trainer Directory
          </h3>
          <select className="font-normal text-sm text-tertiary h-fit px-2 rounded border border-gray-300">
            <option value="">January</option>
            <option value="">February</option>
            <option value="">March</option>
            <option value="">April</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/4 text-left px-4 py-3 border border-gray-200">Trainer Name</th>
                <th className="w-1/4 text-left px-4 py-3 border border-gray-200">Mobile No</th>
                <th className="w-1/4 text-left px-4 py-3 border border-gray-200">Role</th>
                <th className="w-1/4 text-left px-4 py-3 border border-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTrainers.map((trainer) => (
                <tr key={trainer._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 border text-left border-gray-200">{trainer.name}</td>
                  <td className="px-4 py-3 border text-left border-gray-200">{trainer.mobile}</td>
                  <td className="px-4 py-3 border text-left border-gray-200 capitalize">{trainer.role}</td>
                  <td className="px-4 py-3 border text-left border-gray-200 capitalize">{trainer.status}</td>
                </tr>
              ))}

              {currentTrainers.length < itemsPerPage &&
                Array(itemsPerPage - currentTrainers.length)
                  .fill("")
                  .map((_, index) => (
                    <tr key={"empty-" + index} className="border-t border-gray-200">
                      <td className="px-4 py-3 border border-gray-200">&nbsp;</td>
                      <td className="px-4 py-3 border border-gray-200">&nbsp;</td>
                      <td className="px-4 py-3 border border-gray-200">&nbsp;</td>
                      <td className="px-4 py-3 border border-gray-200">&nbsp;</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 mt-4 px-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="text-sm px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="text-sm px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {isTrainer && (
        <OverlayModal
          content={<AddTrainer onClose={() => setIsTrainer(false)} refreshTrainerList={getAllTrainer} />}
        />
      )}
    </section>
  );
};

export default Trainer;

