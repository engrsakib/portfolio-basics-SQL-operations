"use client";
import React from "react";

const About = () => {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-[#612DDD] via-[#f3eaff] to-[#38c7ff] dark:from-[#181038] dark:via-[#612DDD] dark:to-[#23214e] font-poppins flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Decorative Blurs & Glow */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-[#612DDD]/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-8 w-36 h-36 bg-[#9F6BFF]/20 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 h-52 bg-[#ff6fd8]/30 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#38c7ff]/30 rounded-full blur-2xl -z-10" />

      <div className="max-w-3xl mx-auto w-full bg-white/90 dark:bg-[#181038]/80 rounded-3xl shadow-2xl border border-[#612DDD]/20 backdrop-blur-xl animate-fade-in-up relative p-8">
        <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-transparent bg-clip-text drop-shadow text-center">
          About Me
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 font-medium leading-relaxed mb-4 text-center">
          👋 Hi, I'm <span className="font-semibold text-[#612DDD] dark:text-[#9F6BFF]">EngrSakib</span> — a passionate Full Stack Developer.
        </p>
        <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-6 text-center">
          With over <span className="font-bold text-[#612DDD] dark:text-[#9F6BFF]">2 years</span> of experience, I specialize in building high-performance, scalable, and visually stunning web applications.
          My stack includes <span className="font-bold text-[#612DDD] dark:text-[#9F6BFF]">React.js, Next.js, Node.js, Prisma, MongoDB, PostgreSQL</span> and more.
        </p>
        <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-6 text-center">
          I love clean code, problem solving, modern UI/UX, and cloud deployment. My mission is to deliver seamless user experiences and help businesses grow through technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
          <a
            href="/hakim-cv.pdf"
            download
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-white font-bold shadow-lg hover:scale-105 transition-all"
          >
            Download CV
          </a>
          <a
            href="/project"
            className="px-8 py-3 rounded-xl bg-white dark:bg-[#23214e] text-[#612DDD] dark:text-[#9F6BFF] font-bold shadow-lg border-2 border-[#612DDD]/20 hover:bg-gradient-to-r hover:from-[#612DDD]/80 hover:to-[#38c7ff]/70 hover:text-white transition-all"
          >
            View Projects
          </a>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(.41,.99,.54,.98) both;
        }
      `}</style>
    </section>
  );
};

export default About;