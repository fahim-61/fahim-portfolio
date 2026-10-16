import React from "react";

interface SectionHeadingProps {
  index: string;
  title: string;
  meta?: React.ReactNode;
}

const SectionHeading = ({ index, title, meta }: SectionHeadingProps) => {
  return (
    <div className="mb-8 md:mb-10" data-aos="fade-right">
      <h2 className="text-3xl md:text-5xl font-bold text-white flex items-center gap-3 md:gap-4">
        <span className="text-[#00f0ff] font-mono text-2xl md:text-4xl">{index}.</span>
        <span>{title}</span>
        <span className="h-[1px] flex-grow min-w-8 bg-gradient-to-r from-[#475569] to-transparent ml-2 md:ml-4" />
      </h2>
      {meta && <div className="mt-4 font-mono text-xs md:text-sm text-[#94a3b8]">{meta}</div>}
    </div>
  );
};

export default SectionHeading;
