
export const MEDIA_SETTINGS = {
  /**
   * false (recommended for the live site): anything not uploaded yet is hidden,
   *   including "View Certificate" buttons and empty gallery sections.
   * true: missing files show a grey "pending" placeholder so you can see where
   *   everything will go.
   */
  showPlaceholders: false,

  alwaysShowCertificateButtons: false,

  /**
   * true: every project shows its "View Photos" button, even before photos are
   *   uploaded (it opens a "Photo will be added soon" card until then).
   * false: the button appears only after at least one photo is uploaded.
   */
  alwaysShowPhotoButtons: false,

  /** Project photos (project-*.jpg) also appear in the Images gallery under "Projects". */
  includeProjectPhotosInGallery: true,

  /** How many cards show before the "Show all" button. */
  certificatesInitiallyVisible: 9,
  photosInitiallyVisible: 12,
};

/* ---------------------------------------------------------------------
 *  CERTIFICATES  (folder: public/certificates)
 *  The first part of the filename decides the gallery category.
 * ------------------------------------------------------------------- */

export const CERTIFICATE_CATEGORY_PREFIXES: Record<string, string> = {
  edu: "Education",
  lead: "Leadership",
  research: "Research",
  award: "Awards",
  train: "Training",
  vol: "Volunteering",
};

/** Order of the filter chips in the Certificates gallery. */
export const CERTIFICATE_CATEGORY_ORDER = [
  "Education",
  "Leadership",
  "Research",
  "Awards",
  "Training",
  "Volunteering",
  "Other",
];

export interface CertificateDef {
  /** Main line on the card */
  title: string;
  /** Second line: organisation or event */
  issuer?: string;
  /** Small date line */
  date?: string;
  /** Override the category that the filename prefix gives */
  category?: string;
  /** Set to false to keep it out of the Certificates gallery (it still works in its section) */
  gallery?: boolean;
}

/**
 * Key = filename WITHOUT extension.
 * Upload e.g. "edu-hsc.jpg" (or .png / .pdf) to public/certificates.
 * Order here = order in the Certificates gallery.
 */
