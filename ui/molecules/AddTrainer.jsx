
import { useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import { useDispatch } from "react-redux";
import { createuser } from "@/redux/slice/user-slice";

const AddTrainer = ({ onClose, refreshTrainerList }) => {
  const dispatch = useDispatch();

  const [formdata, setformdata] = useState({
    name: "",
    joiningDate: "",
    center: "Kolkata",
    id: "",
    password: "",
    mobile: "",
    Specialization: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      employeeId: formdata.id,
      name: formdata.name,
      password: formdata.password,
      mobile: formdata.mobile,
      role: "trainer",
      joining_date: formdata.joiningDate,
      specialization: formdata.Specialization,
      locationId: ["6650e6c1c16f1a346c0979a1", "6650e6c1c16f1a346c0979a2"],
    };

    await dispatch(createuser(payload));
    if (refreshTrainerList) refreshTrainerList();
    onClose();
  };

  return (
    <div className="rounded-xl bg-white p-6">
      <h4 className="text-center text-2xl">Add New Trainer</h4>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Name"
          placeholder="Add Trainer Name"
          name="name"
          value={formdata.name}
          onChange={handleChange}
        />

        <div className="flex lg:flex-row flex-col gap-6">
          <Input
            label="Joining Date"
            type="date"
            name="joiningDate"
            value={formdata.joiningDate}
            onChange={handleChange}
          />
          <Select
            label="Center"
            options={["Kolkata"]}
            name="center"
            value={formdata.center}
            onChange={handleChange}
          />
        </div>

        <div className="flex lg:flex-row flex-col gap-6">
          <Input
            label="ID"
            placeholder="023456789"
            type="text"
            name="id"
            value={formdata.id}
            onChange={handleChange}
          />
          <Input
            label="Password"
            placeholder="Add password"
            type="text"
            name="password"
            value={formdata.password}
            onChange={handleChange}
          />
          <Input
            label="Mobile Number"
            placeholder="Enter Mobile Number"
            type="number"
            name="mobile"
            value={formdata.mobile}
            onChange={handleChange}
          />
          <Input
            label="Specialization"
            placeholder="Enter Specialization"
            type="text"
            name="Specialization"
            value={formdata.Specialization}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center gap-8">
          <Button
            onClick={onClose}
            label="Cancel"
            style="border border-[#9CA3AF]"
            type="button"
          />
          <Button
            label="Create Trainer"
            style="text-white bg-[#3182CD]"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddTrainer;

