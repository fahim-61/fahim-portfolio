"use client";

import React, { useState } from "react";
import { FiCopy, FiCheck, FiExternalLink, FiMail, FiUser } from "react-icons/fi";
import SectionHeading from "./ui/SectionHeading";
import { PORTFOLIO_OWNER, REFERENCES } from "../config/data";

const CopyButton = ({ value, label }: { value: string; label: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard not available */
        }
      }}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#cbd5e1] bg-[#0f172a] border border-[#334155] hover:border-[#00f0ff] hover:text-[#00f0ff] px-3 py-1.5 rounded-md transition-colors cursor-pointer"
      aria-label={`Copy ${label}`}
    >
      {copied ? <FiCheck className="text-[#00f0ff]" /> : <FiCopy />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

type Row = { label: string; value: string; href?: string; copy?: boolean; external?: boolean };

const SubHeading = ({ kicker, title }: { kicker: string; title: string }) => (
  <div className="mb-6">
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#00f0ff]/80 mb-1">{kicker}</p>
    <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
  </div>
);

const Contact = ({ index = "12" }: { index?: string }) => {
  const rows: Row[] = [
    { label: "Email", value: PORTFOLIO_OWNER.email, href: `mailto:${PORTFOLIO_OWNER.email}`, copy: true },
    { label: "Phone", value: PORTFOLIO_OWNER.phone, href: `tel:${PORTFOLIO_OWNER.phoneHref}`, copy: true },
    { label: "LinkedIn", value: PORTFOLIO_OWNER.linkedinLabel, href: PORTFOLIO_OWNER.linkedin, external: true },
    ...(PORTFOLIO_OWNER.website
      ? [{ label: "Website", value: PORTFOLIO_OWNER.websiteLabel || PORTFOLIO_OWNER.website, href: PORTFOLIO_OWNER.website, external: true }]
      : []),
    { label: "Location", value: PORTFOLIO_OWNER.location },
  ];

  return (
    <section id="contact" className="py-16 md:py-20 px-2 sm:px-6">
      <div className="max-w-5xl mx-auto w-full">
        <SectionHeading index={index} title="Contact & References" meta={<>Based in Dhaka, Bangladesh</>} />

        {/* Direct contact details */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl px-5 md:px-8 py-2 mb-16" data-aos="fade-up">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-1 md:grid-cols-[140px_1fr_auto] items-center gap-x-6 gap-y-1 py-4 md:py-5 ${
                i < rows.length - 1 ? "border-b border-dashed border-[#334155]" : ""
              }`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#64748b]">{row.label}</span>
              {row.href ? (
                <a
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noopener noreferrer" : undefined}
                  className="text-sm md:text-base text-[#f1f5f9] hover:text-[#00f0ff] transition-colors break-all inline-flex items-center gap-2"
                >
                  {row.value}
                  {row.external && <FiExternalLink className="text-[#475569] flex-shrink-0" />}
                </a>
              ) : (
                <span className="text-sm md:text-base text-[#f1f5f9]">{row.value}</span>
              )}
              <div className="md:justify-self-end mt-2 md:mt-0">
                {row.copy && <CopyButton value={row.value} label={row.label} />}
              </div>
            </div>
          ))}
        </div>

        {/* References */}
        <div>
          <SubHeading kicker="Academic" title="References" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REFERENCES.map((ref, index) => (
              <div
                key={ref.email}
                className="bg-[#0a0f1d] border border-[#1e293b] rounded-xl p-6 flex flex-col hover:border-[#00f0ff]/40 transition-colors relative overflow-hidden group"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-11 h-11 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center mb-5">
                  <FiUser className="text-lg text-[#00f0ff]" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-white leading-snug mb-3">{ref.name}</h4>
                <ul className="space-y-1 mb-3">
                  {ref.positions.map((p) => (
                    <li key={p} className="text-sm text-[#94a3b8] leading-snug">
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[#00f0ff] mb-5">{ref.institution}</p>
                <a
                  href={`mailto:${ref.email}`}
                  className="mt-auto inline-flex items-center gap-2 font-mono text-xs text-[#cbd5e1] hover:text-[#00f0ff] transition-colors break-all"
                >
                  <FiMail className="flex-shrink-0 text-[#475569]" /> {ref.email}
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
