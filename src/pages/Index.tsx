
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NotifyBotLogo from "@/components/NotifyBotLogo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-notifybot-bg p-6">
      <div className="text-center max-w-3xl animate-fade-in">
        <div className="flex justify-center mb-6">
          <NotifyBotLogo className="scale-150" />
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-gray-800">WhatsApp Order Management Made Simple</h1>
        <p className="text-xl text-gray-600 mb-10">Streamline your order process with automated WhatsApp alerts and order management tools.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login">
            <Button className="bg-notifybot-blue hover:bg-notifybot-dark-blue text-white px-8 py-5 rounded-md text-base transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5">
              Log in to your account
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" className="border-notifybot-blue text-notifybot-blue hover:bg-notifybot-blue/5 px-8 py-5 rounded-md text-base transition-all duration-300 hover:shadow-sm">
              Create an account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
