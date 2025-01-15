import FooterMenu from "@/components/FooterMenu";
import LogOutButton from "@/components/LogOutButton";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-beige-100">
      <Sidebar />
      {/* Padding bottom for fixed footer */}
      <div className="flex-1 pb-20 md:pb-0">{children}</div>
      <LogOutButton />
      <FooterMenu />
    </div>
  );
}