export const CERTIFICATES: Record<string, CertificateDef> = {
  /* Education */
  "edu-bsc": {
    title: "B.Sc. in Computer Science and Engineering",
    issuer: "Daffodil International University",
    date: "2026",
  },
  "edu-hsc": { title: "Higher Secondary Certificate (HSC)", issuer: "Zonail Degree College", date: "2021" },
  "edu-ssc": { title: "Secondary School Certificate (SSC)", issuer: "Saint Louis High School", date: "2019" },

  /* Leadership */
  "lead-ieee-cs-bdc-chair": {
    title: "Chairperson, Secretariat Ex-Com",
    issuer: "IEEE Computer Society Bangladesh Chapter",
    date: "Mar 2026 – Present",
  },
  "lead-ieee-diu-sb-chair": { title: "Chairperson", issuer: "IEEE DIU Student Branch", date: "Feb 2026 – Present" },
  "lead-ieee-sight-chair": { title: "Chairperson", issuer: "IEEE DIU SB SIGHT Group", date: "Apr 2025 – Jan 2026" },
  "lead-esrc-ags": {
    title: "Assistant General Secretary",
    issuer: "Embedded System Research Center, DIU",
    date: "Jul 2024 – Dec 2025",
  },
  "lead-icadhi-2026": { title: "General Chair (Student Panel)", issuer: "ICADHI 2026", date: "2026" },
  "lead-workshop-instructor-2026": {
    title: "Certificate of Appreciation",
    issuer: "Workshop Instructor, Embedded System and IoT Workshop",
    date: "2026",
  },

  /* Research */
  "research-publication-recognition-2025": {
    title: "Scholarly Publication Recognition",
    issuer: "Division of Research, DIU",
    date: "2025",
  },
  "research-paper-presentation-idaa-2025": {
    title: "Paper Presentation",
    issuer: "IDAA 2025: Deep Learning-Based Classification of Medicinal Plant Leaf Diseases",
    date: "2025",
  },

  /* Awards */
  "award-bif-2026": { title: "Top 10 Innovation", issuer: "Bangladesh Innovation Fair 2026", date: "2026" },
  "award-becithcon-2026": { title: "1st Runner-up", issuer: "IEEE BECITHCON 2026, IUBAT", date: "2026" },
  "award-react-2026": { title: "1st Runner-up", issuer: "REACT 2026, Southeast University", date: "2026" },
  "award-indcon-2025": { title: "1st Runner-up, IoT Project Showcase", issuer: "INDCon 2025, Eastern University", date: "2025" },
  "award-bim-2023": { title: "Champion, IoT Project Showcase", issuer: "BIM 2023 Collocated Event, DIU", date: "2023" },
  "award-science-fair-2020": {
    title: "1st Position, Science Project Showcasing",
    issuer: "Science Fair 2020",
    date: "2020",
  },

  /* Training */
  "train-iit-bombay": {
    title: "Quantum Computing for Machine Learning",
    issuer: "International Summer School, IIT Bombay",
  },
  "train-intl-affairs-internship": {
    title: "Volunteer Internship Program",
    issuer: "International Affairs, DIU",
    date: "Jul 2024 – Dec 2024",
  },
  "train-esrc-firmware": { title: "Advanced Firmware Development", issuer: "Embedded System Research Center, DIU" },
  "train-bcc-iot-robotics": {
    title: "IoT and Robotics Skill Development",
    issuer: "Bangladesh Computer Council, ICT Division",
  },
  "train-udemy-microcontroller": { title: "Mastering Microcontroller: Embedded Driver Development", issuer: "Udemy" },
  "train-ms-office": { title: "Microsoft Office", issuer: "Shamim Computer Training Center" },
  "train-indcon-2026": {
    title: "Participant, IEEE INDCon 2026",
    issuer: "Ahsanullah University of Science and Technology",
    date: "2026"
  },
    "train-unlock-the-algorithm-2024": {
    title: "Unlock the Algorithm Programming Contest",
    issuer: "DIU Computer & Programming Club, Certificate of Appreciation",
    date: "Spring 2024",
  },
  "train-cse-fest-2022": {
    title: "Take-Off Programming Contest",
    issuer: "DIU CSE Fest 2022, Certificate of Participation",
    date: "Fall 2022",
  },
  "train-bif-2026-top-50": {
    title: "Top 50 Innovators",
    issuer: "Bangladesh Innovation Fair 2026, Ministry of Science and Technology",
    date: "Jan 2026",
  },

  /* Volunteering */
  "vol-idaa-2025": {
    title: "Volunteer, IDAA 2025",
    issuer: "Intl. Conference on Intelligent Data Analysis and Applications",
    date: "2025",
  },
  "vol-bim-2025": {
    title: "Volunteer, BIM 2025",
    issuer: "3rd Intl. Conference on Big Data, IoT and Machine Learning",
    date: "2025",
  },
  "vol-job-utshob-2024": { 
    title: "Volunteer, DIU Job Utshob 2024", 
    issuer: "Organized by Daffodil International University", 
    date: "2024" 
  },
  "vol-bim-2023": {
    title: "Volunteer, BIM 2023",
    issuer: "2nd Intl. Conference on Big Data, IoT and Machine Learning",
    date: "2023",
  },
};

/* ---------------------------------------------------------------------
 *  IMAGES  (folder: public/images)
 * ------------------------------------------------------------------- */

/** Hero photo: public/images/profile.jpg */
export const PROFILE_IMAGE = "profile";

/**
 * Project photos (opened by the "View Photos" button on each project card):
 * public/images/project-<slug>.jpg is the first photo,
 * project-<slug>-2.jpg, project-<slug>-3.jpg ... are the next ones.
 * The <slug> is set per project in data.ts (`photos: "smarttherm"`).
 */
export const PROJECT_IMAGE_PREFIX = "project-";

/** Custom video thumbnail: public/images/video-<key>.jpg (key set in data.ts). */
export const VIDEO_IMAGE_PREFIX = "video-";

/** Images gallery: public/images/gallery-<category>-<name>.jpg */
export const GALLERY_CATEGORY_PREFIXES: Record<string, string> = {
  awards: "Awards",
  leadership: "Leadership",
  research: "Research",
  training: "Training",
  events: "Events",
  projects: "Projects",
  volunteering: "Volunteering",
};

