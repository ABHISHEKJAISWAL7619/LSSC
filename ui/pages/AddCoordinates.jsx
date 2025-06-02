import Link from "next/link";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Textarea from "../atoms/Textarea";
import ImageUploader from "../molecules/ImageUploader";

const AddCoordinates = () => {
  return (
    <section className="flex lg:gap-4">
      <Link href={"/website-content"}>
        <i className="ri-arrow-left-line hidden lg:block ri-2x"></i>
      </Link>
      <div className=" lg:p-10 space-y-6 p-3 w-full bg-white rounded-xl">
        <div className="flex flex-col gap-6 items-center justify-center gap">
          <h2 className="text-secondary font-bold text-3xl">Map Management</h2>
          <div className="rounded-xl shadow space-y-4 lg:w-[80%] p-4 border border-[#E6E7EA]">
            <div className="grid py-10 px-4 lg:grid-cols-2 gap-8 ">
              <div className="space-y-2">
                <h5 className="text-secondary  text-xl font-semibold">
                  Pin Point Location
                </h5>
                <div>
                <iframe
                  className="h-full w-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.142961885672!2d77.13979197528998!3d28.655437775652203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d038a9d4ab707%3A0x2c95e1d7417f0177!2sSG%20Webapp%20Techniques%20%7C%20Web%20Development%20Company%20in%20Delhi!5e0!3m2!1sen!2sin!4v1747981136203!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>
                <p className="text-[#A3AED0]">
                  Add Location for new events, Institute, training Canters from
                  here.
                </p>
              </div>
              <ImageUploader />
            </div>
            <Select label={"Category"} options={["Training Center"]} />
            <Input label={"Title"} placeholder={"Enter Title"} />
            <Textarea
              label={"Description"}
              placeholder={"Recommendations for Training Providers "}
            />
            <Input label={"Hyperlink"} placeholder={"Enter Hyperlink"} />
           
            <div className="flex gap-6">
              <Button
                style={"w-full border border-[#E6E7EA]"}
                label={"Cancel"}
              />{" "}
              <Button
                style={"bg-[#0070BA] text-white w-full"}
                label={"Add Cordinates"}
              />
            </div>
          </div>
        </div>
        <div className=""></div>
      </div>
    </section>
  );
};

export default AddCoordinates;
