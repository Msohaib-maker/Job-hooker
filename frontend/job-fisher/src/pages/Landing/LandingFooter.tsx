const LandingFooter = () => {
  return (
    <footer className="w-full py-8 text-center border-t border-[#262626] bg-[#151515] relative z-20">
      <p className="text-sm text-[#737373]">
        © {new Date().getFullYear()} Job Hooker. All rights reserved.
      </p>
    </footer>
  );
};

export default LandingFooter;
