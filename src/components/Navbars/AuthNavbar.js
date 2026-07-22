/*eslint-disable*/
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

const BASE_URL = process.env.REACT_APP_SERVER_MODE === 'development'? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_PROD_URL

export default function Navbar({additionalClass, transparent, goToClass}) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const navigate = useNavigate()

  return (
    <>
      <nav className={`top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg ${additionalClass} ${transparent? 'bg-transparent' : 'bg-[#48afe3]'}`}>
        {/* #3090c1 */}
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <img src="https://dqninibrhfyreiclhile.supabase.co/storage/v1/object/public/frontpage/orgzs/Rumah-Qur'an-Al-Ayman.png" width="2%" alt="Rumah Qur'an Al Ayman"/>
            <a
              className="w-74 text-white text-sm font-bold inline-block leading-relaxed mr-4 py-2 whitespace-nowrap uppercase transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
              href="/"
            >
              Rumah Qur'an Al Ayman
            </a>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>

        </div>
      </nav>
    </>
  );
}
