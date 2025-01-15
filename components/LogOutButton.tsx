import { logout } from "@/actions/auth";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <button
      onClick={logout}
      className="group fixed bottom-16 right-3 flex h-10 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-900 transition-[width] duration-300 ease-in-out hover:w-32 sm:bottom-24 md:bottom-5"
    >
      <LogOut className="h-5 w-5 transform text-white duration-500 group-hover:-translate-x-20" />
      <div className="text-standard-bold absolute w-full translate-x-full transform whitespace-nowrap text-white transition-all duration-500 group-hover:translate-x-0">
        Log out
      </div>
    </button>
  );
};

export default LogoutButton;
