/**
 * Link to certificate file(s) in public/certificates, by filename without extension.
 * One: "edu-hsc"   Several: ["award-react-2026", "lead-esrc-ags"]
 */
export type CertificateRef = string | string[];

export interface Highlight {
  label: string;
  value: string;
  detail: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface EducationInfo {
  degree: string;
  institution: string;
  period: string;
  location?: string;
  result: string;
  certificate?: CertificateRef;
  photocard?: string | string[];
}

export interface Award {
  title: string;
  event: string;
  organizer?: string;
  project?: string;
  year: string;
  certificate?: CertificateRef;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  title: string;
  subtitle?: string;
  technologies: string[];
  points: string[];
  metrics?: ProjectMetric[];
  badge?: string;
  /** Photo slug for the "View Photos" button: public/images/project-<slug>.jpg, project-<slug>-2.jpg, ... */
  photos?: string;
}

export interface Publication {
  authors: string[];
  title: string;
  venue: string;
  details?: string;
  year: string;
  doi?: string;
  description: string;
  /** Buttons under the paper, e.g. Read the paper / dataset / code */
  links?: PublicationLink[];
  certificate?: CertificateRef;
  /** Text on the certificate button, e.g. "View Presentation Certificate" */
  certificateLabel?: string;
}

export interface PublicationLink {
  label: string;
  /** Leave empty ("") to hide the button until you have the link */
  url: string;
  /** Picks the icon */
  kind?: "paper" | "dataset" | "code" | "link";
}

export interface LeadershipRole {
  role: string;
  organization: string;
  period: string;
  description: string;
  certificate?: CertificateRef;
  photocard?: string | string[];
}

export interface TrainingItem {
  title: string;
  provider: string;
  location: string;
  period?: string;
  international?: boolean;
  certificate?: CertificateRef;
}

export interface VolunteerItem {
  name: string;
  fullName?: string;
  year: string;
  certificate?: CertificateRef;
}

export interface Reference {
  name: string;
  positions: string[];
  institution: string;
  email: string;
}

export interface VideoItem {
  /** Optional custom thumbnail: public/images/video-<key>.jpg (YouTube videos get one automatically) */
  key: string;
  title: string;
  subtitle?: string;
  category: string;
  /** YouTube video ID, e.g. "dQw4w9WgXcQ" from youtube.com/watch?v=dQw4w9WgXcQ */
  youtubeId?: string;
  /** Any embeddable URL (Facebook video plugin, Google Drive /preview link, etc.) */
  embedUrl?: string;
  /** A video file inside /public, e.g. "/videos/fair.mp4" */
  src?: string;
}
