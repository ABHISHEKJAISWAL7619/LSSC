import Link from "next/link";

const RecentReports = () => {

    
  const reports = [
    {
      name: "Niknil Kumar",
      date: "24 November 2019",
      report:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur adipiscing elit.",
    },
    {
      name: "Niknil Kumar",
      date: "24 November 2019",
      report:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur adipiscing elit.",
    },
    {
      name: "Niknil Kumar",
      date: "24 November 2019",
      report:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur adipiscing elit.",
    }
  ];

  return (
    <div className="lg:col-span-2 space-y-5 p-6 bg-white shadow rounded-xl">
      <h3 className="text-secondary font-bold text-2xl">Recent Reports</h3>
      <div className="space-y-6">
        {reports?.map((report, i) => {
          return (
            <div key={i} className="flex justify-between">
              <div className="flex gap-4">
                <div className="w-4 shrink-0 h-4 rounded-full border-2 border-blue-500"></div>
                <div className="space-y-1 lg:w-[50%]">
                  <h4 className="font-bold text-xl">Assessment Report</h4>
                  <p className="text-[#8A92A6] text-lg">
                    {report.name}. <span>{report.date}</span>
                  </p>
                  <p className="text-[#8A92A6] text-lg">{report.report} </p>
                </div>
              </div>
              <div className="space-x-2 text-[#808080]">
                <Link href={'/assessor/assessment/id'}> <i className="ri-eye-line ri-xl"></i></Link>
                <i className="ri-download-2-line ri-xl"></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentReports;
