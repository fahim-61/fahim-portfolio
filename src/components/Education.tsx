import React from "react";
import { EDUCATION } from "../config/data";
import { FaGraduationCap } from "react-icons/fa";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import SectionHeading from "./ui/SectionHeading";
import CertificateButton from "./media/CertificateButton";

const Education = () => {
  return (
    <section id="education" className="py-16 md:py-20 px-2 sm:px-6">
      <div className="max-w-4xl mx-auto w-full">
        <SectionHeading index="01" title="Education" />

        <div className="space-y-6 md:space-y-8">
          {EDUCATION.map((edu, index) => (
            <div
              key={edu.degree}
              className="flex flex-col md:flex-row gap-6 bg-[#0f172a] p-6 md:p-8 rounded-lg border border-[#1e293b] hover:border-[#00f0ff]/30 transition-colors"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex-shrink-0 mt-1">
                <FaGraduationCap className="text-3xl text-[#00f0ff]" />
              </div>

              <div className="flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-[#f8fafc] mb-2">{edu.degree}</h3>
                <h4 className="text-base md:text-lg text-[#00f0ff] mb-4">{edu.institution}</h4>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-mono text-[#94a3b8] gap-3">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                    <span className="flex items-center gap-2">
                      <FiCalendar className="text-[#475569]" /> {edu.period}
                    </span>
                    {edu.location && (
                      <span className="flex items-center gap-2">
                        <FiMapPin className="text-[#475569]" /> {edu.location}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
                    <span className="text-[#00f0ff] font-semibold bg-[#00f0ff]/10 px-3 py-1 rounded">{edu.result}</span>
                    <CertificateButton certificate={edu.certificate} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
