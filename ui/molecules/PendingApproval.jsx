import Image from "next/image";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

const PendingApproval = () => {
  const approvals = [
    {
      name: "Ralph Edwards",
      time: "1 hour ago",
      img: "/img/user.svg",
    },
    {
      name: "Floyd Miles",
      time: "1 hour ago",
      img: "/img/user.svg",
    },
    {
      name: "Kathryn Murphy",
      time: "1 hour ago",
      img: "/img/user.svg",
    },
    {
      name: "Albert Flores",
      time: "1 hour ago",
      img: "/img/user.svg",
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-white shadow rounded-xl">
      <h3 className="text-secondary font-bold text-2xl">Pending Approval</h3>
      <div className="space-y-6">
        {approvals?.map((user, i) => {
            const {img, name, time} = user;
          return (
            <div key={i} className="flex justify-between items-center">
              <div className="flex gap-5 items-center">
                <Image
                  className="w-16 h-16"
                  src={img}
                  alt="user"
                  width={100}
                  height={100}
                />
                <div>
                  <h4 className="font-semibold text-lg">{name}</h4>
                  <p className=" text-[#8A92A6]">{time}</p>
                </div>
              </div>
              <input className="transform scale-200" type="checkbox" />
            </div>
          );
        })}
      </div>
      <Button label={"Approve"} style={"bg-blue-500 text-white  w-full"} />
    </div>
  );
};

export default PendingApproval;
