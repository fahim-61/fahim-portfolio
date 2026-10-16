import React from "react";
import { LEADERSHIP } from "../config/data";
import SectionHeading from "./ui/SectionHeading";
import CertificateButton from "./media/CertificateButton";
import PhotocardButton from "./media/PhotocardButton";

const Leadership = () => {
  return (
    <section id="leadership" className="py-16 md:py-20 px-2 sm:px-6">
      <div className="max-w-4xl mx-auto w-full">
        <SectionHeading index="05" title="Leadership Experience" />

        <div className="relative border-l border-[#334155] ml-2 md:ml-6 space-y-6 md:space-y-8">
          {LEADERSHIP.map((exp, index) => (
            <div
              key={`${exp.role}-${exp.organization}`}
              className="relative pl-7 md:pl-12"
              data-aos="fade-up"
              data-aos-delay={index * 60}
            >
              {/* Timeline Marker */}
              <div className="absolute w-4 h-4 rounded-full bg-[#0a0f1d] border-2 border-[#00f0ff] -left-[9px] top-1.5 ring-4 ring-[#0a0f1d]"></div>

              <h3 className="text-lg md:text-xl font-bold text-[#f8fafc] mb-2">
                {exp.role} <span className="text-[#00f0ff]">@ {exp.organization}</span>
              </h3>

              <p className="text-sm font-mono text-[#94a3b8] mb-3">{exp.period}</p>

              <p className="text-[#cbd5e1] leading-relaxed max-w-2xl text-sm md:text-base">
                {exp.description}
              </p>

              {/* Each button renders only when its file is uploaded; an empty row takes no space */}
              <div className="flex flex-wrap gap-3 mt-4 empty:hidden">
                <CertificateButton certificate={exp.certificate} />
                <PhotocardButton photocard={exp.photocard} title={exp.role} subtitle={exp.organization} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
