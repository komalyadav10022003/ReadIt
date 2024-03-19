import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo, FaHome } from "react-icons/fa";

const SideBar = () => {
  const Divider = () => <hr className="sidebar-hr" />;

  const SideBarIcon = ({ icon, text }) => (
    <div className="sidebar-icon group">
      {icon}
      <span class="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );

  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg rounded"
      style={{ zIndex: "4" }}>
      <SideBarIcon icon={<FaHome size="28" />} text="Home" />
      <SideBarIcon icon={<FaFire size="32" />} text="Trending" />
      <SideBarIcon
        icon={<BsFillLightningFill size="20" />}
        text="Create Post"
      />
      <SideBarIcon
        icon={<BsGearFill size="22" />}
        text="Hello There"
        className="float-end"
      />
    </div>
  );
};

export default SideBar;