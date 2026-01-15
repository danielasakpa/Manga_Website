import { useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { AiOutlineRollback } from "react-icons/ai";
import { BiHomeSmile, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider";
import { IoBookmarksOutline } from "react-icons/io5";
import { GiCompass } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { safeJsonParse } from "../../utils/localStorage";

export const MenuSidebar = () => {
  const { isAuthenticated, logout } = useAuth();

  const user = safeJsonParse("user");

  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setOpen(false));
  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="py-[0.35rem] px-2 lg:p-3 border border-zinc-800 rounded-[3px]"
        aria-label="toggle sidebar"
      >
        <GiHamburgerMenu />
      </button>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="h-dvh md:h-[100vh] fixed top-0 bottom-0 left-0 z-50 w-full max-w-xs border-e md:border-r-2 bg-[#1B6FA8] text-white  border-zinc-800 "
              ref={ref}
              aria-label="Sidebar"
            >
              <div className="flex items-center justify-between p-5 border-b border-zinc-800">
                <span>
                  Welcome{" "}
                  <span className="text-[#ecbd5f]">
                    {user?.username ? user?.username : ""}
                  </span>
                </span>
                <button
                  onClick={toggleSidebar}
                  className="p-3 border border-zinc-800 rounded-[3px]"
                  aria-label="close sidebar"
                >
                  <AiOutlineRollback />
                </button>
              </div>
              <ul>
                {items.map((item, idx) => {
                  const { title, href, Icon } = item;
                  return (
                    <li key={title}>
                      <Link
                        onClick={toggleSidebar}
                        to={href}
                        className="flex items-center justify-between gap-5 p-5 transition-all border-b  hover:bg-[#fabe47] border-zinc-800"
                      >
                        <motion.span {...framerText(idx)}>{title}</motion.span>
                        <motion.div {...framerIcon}>
                          <Icon className="text-2xl" />
                        </motion.div>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {isAuthenticated() ? (
                <button
                  onClick={logout}
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-between px-3 py-2 hover:bg-[#fabe47] hover:text-white bg-gray-200 gap-x-2 w-[85%] rounded-md cursor-pointer border border-[#1F1F1F] text-[#1F1F1F]"
                >
                  <span className="text-[17px] z-20">{logoutButton.title}</span>
                  <logoutButton.Icon className="w-7 h-7" />
                </button>
              ) : (
                <Link to={"/login"}>
                  <button className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center px-2 py-2 bg-gray-200 space-x-2 w-[85%] rounded-md cursor-pointer border border-[#1F1F1F] text-[#1F1F1F]">
                    <span className="text-[17px] z-20">Login</span>
                  </button>
                </Link>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const items = [
  { title: "Home", Icon: BiHomeSmile, href: "/" },
  { title: "Profile", Icon: BiUser, href: "/profile" },
  { title: "Discover", Icon: GiCompass, href: "/search" },
  { title: "My List", Icon: IoBookmarksOutline, href: "/my-list" },
];

const logoutButton = { Icon: CiLogout, title: "Log Out" };

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};

const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
    delay: 1.5,
  },
};
