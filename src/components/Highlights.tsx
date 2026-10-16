import React from "react";
import { HIGHLIGHTS } from "../config/data";

const Highlights = () => {
  return (
    <div className="max-w-6xl mx-auto w-full mt-10 md:mt-12" data-aos="fade-up">
      {/* gap-px over a border-coloured background draws 1px dividers in every layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-px bg-[#1e293b] border border-[#1e293b] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.04)]">
        {HIGHLIGHTS.map((item) => (
          <div
            key={item.label}
            className="relative bg-[#0b1222] p-5 md:p-6 xl:px-5 group hover:bg-[#0f172a] transition-colors"
          >
            <span className="absolute top-0 left-0 h-[2px] w-0 bg-[#00f0ff] group-hover:w-full transition-all duration-500" />
            {/* labels sit on a shared baseline so values line up even when one label wraps */}
            <p className="xl:min-h-[2.6em] flex items-end font-mono text-[10px] md:text-[11px] leading-[1.3] uppercase tracking-[0.16em] text-[#00f0ff]/70 mb-2">
              {item.label}
            </p>
            <p className="text-base sm:text-lg xl:text-[17px] font-bold text-white leading-snug mb-1.5">{item.value}</p>
            <p className="text-xs md:text-[13px] text-[#94a3b8] leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
