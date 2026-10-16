import React from "react";
import { TRAINING } from "../config/data";
import { TbCertificate } from "react-icons/tb";
import { FiGlobe, FiMapPin } from "react-icons/fi";
import SectionHeading from "./ui/SectionHeading";
import CertificateButton from "./media/CertificateButton";

const Training = () => {
  return (
    <section id="training" className="py-16 md:py-20 px-2 sm:px-6">
      <div className="max-w-5xl mx-auto w-full">
        <SectionHeading index="07" title="Training & Certifications" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {TRAINING.map((item, index) => (
            <div
              key={item.title}
              className={`flex gap-4 p-5 md:p-6 rounded-lg border transition-colors group ${
                item.international
                  ? "md:col-span-2 bg-gradient-to-r from-[#0f172a] to-[#14123a] border-[#7C3AED]/40 hover:border-[#a78bfa]/70"
                  : "bg-[#0f172a] border-[#1e293b] hover:border-[#00f0ff]/40"
              }`}
              data-aos="fade-up"
              data-aos-delay={(index % 2) * 60}
            >
              <div
                className={`flex-shrink-0 w-11 h-11 rounded-md flex items-center justify-center border ${
                  item.international
                    ? "bg-[#7C3AED]/15 border-[#7C3AED]/40 text-[#a78bfa]"
                    : "bg-[#00f0ff]/5 border-[#00f0ff]/20 text-[#00f0ff]"
                }`}
              >
                {item.international ? <FiGlobe className="text-xl" /> : <TbCertificate className="text-2xl" />}
              </div>

              <div className="min-w-0 flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-base md:text-lg font-semibold text-white leading-snug">{item.title}</h3>
                  {item.international && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#a78bfa] border border-[#7C3AED]/50 px-2 py-0.5 rounded">
                      International
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#94a3b8]">{item.provider}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 font-mono text-xs text-[#64748b]">
                  <span className="flex items-center gap-1.5">
                    <FiMapPin className="text-[#475569]" /> {item.location}
                  </span>
                  {item.period && <span>{item.period}</span>}
                </div>
                <CertificateButton certificate={item.certificate} className="mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Training;
