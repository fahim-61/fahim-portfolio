import React from "react";
import { FiCamera, FiFilm, FiFileText } from "react-icons/fi";

interface MediaPlaceholderProps {
  /** certificate / photo / video = file not uploaded yet; pdf = a PDF certificate (no image preview) */
  variant: "certificate" | "photo" | "video" | "pdf";
  large?: boolean;
  /** Visitor-facing message shown instead of the small "pending" tag */
  note?: string;
}

const Tag = ({ children, large }: { children: React.ReactNode; large?: boolean }) => (
  <span
    className={`absolute top-3 right-3 font-mono uppercase tracking-wider text-[#64748b] bg-[#0a0f1d]/80 border border-[#1e293b] rounded px-2 py-0.5 ${
      large ? "text-xs" : "text-[10px]"
    }`}
  >
    {children}
  </span>
);

const Note = ({ text }: { text: string }) => (
  <span className="absolute bottom-[8%] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs md:text-sm text-[#cbd5e1] bg-[#0a0f1d]/90 border border-[#334155] rounded-md px-4 py-2">
    {text}
  </span>
);

/** Drawn wherever a certificate, photo or video has not been uploaded yet, or a PDF has no image preview. */
const MediaPlaceholder = ({ variant, large = false, note }: MediaPlaceholderProps) => {
  if (variant === "certificate" || variant === "pdf") {
    const isPdf = variant === "pdf";
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#0b1222] bg-grid-pattern">
        <div
          className={`relative bg-[#0f172a] border ${isPdf ? "border-[#00f0ff]/40" : "border-[#334155]"} rounded-sm shadow-[0_8px_24px_rgba(0,0,0,0.45)] ${
            large ? "w-[min(560px,80vw)]" : "w-[62%]"
          } aspect-[1.414]`}
        >
          <div className="absolute inset-[5%] border border-[#00f0ff]/20 rounded-[2px] flex flex-col items-center justify-center gap-[7%] px-[10%]">
            <span className="h-[3%] w-[30%] rounded bg-[#00f0ff]/40" />
            <span className="h-[6%] w-[70%] rounded bg-[#475569]/60" />
            <span className="h-[2.5%] w-[85%] rounded bg-[#334155]/70" />
            <span className="h-[2.5%] w-[60%] rounded bg-[#334155]/70" />
            <div className="w-full flex items-end justify-between mt-[4%]">
              <span className="h-[2px] w-[28%] bg-[#475569]" />
              <span className="aspect-square w-[16%] rounded-full border border-[#00f0ff]/40 bg-[#00f0ff]/5" />
              <span className="h-[2px] w-[28%] bg-[#475569]" />
            </div>
          </div>
          {isPdf && (
            <span className="absolute -bottom-3 -right-3 flex items-center gap-1 bg-[#00f0ff] text-[#0a0f1d] font-mono text-[10px] font-bold px-2 py-1 rounded shadow-lg">
              <FiFileText /> PDF
            </span>
          )}
        </div>
        {!isPdf && (note ? <Note text={note} /> : <Tag large={large}>Image pending</Tag>)}
      </div>
    );
  }

  const Icon = variant === "video" ? FiFilm : FiCamera;
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0d1428] to-[#1a1240]">
      <div className="absolute inset-0 bg-grid-pattern opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,240,255,0.10),transparent_55%)]" />
      <div
        className={`absolute inset-x-0 top-0 flex items-center justify-center ${large ? "bottom-0" : "bottom-[35%]"} ${
          variant === "video" ? "opacity-0" : ""
        }`}
      >
        <div
          className={`rounded-full border border-[#00f0ff]/25 bg-[#0a0f1d]/60 flex items-center justify-center text-[#00f0ff]/70 ${
            large ? "w-24 h-24 text-4xl" : "w-14 h-14 text-2xl"
          }`}
        >
          <Icon />
        </div>
      </div>
      {note ? (
        <Note text={note} />
      ) : (
        <Tag large={large}>{variant === "video" ? "Video link pending" : "Photo pending"}</Tag>
      )}
    </div>
  );
};

export default MediaPlaceholder;
