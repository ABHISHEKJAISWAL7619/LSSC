"use client";
import Link from "next/link";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Textarea from "../atoms/Textarea";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import {
  createnotice,
  deletenotice,
  getnotices,
  updatenotice,
  // updatenotice // <-- Uncomment and create this in your slice
} from "@/redux/slice/notice-slice";
import { useDispatch } from "react-redux";

const NoticeUpdate = () => {
  const dispatch = useDispatch();

  const [formdata, setformdata] = useState({
    type: "",
    title: "",
    content: "",
    hyperLink: "",
  });

  const [notices, setnotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 3;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null); // for update

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async (e) => {
    if (e) e.preventDefault();
    await dispatch(createnotice(formdata));
    setformdata({ type: "", title: "", content: "", hyperLink: "" });
    fetchnotices();
  };

 const handleUpdate = async () => {
  try {
    if (!selectedNotice) return;

    // dispatch update with id and formdata as per slice
    await dispatch(updatenotice({ id: selectedNotice._id, data: formdata }));

    setformdata({ type: "", title: "", content: "", hyperLink: "" });
    setSelectedNotice(null);
    setIsModalOpen(false);

    // re-fetch notices (optional if you rely on redux state update)
    fetchnotices();
  } catch (error) {
    console.error("Update failed:", error);
  }
};


  const fetchnotices = async () => {
    try {
      const res = await dispatch(getnotices());
      setnotices(res.payload.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const handledelete = (id) => {
    dispatch(deletenotice(id));
    fetchnotices();
  };

  const showModal = (notice) => {
    setSelectedNotice(notice);
    setformdata({
      type: notice.type,
      title: notice.title,
      content: notice.content,
      hyperLink: notice.hyperLink,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedNotice(null);
    setformdata({ type: "", title: "", content: "", hyperLink: "" });
  };

  useEffect(() => {
    fetchnotices();
  }, []);

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);
  const totalPages = Math.ceil(notices.length / noticesPerPage);

  return (
    <section className="flex lg:gap-4">
      <Link href={"/website-content"}>
        <i className="ri-arrow-left-line hidden lg:block ri-2x"></i>
      </Link>
      <div className="lg:p-10 space-y-6 p-3 w-full bg-white rounded-xl">
        <div className="flex flex-col gap-6 items-center justify-center">
          <h2 className="text-secondary font-bold text-3xl">
            Notices & Updates
          </h2>
          <div className="rounded-xl shadow space-y-4 lg:w-[80%] p-4 border border-[#E6E7EA]">
            <Select
              name="type"
              onChange={handlechange}
              value={formdata.type}
              label="Type"
              options={["Notices & Updates", "Trainer", "assessor"]}
            />
            <Input
              name="title"
              onChange={handlechange}
              value={formdata.title}
              label="Title"
              placeholder="Enter Title"
            />
            <Textarea
              name="content"
              label="Description"
              value={formdata.content}
              onChange={handlechange}
              placeholder="Recommendations for Training Providers"
            />
            <Input
              name="hyperLink"
              value={formdata.hyperLink}
              onChange={handlechange}
              label="Hyperlink"
              placeholder="Enter Hyperlink"
            />
            <div className="flex gap-6">
              <Button
                style="w-full border border-[#E6E7EA]"
                label="Cancel"
                onClick={() =>
                  setformdata({
                    type: "",
                    title: "",
                    content: "",
                    hyperLink: "",
                  })
                }
              />
              <Button
                onClick={handlesubmit}
                style="bg-[#0070BA] text-white w-full"
                label="Done"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">Previous Notifications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-nowrap">
              <thead>
                <tr className="bg-[#f1f4f9] font-semibold text-sm text-gray-600">
                  <th>Title</th>
                  <th>Description</th>
                  <th>Hyperlinks</th>
                  <th>Type</th>
                  <th className="text-center">Actions</th>           
                </tr>
              </thead>
              <tbody>
                {currentNotices.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 text-sm"
                  >
                    <td>{item.title}</td>
                    <td>{item.content}</td>
                    <td className="truncate text-blue-600 cursor-pointer">
                      {item.hyperLink}
                    </td>
                    <td>
                      <span className="bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs font-semibold">
                        {item.type}
                      </span>
                    </td>
                    <td className="flex justify-center gap-3">
                      <span
                        onClick={() => showModal(item)}
                        className="cursor-pointer text-gray-600 hover:text-blue-600"
                      >
                        <i className="ri-edit-box-line ri-xl"></i>
                      </span>

                      <span className="cursor-pointer text-gray-600 hover:text-blue-600">
                        <i className="ri-git-repository-private-line ri-xl"></i>
                      </span>
                      <span
                        onClick={() => handledelete(item._id)}
                        className="cursor-pointer text-red-500 hover:text-red-700"
                      >
                        <i className="ri-delete-bin-6-line ri-xl"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for Update */}
          <Modal
            open={isModalOpen}
            footer={null}
            closable={false}
            onCancel={handleCancel}
          >
            <div className="flex flex-col gap-6 items-center justify-center">
              <h2 className="text-secondary font-bold text-3xl">
                Update Notice
              </h2>
              <div className="rounded-xl shadow space-y-4 lg:w-[80%] p-4 border border-[#E6E7EA]">
                <Select
                  name="type"
                  onChange={handlechange}
                  value={formdata.type}
                  label="Type"
                  options={["Notices & Updates", "Trainer", "assessor"]}
                />
                <Input
                  name="title"
                  onChange={handlechange}
                  value={formdata.title}
                  label="Title"
                  placeholder="Enter Title"
                />
                <Textarea
                  name="content"
                  label="Description"
                  value={formdata.content}
                  onChange={handlechange}
                  placeholder="Recommendations for Training Providers"
                />
                <Input
                  name="hyperLink"
                  value={formdata.hyperLink}
                  onChange={handlechange}
                  label="Hyperlink"
                  placeholder="Enter Hyperlink"
                />
                <div className="flex gap-6">
                  <Button
                    onClick={handleCancel}
                    style="w-full border border-[#E6E7EA]"
                    label="Cancel"
                  />
                  <Button
                    onClick={handleUpdate}
                    style="bg-[#0070BA] text-white w-full"
                    label="Update"
                  />
                </div>
              </div>
            </div>
          </Modal>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <span>
              Showing {indexOfFirstNotice + 1} to{" "}
              {Math.min(indexOfLastNotice, notices.length)} of{" "}
              {notices.length} entries
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`border rounded-lg px-3 py-2 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>

              {[currentPage, currentPage + 1].map(
                (pageNum) =>
                  pageNum <= totalPages && (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`rounded-lg px-3 py-2 ${
                        currentPage === pageNum
                          ? "bg-blue-100 text-blue-600"
                          : "border"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`border rounded-lg px-3 py-2 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeUpdate;


