
"use client";
import Link from "next/link";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Textarea from "../atoms/Textarea";
import FileUploader from "../common/FileUploader";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createNewsletter,
  deletnewslatter,
  getallnewslatter,
  newsgetbyid,
  updatenewslatter,
} from "@/redux/slice/newslatter-slice";
import { useRouter } from "next/navigation";

const LetterManagement = ({ newsId }) => {
   const router = useRouter()
   
  const [formdata, setformdata] = useState({
    type: "",
    subject: "",
    message: "",
    thumbnail: {},
  });

  const [newsletters, setNewsletters] = useState([]);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const maxItems = 10;

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, name) => {
    if (selectedOption?.target) {
      setformdata((prev) => ({
        ...prev,
        [name]: selectedOption.target.value,
      }));
    } else if (typeof selectedOption === "object" && selectedOption?.value) {
      setformdata((prev) => ({
        ...prev,
        [name]: selectedOption.value,
      }));
    } else {
      setformdata((prev) => ({
        ...prev,
        [name]: selectedOption,
      }));
    }
  };
  const getnewsbyid = async () => {
    if (!newsId) return;
    const res = await dispatch(newsgetbyid(newsId));
    if (res?.payload?.data) {
      const data = res.payload.data;
      setformdata({
        type: data.type,
        subject: data.subject,
        message: data.message,
        thumbnail: {
          url: data.thumbnail?.url || "",
          publicId: data.thumbnail?.publicId || "",
          alt: data.thumbnail?.alt || "",
        },
      });
    }
  };

  const handleaddcource = async (e) => {
    e.preventDefault();
    dispatch(updatenewslatter({formdata,newsId}))
    setformdata({
        type: "",
        subject: "",
        message: "",
        thumbnail: {
          url: "",
          publicId:  "",
          alt:"",
        },
      });
       router.push('/website-content/news-letter-management')
       fetchAllNewsletters();

     

    await dispatch(createNewsletter(formdata));
    setformdata({
      type: "",
      subject: "",
      message: "",
      thumbnail: {},
    });
    fetchAllNewsletters();
  };

  const fetchAllNewsletters = async () => {
    let res = await dispatch(getallnewslatter());
    if (res.payload && res.payload.data) {
      const data = res.payload.data.slice(0, maxItems);
      setNewsletters(data);
    }
  };

  useEffect(() => {
    fetchAllNewsletters();
  }, [dispatch]);

  const deletenewslatter = async (id) => {
    await dispatch(deletnewslatter(id));
    fetchAllNewsletters();
  };

  

  useEffect(() => {
    getnewsbyid();
  }, [newsId]);

  const totalPages = Math.ceil(newsletters.length / itemsPerPage);
  const paginatedNewsletters = newsletters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="flex lg:gap-4">
      <Link href="/website-content">
        <i className="ri-arrow-left-line hidden lg:block ri-2x"></i>
      </Link>
      <div className="lg:p-10 space-y-6 p-3 w-full bg-white rounded-xl">
        <div className="flex flex-col gap-6 items-center justify-center">
          <h2 className="text-secondary font-bold text-3xl">
            News Letter Management
          </h2>
          <div className="rounded-xl shadow space-y-4 lg:w-[80%] p-4 border border-[#E6E7EA]">
            <Select
              label="To"
              name="type"
              value={formdata.type}
              options={[{ label: "subscriber", value: "subscriber" }]}
              onChange={(option) => handleSelectChange(option, "type")}
            />
            <Input
              name="subject"
              onChange={handlechange}
              value={formdata.subject}
              label="Subject"
              placeholder="Enter Subject"
            />
            <Textarea
              name="message"
              onChange={handlechange}
              value={formdata.message}
              label="Message"
              placeholder="Write your message"
            />
            <h3 className="text-secondary text-center text-2xl font-semibold">
              Add Attachment
            </h3>
            <div className="flex justify-center">
              <div className="lg:w-[38%]">
                <FileUploader
                  onSuccess={(fileData) =>
                    setformdata((prev) => ({
                      ...prev,
                      thumbnail: {
                        url: fileData?.image,
                        publicId: fileData?.publicId,
                      },
                    }))
                  }
                  onDelete={() =>
                    setformdata((prev) => ({
                      ...prev,
                      thumbnail: {},
                    }))
                  }
                />
                {formdata.thumbnail?.url && (
                  <img
                    src={formdata.thumbnail.url}
                    alt="Preview"
                    className="mt-2 w-32 h-20 object-cover rounded border"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-6">
              <Button style="w-full border border-[#E6E7EA]" label="Cancel" />
              <Button
                onClick={handleaddcource}
                style="bg-[#0070BA] text-white w-full"
               label={newsId ? "Update" : "Submit"}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Previous Newsletters</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f1f4f9] font-semibold text-sm text-gray-600">
                  <th className="px-3 py-2 text-left">Subject</th>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-left">Message</th>
                  <th className="px-3 py-2 text-left">Thumbnail</th>
                  <th className="px-3 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedNewsletters.length > 0 ? (
                  paginatedNewsletters.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-gray-200 text-sm"
                    >
                      <td className="px-3 py-2">{item.subject}</td>
                      <td className="px-3 py-2">{item.type}</td>
                      <td className="px-3 py-2 line-clamp-2 max-w-xs">
                        {item.message}
                      </td>
                      <td className="px-3 py-2">
                        {item.thumbnail?.url ? (
                          <img
                            src={item.thumbnail.url}
                            alt={item.subject || "Thumbnail"}
                            className="w-16 h-12 object-cover rounded border"
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </td>
                      <td className="flex justify-center gap-3 py-2">
                        <Link
                          href={`/website-content/news-letter-management/${item._id}`}
                          className="cursor-pointer text-gray-600 hover:text-blue-600"
                        >
                          <i className="ri-edit-box-line ri-xl"></i>
                        </Link>
                         <span className="cursor-pointer text-gray-600 hover:text-blue-600">
                        <i className="ri-git-repository-private-line ri-xl"></i>
                      </span>
                        <span
                          onClick={() => deletenewslatter(item._id)}
                          className="cursor-pointer text-red-500 hover:text-red-700"
                        >
                          <i className="ri-delete-bin-6-line ri-xl"></i>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No newsletters found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-end mt-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border rounded ${
                        page === currentPage
                          ? "bg-blue-500 text-white"
                          : "bg-white"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LetterManagement;


