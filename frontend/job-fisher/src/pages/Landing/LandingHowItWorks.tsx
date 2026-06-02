import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PlatformTitle } from "../../components/PlatformTitle";

const LandingHowItWorks = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-24 px-6 bg-[#0F0F0F] relative z-10 border-t border-[#262626]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-[#C4F029]"></div>
            <span className="text-[#C4F029] text-sm font-bold tracking-widest uppercase">
              How it works
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-[#EDEDED] leading-tight mb-6">
            How <PlatformTitle /> will help you ?<br />
          </h2>

          <p className="text-[#A1A1AA] text-lg max-w-2xl mb-12">
            Create feeds with your own filters and AI prompts. Job Hooker creates custom cover letters, cvs and interview sheets for every job matching
            your feeds.
          </p>


        </div>

        {/* Cards */}
        <div className="space-y-8">

          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row bg-[#151515] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-extrabold text-[#262626]">01</span>
                <span className="px-3 py-1 rounded-md border border-[#C4F029]/30 text-[#C4F029] text-sm font-bold bg-[#C4F029]/5">
                  Feeds
                </span>
              </div>
              <h3 className="text-3xl font-bold text-[#EDEDED] mb-4">
                Create feeds with your own filters
              </h3>
              <p className="text-[#A1A1AA] mb-8 leading-relaxed">
                Each feed will match the title, salary expectations, job location and key skills to filter the jobs for you.
              </p>
              <ul className="space-y-3 mb-10 text-sm text-[#737373]">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C4F029] rounded-full"></span> Hourly/Fixed Types</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C4F029] rounded-full"></span> Key skills</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C4F029] rounded-full"></span> Unlimited feeds</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C4F029] rounded-full"></span> Job Location</li>
              </ul>
              <button className="text-[#C4F029] font-bold flex items-center gap-2 hover:gap-3 transition-all w-max group">
                Try it now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="flex-1 bg-[#1A1A1A] border-l border-[#262626] relative min-h-[300px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
              {/* Mock UI overlay */}
              <div className="absolute inset-8 border border-[#262626] bg-[#0F0F0F]/80 backdrop-blur-md rounded-xl shadow-2xl flex flex-col p-6">
                <div className="w-3/4 h-4 bg-[#262626] rounded mb-6"></div>
                <div className="w-full h-10 border border-[#262626] rounded bg-[#151515] mb-4"></div>
                <div className="w-full h-32 border border-[#C4F029]/50 rounded bg-[#151515] mt-auto"></div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col-reverse lg:flex-row bg-[#151515] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex-1 bg-[#1A1A1A] border-r border-[#262626] relative min-h-[300px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
              {/* Mock UI overlay */}
              <div className="absolute inset-8 border border-[#262626] bg-[#0F0F0F]/80 backdrop-blur-md rounded-xl shadow-2xl p-6 flex flex-col gap-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-full h-12 border border-[#262626] rounded bg-[#151515] flex items-center px-4 justify-between">
                    <div className="w-1/2 h-2 bg-[#262626] rounded"></div>
                    <div className="w-8 h-8 rounded bg-[#C4F029]/20 flex items-center justify-center text-[#C4F029] text-xs font-bold">{10 - i}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-extrabold text-[#262626]">02</span>
                <span className="px-3 py-1 rounded-md border border-[#C4F029]/30 text-[#C4F029] text-sm font-bold bg-[#C4F029]/5">
                  AI Documents
                </span>
              </div>
              <h3 className="text-3xl font-bold text-[#EDEDED] mb-4">
                Create Tailored cover letters, CVs, and interview prep — per job.
              </h3>
              <p className="text-[#A1A1AA] mb-8 leading-relaxed">
                For every job that matches your criteria, <PlatformTitle /> generates a custom cover letter, a tailored CV, and a ready-to-use interview preparation PDF — so you show up prepared every time.
              </p>
              <ul className="grid grid-cols-2 gap-3 mb-10 text-sm text-[#737373]">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C4F029] rounded-full"></span> Custom cover letters per job</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C4F029] rounded-full"></span> Tailored CV per role</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C4F029] rounded-full"></span> Common & custom interview prep PDFs</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C4F029] rounded-full"></span> One-click download, ready to send</li>
              </ul>
              <button className="text-[#C4F029] font-bold flex items-center gap-2 hover:gap-3 transition-all w-max group">
                Try it now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row bg-[#151515] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-extrabold text-[#262626]">03</span>
                <span className="px-3 py-1 rounded-md border border-[#C4F029]/30 text-[#C4F029] text-sm font-bold bg-[#C4F029]/5">
                  Notifications
                </span>
              </div>
              <h3 className="text-3xl font-bold text-[#EDEDED] mb-4">
                Instant job alerts to Telegram and email.
              </h3>
              <p className="text-[#A1A1AA] mb-8 leading-relaxed">
                The moment a high-scoring job is found, Jobfisher pushes it straight to your Telegram channel and inbox — with the score, title, and a direct link. No dashboard refreshing, no missed opportunities.
              </p>
              <ul className="grid grid-cols-2 gap-3 mb-10 text-sm text-[#737373]">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C4F029] rounded-full"></span> Telegram channel feed</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C4F029] rounded-full"></span> Email digest & instant alerts</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C4F029] rounded-full"></span> Score shown in every alert</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#C4F029] rounded-full"></span> Direct link to apply fast</li>
              </ul>
              <button className="text-[#C4F029] font-bold flex items-center gap-2 hover:gap-3 transition-all w-max group">
                Try it now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Telegram feed mock */}
            <div className="flex-1 bg-[#1A1A1A] border-l border-[#262626] relative min-h-[300px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity" />

              <div className="absolute inset-8 border border-[#262626] bg-[#0F0F0F]/80 backdrop-blur-md rounded-xl shadow-2xl flex flex-col overflow-hidden">
                {/* Telegram channel header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-[#262626] bg-[#151515]">
                  <div className="w-8 h-8 rounded-full bg-[#229ED9]/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#229ED9"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" /></svg>
                  </div>
                  <div>
                    <p className="text-[#EDEDED] text-xs font-bold leading-none">Jobfisher Alerts</p>
                    <p className="text-[#737373] text-[10px] mt-0.5">4,231 subscribers</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 flex flex-col gap-2 p-4 overflow-hidden">
                  {[
                    { title: "Senior React Developer", company: "Stripe", score: 9, time: "just now", hot: true },
                    { title: "Frontend Engineer", company: "Vercel", score: 8, time: "2m ago", hot: false },
                    { title: "Full Stack Developer", company: "Linear", score: 7, time: "5m ago", hot: false },
                  ].map((job, i) => (
                    <div key={i} className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-3 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[#EDEDED] text-xs font-semibold">{job.title}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${job.hot ? "bg-[#C4F029]/20 text-[#C4F029]" : "bg-[#262626] text-[#737373]"}`}>
                          {job.score}/10
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#737373] text-[10px]">{job.company}</span>
                        <span className="text-[#525252] text-[10px]">{job.time}</span>
                      </div>
                      <div className="text-[#229ED9] text-[10px] font-medium">View & Apply →</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center pb-12">
          <button
            onClick={() => navigate('/register')}
            className="bg-[#C4F029] text-[#0F0F0F] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#D4FF39] transition shadow-[0_0_20px_rgba(196,240,41,0.3)] hover:shadow-[0_0_30px_rgba(196,240,41,0.5)] flex items-center gap-2 mx-auto group"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[#737373] text-sm mt-4">Free trial for a month - No credit card</p>
        </div>
      </div>
    </section>
  );
};

export default LandingHowItWorks;
