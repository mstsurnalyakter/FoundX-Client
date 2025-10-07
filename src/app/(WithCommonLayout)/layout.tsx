import { Navbar } from "@/src/components/UI/navbar";


const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default layout;
