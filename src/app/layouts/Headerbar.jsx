"use client"
import { useSession } from "next-auth/react"
import Image from "next/image";
export default function Layout({ mobile, sidebarOpen }) {

  const { data: session } = useSession()
  return (
    <div className={`flex flex-col items-center transition-all duration-300 ${sidebarOpen && !mobile ? 'ml-64' : ''}`}>
      <header
        className="bg-zinc-600 w-full text-white p-4 text-center text-2xl"
      >
        <div className="navbar bg-base-100 rounded-2xl">
          <div className="flex-1">
            <p className="ml-10 text-xl">{session?.user?.name}</p>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="badge-xs badge-primary  badge badge-sm indicator-item -translate-y-4 translate-x-4">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="border-4 card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">View cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <div className="">
                    <Image
                      className=""
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      alt="Tailwind CSS Navbar component"
                      width={90}
                      height={18}
                      priority
                    /></div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="border-4 menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    Profile
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>


    </div>)

}