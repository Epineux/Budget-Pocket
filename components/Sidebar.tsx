"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { sidebarItems } from "../constants/index";

const CollapsibleSidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const pathname = usePathname();

  // Function to handle layout shift on toggle, with timeout
  const handleToggle = () => {
    if (!isMinimized) {
      setIsMinimized(true);
      setIsTextVisible(false);
    } else {
      setIsLogoVisible(false);
      setTimeout(() => {
        setIsMinimized(false);
        setTimeout(() => {
          setIsTextVisible(true);
          setIsLogoVisible(true);
        }, 150);
      }, 0);
    }
  };

  return (
    <aside
      className={clsx(
        "sticky top-0 hidden h-screen flex-col rounded-r-2xl bg-grey-900 transition-all duration-300 md:flex",
        isMinimized ? "md:w-[72px]" : "md:w-[300px]",
      )}
    >
      <Link
        href="/"
        className={clsx("m-3xl h-[20px]", {
          "mx-xl": isMinimized,
        })}
      >
        <div
          className={clsx(
            isLogoVisible
              ? "opacity-100 transition-opacity duration-300 ease-in-out"
              : "opacity-0",
          )}
        >
          <Image
            src={
              isMinimized
                ? "/assets/images/logo-small.svg"
                : "/assets/images/logo-large.svg"
            }
            priority
            alt="Budget-Pocket Logo"
            width={isMinimized ? 22 : 121}
            height={22}
            className={clsx({ "h-6 w-6": isMinimized })}
          />
        </div>
      </Link>
      <ul className="py-xl">
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={clsx(
                "mr-xl flex items-center gap-lg rounded-r-xl border-l-4 border-transparent px-[36px] py-md",
                {
                  "bg-beige-100 !border-secondary-green":
                    pathname === item.href,
                  "hover:brightness-0 hover:invert": pathname !== item.href,
                },
                isMinimized && "!mr-xs !px-0",
              )}
            >
              <Image
                src={pathname === item.href ? item.active : item.icon}
                alt={item.name}
                width={20}
                height={20}
                className={clsx("h-5 w-5", {
                  "ml-lg": isMinimized,
                })}
              />
              <h3
                className={clsx(
                  "h3 overflow-hidden whitespace-nowrap text-gray-300 transition-opacity duration-150",
                  {
                    "text-gray-900": pathname === item.href,
                    "opacity-0 w-0": !isTextVisible,
                    "opacity-100": isTextVisible,
                  },
                )}
              >
                {item.name}
              </h3>
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={handleToggle}
        className={clsx(
          "mb-3xl ml-3xl mt-auto flex items-center gap-lg hover:cursor-pointer hover:brightness-0 hover:invert",
          {
            "ml-[28px]": isMinimized,
          },
        )}
      >
        <Image
          src="/assets/images/icon-minimize-menu.svg"
          alt={isMinimized ? "Expand Menu" : "Minimize Menu"}
          width={20}
          height={20}
          className={clsx(
            "h-5 w-5 transition-transform duration-500",
            isMinimized && "rotate-180",
          )}
        />
        <span
          className={clsx(
            "h3 hidden overflow-hidden whitespace-nowrap text-gray-300 transition-opacity duration-150 md:block",
            {
              "opacity-0 w-0": !isTextVisible,
              "opacity-100": isTextVisible,
            },
          )}
        >
          Minimize Menu
        </span>
      </button>
    </aside>
  );
};

export default CollapsibleSidebar;
