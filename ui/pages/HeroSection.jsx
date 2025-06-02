"use client";
import Link from "next/link";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import BannerCard from "../molecules/BannerCard";
import FileUploader from "../common/FileUploader";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createbanner, getallbanner } from "@/redux/slice/banner-slice";

const HeroSection = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    position: "",
    thumbnail: {},
  });

  const [banners, setBanners] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, name) => {
    // Handle native <select> event or custom select with object
    if (selectedOption?.target) {
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOption.target.value,
      }));
    } else if (typeof selectedOption === "object" && selectedOption?.value) {
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOption.value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOption,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      title: formData.title,
      position: formData.position,
      thumbnail: formData.thumbnail.url || "",
      publicId: formData.thumbnail.publicId || "",
    };

    console.log("Submitting banner form:", dataToSend);

    try {
      await dispatch(createbanner(dataToSend));
      setFormData({ title: "", position: "", thumbnail: {} });
      fetchBanners();
    } catch (error) {
      console.error("Banner Create Error:", error);
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", position: "", thumbnail: {} });
  };

  const fetchBanners = async () => {
    try {
      const res = await dispatch(getallbanner());
      if (res.payload?.data) {
        setBanners(res.payload.data);
        console.log("banner fetched:", res.payload);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <section className="flex lg:gap-4">
      <Link href={"/website-content"}>
        <i className="ri-arrow-left-line hidden lg:block ri-2x"></i>
      </Link>
      <div className="lg:p-10 space-y-6 p-3 w-full bg-white rounded-xl">
        <div className="flex flex-col gap-6 items-center justify-center">
          <h2 className="text-secondary font-bold text-3xl">Add or Edit Banner</h2>
          <div className="rounded-xl shadow space-y-4 lg:w-[35%] p-4 border border-[#E6E7EA]">
            <h4 className="text-secondary font-bold text-xl">Upload Banner</h4>

            <Input
              label={"Banner Title"}
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={"Enter banner title"}
            />

            <Select
              label={"Select Banner Position"}
              name="position"
              value={formData.position}
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
              ]}
              onChange={(option) => handleSelectChange(option, "position")}
            />

            <p className="text-[#6C606C]">
              Please upload file in jpeg or png format and make sure the file size is under 25 MB.
            </p>

            <FileUploader
              onSuccess={(fileData) =>
                setFormData((prev) => ({
                  ...prev,
                  thumbnail: {
                    url: fileData?.image,
                    publicId: fileData?.publicId,
                  },
                }))
              }
              onDelete={() =>
                setFormData((prev) => ({
                  ...prev,
                  thumbnail: {},
                }))
              }
            />

            <div className="flex gap-4">
              <Button
                style={"w-full border border-[#E6E7EA]"}
                label={"Cancel"}
                onClick={handleCancel}
              />
              <Button
                style={"bg-[#0070BA] text-white w-full"}
                label={"Done"}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>

        {/* Display Only First 6 Banners */}
        <div className="grid lg:grid-cols-2 gap-10">
          {banners?.slice(0, 6).map((banner, i) => (
            <BannerCard
              key={i}
              title={banner.title}
              img={banner.thumbnail}
              description={banner.position}
              route={"#"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

