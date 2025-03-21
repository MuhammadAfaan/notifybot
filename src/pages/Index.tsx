
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-soft-blue p-6">
      <div className="text-center max-w-3xl animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-gray-800">Welcome to Mitra</h1>
        <p className="text-xl text-gray-600 mb-10">A beautifully designed platform with a focus on simplicity and user experience.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login">
            <Button className="bg-custom-olive-green hover:bg-custom-olive-green/90 text-white px-8 py-5 rounded-md text-base transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5">
              Log in to your account
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" className="border-custom-olive-green text-custom-olive-green hover:bg-custom-olive-green/5 px-8 py-5 rounded-md text-base transition-all duration-300 hover:shadow-sm">
              Create an account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
