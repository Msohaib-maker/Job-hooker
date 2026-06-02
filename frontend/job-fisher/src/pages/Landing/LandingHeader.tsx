import { useNavigate } from "react-router-dom";
import { PlatformTitle } from "../../components/PlatformTitle";

const LandingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full p-6 flex justify-between items-center border-b border-[#262626] bg-[#151515] relative z-20">
      <div className="flex items-center gap-2">
        <img src="./hook1.png" className="w-8 h-8 flex-shrink-0" />
        <span className="text-2xl font-bold text-[#EDEDED] tracking-wide">
          <PlatformTitle />
        </span>
      </div>
      <div className="space-x-4 flex items-center">
        <button
          onClick={() => navigate('/register')}
          className="bg-[#C4F029] text-[#0F0F0F] px-5 py-2.5 rounded-lg font-bold hover:bg-[#D4FF39] transition shadow-[0_0_15px_rgba(196,240,41,0.2)] hover:shadow-[0_0_25px_rgba(196,240,41,0.4)]"
        >
          Get Started
        </button>
      </div>
    </header>
  );
};

export default LandingHeader;
