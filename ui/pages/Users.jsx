"use client"
import Image from "next/image";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import { useState } from "react";
import OverlayModal from "../common/OverlayModal";
import AddUsers from "../molecules/AddUsers";

const Users = () => {

const [isUser, setIsUser] = useState(false);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row justify-between">
        <div className="w-full lg:w-[35%] grid grid-cols-3 gap-4">
          <span className="col-span-2">
            <Input icon={`ri-search-line`} placeholder={"Search"} />
          </span>
          <Select options={["Filter"]} icon={"ri-filter-2-line"} />
        </div>
        <Button
          onClick={() => setIsUser(true)}
          label={"Add New User "}
          icon={"ri-add-fill"}
          style={"bg-blue-500 text-white"}
        />
      </div>

      <div className="rounded-2xl space-y-6 p-6 bg-white shadow ">
        <div className="px-4 flex justify-between">
          <h3 className="text-secondary font-bold text-2xl">User Management</h3>
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
          <div className="min-w-[1000px]">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Trainer Name</th>
                  <th>Session Name</th>
                  <th>Theory</th>
                  <th>Practical</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="flex gap-2 justify-center items-center">
                    <Image
                      className="w-10 h-10 object-cover rounded-full"
                      src={"/img/student.png"}
                      alt="student "
                      width={100}
                      height={100}
                    />
                    Akshay Kumar
                  </td>
                  <td>Rajendar Singh</td>
                  <td>Cutter(Footwear)</td>
                  <td>92 %</td>
                  <td>98 %</td>
                  <td>
                    {" "}
                    <span>Passed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-2xl space-y-6 p-6 bg-white shadow ">
        <div className="px-4 flex justify-between">
          <h3 className="text-secondary font-bold text-2xl">Recent Activity</h3>
          <button
            className="font-normal text-sm text-tertiary h-fit px-2 rounded border border-gray-300"
            name=""
            id=""
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Trainer Name</th>
                  <th>Session Name</th>
                  <th>Theory</th>
                  <th>Practical</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="flex gap-2 justify-center items-center">
                    <Image
                      className="w-10 h-10 object-cover rounded-full"
                      src={"/img/student.png"}
                      alt="student "
                      width={100}
                      height={100}
                    />
                    Akshay Kumar
                  </td>
                  <td>Rajendar Singh</td>
                  <td>Cutter(Footwear)</td>
                  <td>92 %</td>
                  <td>98 %</td>
                  <td>
                    {" "}
                    <span>Passed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {
        isUser && <OverlayModal  content={<AddUsers onClose={() => setIsUser(false)}/>}/> 
      }
    </section>
  );
};

export default Users;
