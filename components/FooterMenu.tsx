"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "../constants/index";

const FooterMenu = () => {
  const pathname = usePathname();
  return (
    <footer className="fixed bottom-0 left-0 right-0 rounded-t-lg bg-grey-900 px-md pt-xs sm:px-3xl md:hidden">
      <ul className="grid grid-cols-5">
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center gap-2xs rounded-t-lg border-b-4 border-transparent py-sm sm:w-[104px]",
                {
                  "bg-beige-100 !border-secondary-green":
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
                className="h-5 w-5"
              />
              <h3
                className={clsx(
                  "text-small-bold hidden overflow-hidden whitespace-nowrap text-gray-300 sm:block",
                  {
                    "text-gray-900": pathname === item.href,
                  },
                )}
              >
                {item.name}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default FooterMenu;
