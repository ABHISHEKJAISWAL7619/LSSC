import data from "@/public/db/data.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardLink from "../molecules/DashboardLink";
import Image from "next/image";
import { logout } from "@/redux/slice/auth-slice";
import { useDispatch } from "react-redux";

const SideBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const path = usePathname();
  const { navigation, othernav } = data;
  let dispatch = useDispatch();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 transform bg-white shadow transition-transform duration-300 md:relative md:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } w-60`}
    >
      <nav className="flex h-full flex-col gap-3 py-3">
        <div className="flex px-4">
          {
            <Link href="/">
              <Image
                alt="logo"
                className="w-[106px]"
                src={"/img/logo.png"}
                width={200}
                height={100}
              />
            </Link>
          }
        </div>

        <ul className="vertical-scrollbar flex h-full w-full flex-col justify-between gap-2 overflow-y-auto px-6">
          <div className="flex w-full flex-col ">
            {navigation?.map((item, index) => {
              const { route, label, icon, subMenu } = item;
              return (
                <DashboardLink
                  key={index}
                  active={path === route}
                  route={route}
                  label={label}
                  heroIcon={icon}
                  handleClick={() => setIsSidebarOpen(false)}
                  subMenu={subMenu}
                />
              );
            })}
          </div>

          <div className="flex w-full flex-col ">
            {othernav?.map((item, index) => {
              const { route, label, icon, subMenu } = item;
              return (
                <DashboardLink
                  key={index}
                  active={path === route}
                  route={route}
                  label={label}
                  heroIcon={icon}
                  handleClick={() => setIsSidebarOpen(false)}
                  subMenu={subMenu}
                />
              );
            })}

            <DashboardLink
                  label={'logout'}
                  heroIcon={'ri-logout-circle-line'}
                  handleClick={() => dispatch(logout()) }
                  subMenu={[]}
                />
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
