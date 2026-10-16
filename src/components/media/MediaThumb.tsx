import React from "react";
import { ViewerItem } from "../../lib/media";
import MediaPlaceholder from "../ui/MediaPlaceholder";
import { PdfThumb } from "./PdfPreview";

/** Fills its (relative, sized) parent with the item's image, the first page of its PDF, or a placeholder. */
const MediaThumb = ({
  item,
  className = "",
  fit = "cover-top",
}: {
  item: ViewerItem;
  className?: string;
  fit?: "cover" | "cover-top";
}) => {
  if (item.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover ${fit === "cover-top" ? "object-top" : ""} ${className}`}
      />
    );
  }
  if (item.pdf) return <PdfThumb url={item.pdf} alt={item.title} className={className} />;
  return <MediaPlaceholder variant={item.kind === "certificate" ? "certificate" : "photo"} />;
};

export default MediaThumb;
