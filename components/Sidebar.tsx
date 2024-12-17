"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "../constants/index";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="flex w-[300px] flex-col rounded-r-2xl bg-grey-900">
      <Image
        src="/assets/images/logo-large.svg"
        alt="Budget Logo"
        width={121}
        height={22}
        className="m-3xl"
      />
      <ul className="py-xl">
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              // We assign px-36px because of the border, it correspond to px-3xl
              className={clsx(
                "mr-xl flex items-center gap-lg rounded-r-xl border-l-4 border-transparent px-[36px] py-md",
                {
                  "bg-beige-100  !border-secondary-green":
                    pathname === item.href,
                  "hover:brightness-0 hover:invert": pathname !== item.href,
                },
              )}
            >
              <Image
                src={pathname === item.href ? item.active : item.icon}
                alt={item.name}
                width={20}
                height={20}
                className={clsx("h-5 w-5", {
                  filter: pathname === item.href,
                })}
              />
              <h3
                className={clsx("h3 text-gray-300", {
                  "text-gray-900": pathname === item.href,
                })}
              >
                {item.name}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mb-3xl mt-auto flex items-center gap-lg hover:cursor-pointer hover:brightness-0 hover:invert">
        <Image
          src="/assets/images/icon-minimize-menu.svg"
          alt="User Avatar"
          width={20}
          height={20}
          className="ml-3xl h-5 w-5"
        />
        <span className="h3 text-gray-300">Minimize Menu</span>
      </div>
    </aside>
  );
};

export default Sidebar;
