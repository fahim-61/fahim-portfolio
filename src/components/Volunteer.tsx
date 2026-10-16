import React from "react";
import { VOLUNTEER } from "../config/data";
import { FiUsers } from "react-icons/fi";
import SectionHeading from "./ui/SectionHeading";
import CertificateButton from "./media/CertificateButton";

const Volunteer = () => {
  return (
    <section id="volunteer" className="py-16 md:py-20 px-2 sm:px-6">
      <div className="max-w-5xl mx-auto w-full">
        <SectionHeading index="08" title="Volunteer Experience" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {VOLUNTEER.map((item, index) => (
            <div
              key={item.name}
              className="relative flex flex-col items-start bg-[#0f172a] border border-[#1e293b] rounded-lg p-5 md:p-6 hover:border-[#00f0ff]/40 transition-colors group"
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 60}
            >
              <div className="w-full flex items-center justify-between mb-4">
                <FiUsers className="text-2xl text-[#00f0ff]" />
                <span className="font-mono text-xs text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 rounded">
                  {item.year}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-[#00f0ff] transition-colors">
                {item.name}
              </h3>
              {item.fullName && (
                <p className="text-sm text-[#94a3b8] mt-1.5 leading-relaxed">{item.fullName}</p>
              )}
              <CertificateButton certificate={item.certificate} className="mt-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Volunteer;