/** Order of the filter chips in the Images gallery. */
export const GALLERY_CATEGORY_ORDER = ["Awards", "Leadership", "Research", "Training", "Events", "Projects", "Volunteering", "Other"];

export interface PhotoDef {
  title: string;
  subtitle?: string;
}

/**
 * Images gallery entries. Key = filename WITHOUT extension.
 * Each entry can have extra photos: add -2, -3 ... to the filename
 * (gallery-events-iit-bombay.jpg, gallery-events-iit-bombay-2.jpg). They share this title.
 * Entries with no uploaded photo are hidden.
 * Any other "gallery-<category>-<name>" file you upload is shown too, titled from <name>.
 */
export const GALLERY_PHOTOS: Record<string, PhotoDef> = {
  /* Awards */
  "gallery-awards-bif-2026": { title: "Top 10 Innovation", subtitle: "Bangladesh Innovation Fair 2026" },
  "gallery-awards-becithcon-2026": { title: "1st Runner-up", subtitle: "IEEE BECITHCON 2026" },
  "gallery-awards-react-2026": { title: "1st Runner-up", subtitle: "REACT 2026" },
  "gallery-awards-indcon-2025": { title: "1st Runner-up", subtitle: "INDCon 2025 IoT Project Showcase" },
  "gallery-awards-bim-2023": { title: "Champion", subtitle: "IoT Project Showcase, BIM 2023" },
  "gallery-awards-research-recognition-2025": { title: "Scholarly Publication Recognition", subtitle: "Division of Research, DIU" },

  /* Leadership */
  "gallery-leadership-ieee-cs-bdc-chair": { title: "Chairperson", subtitle: "IEEE CS Bangladesh Chapter, Secretariat Ex-Com" },
  "gallery-leadership-ieee-diu-sb": { title: "Chairperson", subtitle: "IEEE DIU Student Branch" },
  "gallery-leadership-ieee-sight": { title: "Chairperson", subtitle: "IEEE DIU SB SIGHT Group" },
  "gallery-leadership-esrc-ags": { title: "Assistant General Secretary", subtitle: "Embedded System Research Center, DIU" },
  "gallery-leadership-icadhi-2026": { title: "General Chair", subtitle: "ICADHI 2026" },
  "gallery-leadership-workshop-2026": { title: "Workshop Instructor", subtitle: "Embedded System and IoT Workshop" },

  /* Research */
  "gallery-research-idaa-2025": { title: "Paper Presentation", subtitle: "IDAA 2025" },

  /* Training */
  "gallery-training-intl-affairs-internship": { title: "Volunteer Internship Program", subtitle: "International Affairs, DIU" },
  "gallery-training-esrc-firmware": { title: "Advanced Firmware Development", subtitle: "Embedded System Research Center, DIU" },
  "gallery-training-ms-office": { title: "Microsoft Office", subtitle: "Shamim Computer Training Center" },

  /* Events */
  "gallery-events-iit-bombay": { title: "International Summer School", subtitle: "IIT Bombay, India" },
  "gallery-events-indcon-2026": { title: "IEEE INDCon 2026", subtitle: "Ahsanullah University of Science and Technology" },
  "gallery-events-bif-2026-top-50": { title: "Top 50 Innovators", subtitle: "Bangladesh Innovation Fair 2026" },
  "gallery-events-unlock-the-algorithm-2024": { title: "Unlock the Algorithm Programming Contest", subtitle: "DIU CPC, Spring 2024" },
  "gallery-events-cse-fest-2022": { title: "Take-Off Programming Contest", subtitle: "DIU CSE Fest 2022" },

  /* Volunteering */
  "gallery-volunteering-idaa-2025": { title: "Volunteer", subtitle: "IDAA 2025" },
  "gallery-volunteering-bim-2025": { title: "Volunteer", subtitle: "BIM 2025" },
  "gallery-volunteering-job-utshob-2024": { title: "Volunteer", subtitle: "DIU Job Utshob 2024" },
  "gallery-volunteering-bim-2023": { title: "Volunteer", subtitle: "BIM 2023" },
};
