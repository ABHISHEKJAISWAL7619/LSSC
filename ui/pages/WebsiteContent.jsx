import Input from "../atoms/Input";
import Select from "../atoms/Select";
import data from "@/public/db/data.json";
import InfoCard from "../molecules/InfoCard";
import Image from "next/image";
import Button from "../atoms/Button";
import Link from "next/link";

const WebsiteContent = () => {
  const { information } = data;

  const initiatives = [
    {
      img: "/img/initiative.jpg",
      title: "Initiatives",
      points: ["gallery management"],
      route: "/website-content/initiatives",
    },
  ];

  return (
    <section className="space-y-5">
      <div className="w-full lg:w-[35%] grid grid-cols-3 gap-4">
        <span className="col-span-2">
          <Input icon={`ri-search-line`} placeholder={"Search"} />
        </span>
        <Select options={["Filter"]} icon={"ri-filter-2-line"} />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-4xl bg-white p-8 space-y-3">
          <h2 className="text-[#2B3674] font-bold text-2xl">Home Page</h2>
          <p className="text-lighttext  text-lg">
            Here you can edit content of the home page. The sections of the home
            page are listed below.
          </p>

          {information.map((info, i) => (
            <InfoCard key={i} {...info} />
          ))}
        </div>
        <div className="space-y-6">
          <div className="rounded-4xl bg-white p-8 space-y-3">
            <h2 className="text-[#2B3674] font-bold text-2xl">Who We Are</h2>
            <p className="text-lighttext text-lg">
              Here you can edit content of the Who We Are page. The sections of
              the home page are listed below.
            </p>
            {initiatives.map((info, i) => (
              <InfoCard key={i} {...info} />
            ))}
          </div>

          <div className="rounded-3xl bg-white p-8 space-y-4">
            <div className="flex justify-between">
              <h2 className="text-[#2B3674] font-bold text-2xl">
                India Event Map
              </h2>{" "}
              <i className="ri-pencil-fill text-[#8F9BBA]"></i>
            </div>
            <div className="h-80 w-full">
              <iframe
                className="h-full w-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.142961885672!2d77.13979197528998!3d28.655437775652203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d038a9d4ab707%3A0x2c95e1d7417f0177!2sSG%20Webapp%20Techniques%20%7C%20Web%20Development%20Company%20in%20Delhi!5e0!3m2!1sen!2sin!4v1747981136203!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="text-lighttext text-lg">
              Add Location for new events, Institute, training <br /> Canters
              from here.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {" "}
                <Image
                  className="w-6 h-6"
                  src={"/img/map/Frame.png"}
                  alt="map"
                  width={100}
                  height={100}
                />{" "}
                <Image
                  className="w-6 h-6"
                  src={"/img/map/Frame2.png"}
                  alt="map"
                  width={100}
                  height={100}
                />{" "}
                <Image
                  className="w-6 h-6"
                  src={"/img/map/Frame1.png"}
                  alt="map"
                  width={100}
                  height={100}
                />
              </div>
              <Link href={"/website-content/add-coordinates"}>
                {" "}
                <Button
                  label={"Add Coordintaes"}
                  style={"bg-blue-500 text-white"}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteContent;
