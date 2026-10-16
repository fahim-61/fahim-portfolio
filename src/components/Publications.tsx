import React from "react";
import { PUBLICATIONS, PORTFOLIO_OWNER } from "../config/data";
import { FiExternalLink, FiBookOpen, FiDatabase, FiGithub, FiFileText, FiLink } from "react-icons/fi";
import { PublicationLink } from "../types";
import SectionHeading from "./ui/SectionHeading";
import CertificateButton from "./media/CertificateButton";

const LINK_ICONS: Record<NonNullable<PublicationLink["kind"]>, typeof FiLink> = {
  paper: FiFileText,
  dataset: FiDatabase,
  code: FiGithub,
  link: FiLink,
};

const Publications = () => {
  // Buttons with an empty url are hidden until the link is filled in.
  const linksOf = (links?: PublicationLink[]) => (links ?? []).filter((l) => l.url.trim());

  return (
    <section id="publications" className="py-16 md:py-20 px-2 sm:px-6">
      <div className="max-w-4xl mx-auto w-full">
        <SectionHeading index="04" title="Publications" />

        <div className="space-y-6 md:space-y-8">
          {PUBLICATIONS.map((pub, index) => (
            <article
              key={pub.title}
              className="bg-[#0a0f1d] border border-[#1e293b] p-6 md:p-8 rounded-lg shadow-lg relative group overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Animated highlight border */}
              <div className="absolute top-0 left-0 w-1 h-full bg-[#00f0ff] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>

              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <FiBookOpen className="text-3xl text-[#00f0ff]" />
                  <span className="font-mono text-sm text-[#475569]">[{index + 1}]</span>
                </div>
                {(linksOf(pub.links)[0]?.url || pub.doi) && (
                  <a
                    href={linksOf(pub.links)[0]?.url ?? `https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#94a3b8] hover:text-[#00f0ff] transition-colors p-2"
                    aria-label="Open publication"
                  >
                    <FiExternalLink className="text-xl" />
                  </a>
                )}
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#f8fafc] mb-3 group-hover:text-[#00f0ff] transition-colors md:pr-8">
                  {pub.title}
                </h3>

                <p className="text-sm text-[#94a3b8] mb-3 leading-relaxed">
                  {pub.authors.map((author, i) => (
                    <React.Fragment key={author}>
                      {author === PORTFOLIO_OWNER.name ? (
                        <span className="text-white font-semibold">{author}</span>
                      ) : (
                        author
                      )}
                      {i < pub.authors.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </p>

                <p className="text-sm font-mono text-[#00f0ff] mb-4">
                  <span className="italic">{pub.venue}</span>
                  {pub.details && <>, {pub.details}</>} &nbsp;|&nbsp; {pub.year}
                </p>

                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block -mt-2 mb-4 font-mono text-xs text-[#64748b] hover:text-[#00f0ff] transition-colors break-all"
                  >
                    DOI: {pub.doi}
                  </a>
                )}

                <p className="text-[#94a3b8] leading-relaxed text-sm md:text-base">{pub.description}</p>
              </div>

              {(linksOf(pub.links).length > 0 || pub.certificate) && (
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  {linksOf(pub.links).map((link, i) => {
                    const Icon = LINK_ICONS[link.kind ?? "link"];
                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-colors ${
                          i === 0
                            ? "bg-[#00f0ff] text-[#0a0f1d] hover:opacity-90 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                            : "border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/10"
                        }`}
                      >
                        <Icon /> {link.label}
                      </a>
                    );
                  })}
                  <CertificateButton certificate={pub.certificate} label={pub.certificateLabel} />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
