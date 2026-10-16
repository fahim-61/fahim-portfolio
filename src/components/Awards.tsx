import React from "react";
import { AWARDS } from "../config/data";
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import CertificateButton from "./media/CertificateButton";

const iconFor = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("runner")) return FaMedal;
  if (t.includes("champion") || t.includes("top")) return FaTrophy;
  return FaAward;
};

const Awards = () => {
  return (
    <section id="awards" className="py-16 md:py-20 px-2 sm:px-6">
      <div className="max-w-5xl mx-auto w-full">
        <SectionHeading index="02" title="Honors & Awards" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AWARDS.map((award, index) => {
            const Icon = iconFor(award.title);
            const featured = index === 0;
            return (
              <div
                key={`${award.title}-${award.event}`}
                className={`relative overflow-hidden rounded-xl border p-6 flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-1 ${
                  featured
                    ? "bg-gradient-to-br from-[#0f172a] via-[#0f172a] to-[#1a1240] border-[#00f0ff]/30 hover:border-[#00f0ff]/60"
                    : "bg-[#0f172a] border-[#1e293b] hover:border-[#00f0ff]/40"
                }`}
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 80}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between">
                  <div
                    className={`flex-shrink-0 flex items-center justify-center rounded-lg border ${
                      featured
                        ? "w-12 h-12 bg-[#00f0ff]/15 border-[#00f0ff]/50"
                        : "w-12 h-12 bg-[#00f0ff]/5 border-[#00f0ff]/20"
                    }`}
                  >
                    <Icon className="text-xl text-[#00f0ff]" />
                  </div>
                  <span className="font-mono text-xs text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 rounded">
                    {award.year}
                  </span>
                </div>

                <div className="flex-grow min-w-0">
                  <h3 className="text-lg font-bold text-white leading-snug mb-1">{award.title}</h3>
                  <p className="text-sm md:text-base text-[#cbd5e1]">{award.event}</p>
                  {award.organizer && <p className="text-sm text-[#64748b] mt-1">{award.organizer}</p>}
                  {award.project && (
                    <p className="mt-3 inline-flex items-center gap-2 font-mono text-xs text-[#a78bfa] border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-2.5 py-1 rounded">
                      Project: {award.project}
                    </p>
                  )}
                </div>

                <CertificateButton certificate={award.certificate} className="self-start" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Awards;
