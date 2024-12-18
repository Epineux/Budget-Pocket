import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-beige-100">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
