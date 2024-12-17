import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen bg-beige-100">
      <Sidebar />
      <div>{children}</div>
    </main>
  );
}
