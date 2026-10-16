import Hero from "@/components/Hero";
import Education from "@/components/Education";
import Awards from "@/components/Awards";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Leadership from "@/components/Leadership";
import Skills from "@/components/Skills";
import Training from "@/components/Training";
import Volunteer from "@/components/Volunteer";
import Certificates from "@/components/Certificates";
import ImageGallery from "@/components/ImageGallery";
import Videos from "@/components/Videos";
import Contact from "@/components/Contact";
import Navbar, { NavLink } from "@/components/Navbar";
import { MediaProvider } from "@/components/media/MediaProvider";
import { PORTFOLIO_OWNER, PROJECTS, VIDEOS } from "@/config/data";
import { MEDIA_SETTINGS } from "@/config/media";
import { getMediaManifest } from "@/lib/media-manifest";
import { certificateGallery, photoGallery } from "@/lib/media";

export default function Home() {
  // Reads public/certificates and public/images at build time (every deploy).
  const manifest = getMediaManifest();

  // Gallery sections only render when they have something to show.
  const hasCertificates = certificateGallery(manifest).length > 0;
  const hasPhotos = photoGallery(manifest, PROJECTS).length > 0;
  const hasVideos = MEDIA_SETTINGS.showPlaceholders || VIDEOS.some((v) => v.youtubeId || v.embedUrl || v.src);

  // Section numbers stay continuous when a gallery is hidden.
  let n = 8;
  const next = () => String(++n).padStart(2, "0");
  const certIndex = hasCertificates ? next() : "";
  const photoIndex = hasPhotos ? next() : "";
  const videoIndex = hasVideos ? next() : "";
  const contactIndex = next();

  const galleryTarget = hasCertificates ? "#certificates" : hasPhotos ? "#images" : hasVideos ? "#videos" : null;
  const links: NavLink[] = [
    { name: "Home", href: "#home" },
    { name: "Education", href: "#education" },
    { name: "Awards", href: "#awards" },
    { name: "Projects", href: "#projects" },
    { name: "Publications", href: "#publications" },
    { name: "Leadership", href: "#leadership" },
    { name: "Skills", href: "#skills" },
    ...(galleryTarget ? [{ name: "Gallery", href: galleryTarget }] : []),
    { name: "Contact", href: "#contact" },
  ];

  return (
    <MediaProvider manifest={manifest}>
      <Navbar links={links} />
      <div className="flex flex-col gap-2 relative">
        {/* Order follows the CV */}
        <Hero />
        <Education />
        <Awards />
        <Projects />
        <Publications />
        <Leadership />
        <Skills />
        <Training />
        <Volunteer />
        {/* Media: built from public/certificates and public/images */}
        {hasCertificates && <Certificates index={certIndex} />}
        {hasPhotos && <ImageGallery index={photoIndex} />}
        {hasVideos && <Videos index={videoIndex} />}
        <Contact index={contactIndex} />

        <footer className="py-12 text-center text-slate-500 font-mono text-xs md:text-sm">
          <p>
            &copy; {new Date().getFullYear()} {PORTFOLIO_OWNER.name}. Built with Next.js & Tailwind CSS.
          </p>
        </footer>
      </div>
    </MediaProvider>
  );
}
