"use client";

import React from "react";
import { TbCertificate } from "react-icons/tb";
import { CertificateRef, certificatesFor } from "../../lib/media";
import { MEDIA_SETTINGS } from "../../config/media";
import { useMedia } from "./MediaProvider";

interface CertificateButtonProps {
  certificate?: CertificateRef;
  /** Button text, e.g. "View Presentation Certificate". Default: "View Certificate" */
  label?: string;
  className?: string;
}

/**
 * "View Certificate" button for any section entry that has a `certificate` in data.ts.
 * With MEDIA_SETTINGS.alwaysShowCertificateButtons on, it shows even before the file
 * is uploaded and opens a "will be added soon" card until then.
 */
const CertificateButton = ({ certificate, label = "View Certificate", className = "" }: CertificateButtonProps) => {
  const { manifest, openViewer } = useMedia();
  const items = certificatesFor(manifest, certificate, MEDIA_SETTINGS.alwaysShowCertificateButtons);
  if (!items.length) return null;

  const text = items.length > 1 ? `${label.replace(/Certificate$/, "Certificates")} (${items.length})` : label;

  return (
    <button
      type="button"
      onClick={() => openViewer(items, 0)}
      className={`inline-flex items-center gap-1.5 font-mono text-xs text-[#00f0ff] border border-[#00f0ff]/40 bg-[#00f0ff]/5 hover:bg-[#00f0ff]/15 hover:border-[#00f0ff] px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${className}`}
    >
      <TbCertificate className="text-sm" />
      {text}
    </button>
  );
};

export default CertificateButton;
