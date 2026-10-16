"use client";

import React from "react";
import { PROJECTS } from "../config/data";
import { FiFolder, FiAward, FiCamera } from "react-icons/fi";
import SectionHeading from "./ui/SectionHeading";
import { useMedia } from "./media/MediaProvider";
import { projectPhotos, ViewerItem } from "../lib/media";
import { MEDIA_SETTINGS } from "../config/media";
import { Project } from "../types";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { manifest, openViewer } = useMedia();
  const photos = project.photos ? projectPhotos(manifest, project.photos, project.title, project.subtitle) : [];
  // Before any photo is uploaded, the button opens a "Photo will be added soon" card.
  const viewerItems: ViewerItem[] = photos.length
    ? photos
    : [
        {
          key: `project-${project.photos}`,
          kind: "photo",
          title: project.title,
          subtitle: project.subtitle,
          category: "Projects",
        },
      ];
  const showButton = Boolean(project.photos) && (photos.length > 0 || MEDIA_SETTINGS.alwaysShowPhotoButtons);

  return (
    <div
      className="bg-[#0f172a] rounded-xl flex flex-col h-full border border-[#1e293b] hover:border-[#00f0ff]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,240,255,0.08)] group"
      data-aos="fade-up"
      data-aos-delay={(index % 2) * 80}
    >
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4 mb-6">
          <FiFolder className="text-4xl text-[#00f0ff] flex-shrink-0" />
          {project.badge && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#a78bfa] border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-2.5 py-1 rounded-full whitespace-nowrap">
              <FiAward /> {project.badge}
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-[#f8fafc] group-hover:text-[#00f0ff] transition-colors">
          {project.title}
        </h3>
        {project.subtitle && <p className="text-sm md:text-base text-[#94a3b8] mt-1">{project.subtitle}</p>}

        {project.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-[#0a0f1d] border border-[#1e293b] rounded-md px-3 py-2.5">
                <p className="text-base font-bold text-[#00f0ff] leading-tight">{m.value}</p>
                <p className="text-[11px] text-[#64748b] leading-snug mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        <ul className="mt-5 space-y-2.5 flex-grow">
          {project.points.map((point) => (
            <li key={point} className="flex gap-3 text-sm text-[#94a3b8] leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00f0ff] flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-4 border-t border-[#1e293b]/70 flex flex-wrap items-center gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] text-[#94a3b8] bg-[#0a0f1d] border border-[#334155] px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {showButton && (
          <button
            type="button"
            onClick={() => openViewer(viewerItems, 0)}
            className="mt-5 self-start inline-flex items-center gap-1.5 font-mono text-xs text-[#00f0ff] border border-[#00f0ff]/40 bg-[#00f0ff]/5 hover:bg-[#00f0ff]/15 hover:border-[#00f0ff] px-3 py-1.5 rounded-md transition-colors cursor-pointer"
          >
            <FiCamera className="text-sm" />
            {photos.length > 1 ? `View Photos (${photos.length})` : photos.length === 1 ? "View Photo" : "View Photos"}
          </button>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-16 md:py-20 px-2 sm:px-6">
      <div className="max-w-5xl mx-auto w-full">
        <SectionHeading index="03" title="Key Projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
