"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

import Button from "../atoms/Button";
import Textarea from "../atoms/Textarea";
import FileUploader from "../common/FileUploader";
import { creategallery, getallgallery } from "@/redux/slice/gallery-slice";

const GalleryManagement = () => {
  const dispatch = useDispatch();

  const [formdata, setFormdata] = useState({
    caption: "",
    thumbnail: {},
  });

  const [galleryList, setGalleryList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formdata.caption.trim()) return alert("Caption is required");
    if (!formdata.thumbnail.image || !formdata.thumbnail.publicId) {
      return alert("Please upload an image");
    }

    const payload = {
      image: formdata.thumbnail.image,
      publicId: formdata.thumbnail.publicId,
      caption: formdata.caption,
    };

    console.log("Payload sent to backend:", payload);

    try {
      await dispatch(creategallery(payload));
      setFormdata({
        caption: "",
        thumbnail: {},
      });
      fetchgallery(); // Refresh the gallery after adding
    } catch (err) {
      console.error("Gallery Create Error:", err);
      alert("Failed to add gallery image");
    }
  };

  const fetchgallery = async () => {
    try {
      let res = await dispatch(getallgallery());
      if (res?.payload?.data) {
        setGalleryList(res.payload.data);
      }
    } catch (err) {
      console.error("Fetch Gallery Error:", err);
    }
  };

  useEffect(() => {
    fetchgallery();
  }, [dispatch]);

  return (
    <section className="flex lg:gap-4">
      <Link href={"/website-content"}>
        <i className="ri-arrow-left-line hidden lg:block ri-2x"></i>
      </Link>

      <div className="lg:p-10 space-y-6 p-3 w-full bg-white rounded-xl">
        <div className="flex flex-col gap-6 items-center justify-center">
          <h2 className="text-secondary font-bold text-3xl">Gallery Management</h2>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl shadow space-y-4 lg:w-[80%] p-4 border border-[#E6E7EA]"
          >
            <h3 className="text-secondary text-center text-2xl font-semibold">Add Thumbnail</h3>

            <div className="flex justify-center">
              <div className="lg:w-[38%]">
                <FileUploader
                  onSuccess={(fileData) =>
                    setFormdata((prev) => ({
                      ...prev,
                      thumbnail: {
                        image: fileData.image,
                        publicId: fileData.publicId,
                      },
                    }))
                  }
                  onDelete={() =>
                    setFormdata((prev) => ({
                      ...prev,
                      thumbnail: {},
                    }))
                  }
                />
              </div>
            </div>

            <Textarea
              name="caption"
              value={formdata.caption}
              onChange={handleChange}
              label="Caption"
              placeholder="Write your message"
            />

            <div className="flex gap-6">
              <Button
                type="button"
                style="w-full border border-[#E6E7EA]"
                label="Cancel"
                onClick={() => setFormdata({ caption: "", thumbnail: {} })}
              />
              <Button
                type="submit"
                style="bg-[#0070BA] text-white w-full"
                label="Add Image"
              />
            </div>
          </form>
        </div>

        {/* Show latest 6 gallery images */}
        {galleryList.length > 0 && (
          <div className="pt-10">
            <h3 className="text-secondary text-2xl font-semibold text-center mb-6">
              Latest Gallery Images
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryList.slice(0, 6).map((item, index) => (
                <div
                  key={item._id || index}
                  className="border border-[#E6E7EA] rounded-xl shadow p-4"
                >
                  <img
                    src={item.image}
                    alt={item.alt || "gallery image"}
                    className="w-full h-34 object-cover rounded-lg mb-3"
                  />
                  <p className="text-sm text-gray-600">{item.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryManagement;
