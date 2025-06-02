"use client";
import Button from "../atoms/Button";
import AssessorDirectory from "../molecules/AssessorDirectory";
import AssessorStat from "../molecules/AssessorStat";
import data from "@/public/db/data.json";
import PendingApproval from "../molecules/PendingApproval";
import RecentReports from "../molecules/RecentReports";
import { useEffect, useState } from "react";
import OverlayModal from "../common/OverlayModal";
import AddAssessor from "../molecules/AddAssessor";
import Link from "next/link";
import { getallassessors } from "@/redux/slice/user-slice";
import { useDispatch } from "react-redux";

const Assessor = () => {
  const { assessorstat } = data;
  const [isAssessor, setIsAssessor] = useState(false);
  let dispatch = useDispatch();

  

  return (
    <section className="space-y-6">
      <h2 className="text-secondary font-bold text-3xl">Assessor Management</h2>
      <div className=" grid lg:grid-cols-4 gap-6">
        {assessorstat?.map((stat, i) => (
          <AssessorStat key={i} {...stat} />
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-3">
        <Button
          onClick={() => setIsAssessor(true)}
          label={"Add New Assessor "}
          style={"bg-blue-500 text-white"}
          icon={"ri-add-fill"}
        />
        <Link href="/assessor/notification">
          <Button
            label={"Notification"}
            style={"border border-[#808080] text-[#808080]"}
            icon={"ri-notification-3-line w-full"}
          />
        </Link>
        <Button
          label={"Generate Reports"}
          style={"border border-[#808080] text-[#808080]"}
          icon={"ri-file-text-line"}
        />
        <Button
          label={"Export Data "}
          style={"border border-[#808080] text-[#808080]"}
          icon={"ri-export-line"}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <RecentReports />
        <PendingApproval />
      </div>

      <AssessorDirectory />
      {isAssessor && (
        <OverlayModal
          content={<AddAssessor onClose={() => setIsAssessor(false)} />}
        />
      )}
    </section>
  );
};

export default Assessor;
