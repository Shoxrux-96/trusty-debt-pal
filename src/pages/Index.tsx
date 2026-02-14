import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Landing />
      </main>
    </div>
  );
};

export default Index;
