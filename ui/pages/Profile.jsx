import Image from "next/image";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Textarea from "../atoms/Textarea";

const Profile = () => {
  return ( 
    <section className="space-y-6">
      <h2 className="font-bold text-3xl">Profile Information</h2>
      <div className="bg-white p-3 lg:p-4 rounded-xl   border-quinary border">
        <form className="lg:w-[60%] space-y-4 mx-auto" action="">
            <div className="flex flex-col gap-2 justify-center items-center">
                <Image className="w-24 h-24" src={'/icon/uploadImage.png'} alt="upload" width={100} height={100} />
              <p className="text-[#4379EE] text-center">Upload Photo</p>
            </div>
          <Input
            label={"Full Name"}
            icon={"ri-user-smile-line"}
            placeholder={"Enter your full name"}
          />
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <Input label={"Trainer Id"} placeholder={"Enter Trainer iD"} />
            <Input label={"Accessor Id"} placeholder={"Enter Accessor ID"} />
          </div>
          <div className="flex lg:w-1/2 flex-col lg:flex-row items-center gap-4">
            <Input label={"Date of Joining LSSC"} type={"date"} />
          </div>
          <Select
            label={"Sector / Specialization"}
            options={["Select Specialization"]}
          />
          <div className="flex  flex-col lg:flex-row items-center gap-4">
            <Input
              label={"Phone Number"}
              icon={"ri-phone-line"}
              placeholder={"+91 xxx xxx xxx"}
            />
            <Input
              label={"Email Address"}
              icon={"ri-mail-line"}
              placeholder={"name@gmail.com"}
            />
          </div>
          <Select label={'Training Batch/ Course Name'} options={["PMKVY Course"]} />
          <div className="flex  flex-col lg:flex-row items-center gap-4">
            <Input
              label={"City"}
              icon={"ri-map-pin-line"}
              placeholder={"Enter City"}
            />
            <Input label={"State"} placeholder={"Enter State"} />
          </div>
          <div className="border-[#BFDBFE] rounded-xl  gap-2 border p-4 bg-[#EFF6FF]">
            <span className="space-x-2 flex gap-2 items-center text-[#1E40AF] font-medium text-sm text-">
              <Image
                className="w-4 h-4"
                src={"/icon/i.png"}
                width={100}
                height={100}
                alt="info"
              />
              Tips for filling the form
            </span>
            <ul className="list-disc text-sm ps-10 text-[#1D4ED8]">
              <li>All fields marked with * are mandatory</li>
              <li>Use your official email address</li>
              <li>Phone number should include country code</li>
            </ul>
          </div>
          <div className="flex justify-end pt-6 gap-4">
            <button className="border-[#D1D5DB] rounded-md py-2 px-4 border">
              Clear Form
            </button>
            <button className="bg-primary text-white py-2 px-4 rounded-md">
              Update Info
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
