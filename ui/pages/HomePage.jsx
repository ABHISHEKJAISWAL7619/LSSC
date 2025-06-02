"use client";
import StatsCard from "../molecules/StatsCard";
import data from "@/public/db/data.json";
import CertificationRate from "../charts/CertificationRate";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { stats } = data;
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, [token]);
  console.log(token);
  return (
    <section className="space-y-6">
      <div className="grid lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="rounded-xl shadow-lg h-96 bg-white p-4 col-span-3 ">
        <h2 className="text-secondary  flex items-center justify-between text-xl font-semibold">
          Assessment Volume
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
        </h2>

        <CertificationRate />
      </div>
    </section>
  );
};

export default HomePage;
