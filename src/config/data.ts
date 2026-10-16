/* =====================================================================
 *  SITE CONTENT
 *  All text on the website lives here, in the same order as the page.
 *  `certificate: "<filename>"` links an entry to a file in public/certificates
 *  (see src/config/media.ts and README.md for every filename).
 * ===================================================================== */

import {
  Highlight,
  SkillCategory,
  EducationInfo,
  Award,
  Project,
  Publication,
  LeadershipRole,
  TrainingItem,
  VolunteerItem,
  Reference,
  VideoItem,
} from "../types";

/* ------------------------------------------------------------------ */
/*  Profile                                                            */
/* ------------------------------------------------------------------ */

export const PORTFOLIO_OWNER = {
  name: "Md. Fahim Ferdous",
  shortName: "Fahim",
  title: "Embedded Systems, IoT and Machine Learning Developer",
  email: "fahimferdous61@gmail.com",
  phone: "+880 1860 868772",
  phoneHref: "+8801860868772",
  location: "Mirpur-1, Dhaka, Bangladesh",
  linkedin: "https://www.linkedin.com/in/md-fahim-ferdous/",
  linkedinLabel: "linkedin.com/in/md-fahim-ferdous/",
  /** Add your portfolio / GitHub URL here to show it in the Contact section. */
  website: "",
  websiteLabel: "",
  summary:
    "Computer Science and Engineering graduate (CGPA 3.87/4.00) with hands-on expertise across both software and hardware. On the software side, develops machine learning and deep learning models in Python (TensorFlow, Scikit-learn, CNN), builds web applications with database and cloud integration, and has published research in computer vision. On the hardware side, designs embedded and IoT systems with ESP32 and STM32 and deploys TinyML models on-device. Co-developed nationally recognized health-tech innovations, including a Top 10 project at the Bangladesh Innovation Fair 2026, and currently chairs the IEEE DIU Student Branch.",
};

/* Quick-facts strip shown right after the professional summary */
export const HIGHLIGHTS: Highlight[] = [
  {
    label: "Degree",
    value: "B.Sc. in CSE",
    detail: "Daffodil International University, 2026",
  },
  {
    label: "CGPA",
    value: "3.87 / 4.00",
    detail: "Undergraduate, Sep 2022 to Sep 2026",
  },
  {
    label: "HSC",
    value: "GPA 5.00 / 5.00",
    detail: "Zonail Degree College",
  },
  {
    label: "Publications",
    value: "2 papers",
    detail: "Data in Brief · Taylor & Francis",
  },
  {
    label: "Top Honour",
    value: "National Champion",
    detail: "Bangladesh Innovation Fair 2026",
  },
  {
    label: "International Recognition",
    value: "IIT Bombay, India",
    detail: "Participant, International Summer School",
  },
];

/* ------------------------------------------------------------------ */
/*  01. Education                                                      */
/* ------------------------------------------------------------------ */

export const EDUCATION: EducationInfo[] = [
  {
    degree: "Bachelor of Science in Computer Science and Engineering",
    institution: "Daffodil International University",
    period: "2022 – 2026",
    location: "Dhaka, Bangladesh",
    result: "CGPA: 3.87/4.00",
    certificate: "edu-bsc",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Zonail Degree College",
    period: "2021",
    location: "Natore, Bangladesh",
    result: "GPA: 5.00/5.00",
    certificate: "edu-hsc",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Saint Louis High School",
    period: "2019",
    location: "Natore, Bangladesh",
    result: "GPA: 5.00/5.00",
    certificate: "edu-ssc",
  },
];

/* ------------------------------------------------------------------ */
/*  02. Honors and Awards                                              */
/* ------------------------------------------------------------------ */

export const AWARDS: Award[] = [
  {
    title: "Top 10 Innovation",
    event: "Bangladesh Innovation Fair 2026",
    organizer: "Ministry of Science and Technology",
    project: "Homepital Nexus",
    year: "2026",
    certificate: "award-bif-2026",
  },
  {
    title: "Scholarly Publication Recognition",
    event: "Research Recognition 2025",
    organizer: "Division of Research, DIU",
    year: "2025",
    certificate: "research-publication-recognition-2025",
  },
  {
    title: "1st Runner-up",
    event: "IEEE BECITHCON 2026",
    organizer: "Hosted by IUBAT",
    project: "SmartTherm",
    year: "2026",
    certificate: "award-becithcon-2026",
  },
  {
    title: "1st Runner-up",
    event: "REACT 2026",
    organizer: "Organized by Southeast University",
    project: "SmartTherm",
    year: "2026",
    certificate: "award-react-2026",
  },
  {
    title: "1st Runner-up",
    event: "IoT Project Showcase, INDCon 2025",
    organizer: "Hosted by Eastern University",
    year: "2025",
    certificate: "award-indcon-2025",
  },
  {
    title: "Champion",
    event: "IoT Project Showcase, BIM 2023 Collocated Event",
    organizer: "Hosted by Daffodil International University",
    year: "2023",
    certificate: "award-bim-2023",
  },
];

/* ------------------------------------------------------------------ */
/*  03. Key Projects                                                   */
/* ------------------------------------------------------------------ */

export const PROJECTS: Project[] = [
  {
    title: "Homepital Nexus",
    photos: "homepital-nexus",
    subtitle: "Home-Based Patient Screening and Treatment Platform",
    technologies: ["ESP32", "TinyML", "Supabase", "ECG", "SpO2", "IR Thermometer"],
    badge: "Top 10 · BIF 2026",
    metrics: [
      { value: "Top 10", label: "of 963 entries" },
      { value: "4 vitals", label: "SpO2 · HR · Temp · ECG" },
    ],
    points: [
      "Integrated vitals screening (SpO2, heart rate, temperature, ECG), automated fever cooling and a smart nebulizer into one home device to reduce unnecessary hospital visits.",
      "Abnormal readings are routed through a cloud server to a connected clinic for triage, while non-serious cases receive at-home treatment guidance.",
      "Recognized as a Top 10 innovation among 963 entries at the Bangladesh Innovation Fair 2026.",
    ],
  },
  {
    title: "SmartTherm",
    photos: "smarttherm",
    subtitle: "TinyML-Based Fever Cooling Time Prediction",
    technologies: ["ESP32", "Python", "Scikit-learn", "TensorFlow Lite", "TinyML"],
    badge: "1st Runner-up ×2",
    metrics: [
      { value: "R² 0.871", label: "Gradient Boosting" },
      { value: "1,827", label: "sensor observations" },
      { value: "17", label: "febrile patients" },
    ],
    points: [
      "Built a dataset of 1,827 sensor observations from 17 febrile patients and benchmarked six regression models; Gradient Boosting achieved the best result (R² = 0.871).",
      "Quantized and deployed a neural network on ESP32 for real-time, on-device prediction that drives an automated cooling unit.",
      "1st Runner-up at IEEE BECITHCON 2026 and REACT 2026.",
    ],
  },
  {
    title: "Smart Soil Fertility Analysis and Fertilizer Recommendation System",
    photos: "soil-fertility",
    technologies: ["STM32", "NPK Sensor", "ML Model", "Python"],
    points: [
      "Engineered an STM32-based system acquiring real-time NPK, moisture and pH data, with an ML model recommending fertilizer for precision agriculture.",
    ],
  },
  {
    title: "Automatic Wild Elephant Detection System",
    photos: "elephant-detection",
    technologies: ["ESP32", "Java", "PIR Sensor", "GSM/SMS Alert"],
    points: [
      "Built an AI-powered wildlife intrusion detection system that sends SMS alerts to protect villages and farmland from elephant encroachment.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  04. Publications                                                   */
/* ------------------------------------------------------------------ */

export const PUBLICATIONS: Publication[] = [
  {
    authors: [
      "Md. Fahim Ferdous",
      "Faysal Bin Khaled Nissan",
      "Nur Muhammad Nibir",
      "Md. Hasan Imam Bijoy",
    ],
    title: "AI-MedLeafX: A large-scale computer vision dataset for medicinal plant diagnosis",
    venue: "Data in Brief",
    details: "vol. 62, 111945",
    year: "2025",
    doi: "10.1016/j.dib.2025.111945",
    links: [
      {
        label: "Read the paper",
        url: "https://www.sciencedirect.com/science/article/pii/S2352340925006699",
        kind: "paper",
      },
      {
        label: "View Dataset on Mendeley Data",
        url: "https://data.mendeley.com/datasets/zz7r5y4dc6/1",
        kind: "dataset",
      },
    ],
    description:
      "A large-scale medicinal plant leaf dataset (10k+ images) for AI, machine learning and computer vision research in plant disease recognition and precision agriculture.",
  },
  {
    authors: [
      "Md. Fahim Ferdous",
      "Mehedi Hasan Hira",
      "Nur Muhammad Nibir",
      "Lamia Ruksara",
    ],
    title:
      "Deep Learning-Based Classification of Medicinal Plant Leaf Diseases Using CNN Architectures with Web-Based Deployment",
    venue: "Taylor and Francis",
    year: "2025",
    links: [
      // Paste the full-paper URL between the quotes; the button stays hidden while it is empty.
      { label: "Read the paper", url: "", kind: "paper" },
    ],
    certificate: "research-paper-presentation-idaa-2025",
    certificateLabel: "View Presentation Certificate",
    description:
      "A CNN-based system for automated medicinal plant leaf disease classification, integrated with a web platform for real-time diagnosis and precision agriculture support.",
  },
];

/* ------------------------------------------------------------------ */
/*  05. Leadership Experience                                          */
/* ------------------------------------------------------------------ */

export const LEADERSHIP: LeadershipRole[] = [
  {
    role: "Chairperson",
    organization: "IEEE Computer Society Bangladesh Chapter, Secretariat Ex-Com",
    period: "Mar 2026 – Present",
    certificate: "lead-ieee-cs-bdc-chair",
    photocard: "gallery-leadership-ieee-cs-bdc-chair",
    description:
      "Leading the Secretariat team of the IEEE Computer Society Bangladesh Chapter, overseeing operational coordination, documentation, strategic planning and execution of chapter activities nationwide.",
  },
  {
    role: "Chairperson",
    organization: "IEEE Daffodil International University Student Branch",
    period: "Feb 2026 – Present",
    certificate: "lead-ieee-diu-sb-chair",
    description:
      "Providing leadership and direction to the Student Branch, managing technical and professional development initiatives, member engagement, and collaboration with IEEE organizational units and industry partners.",
  },
  {
    role: "Chairperson",
    organization: "IEEE DIU Student Branch SIGHT Group",
    period: "Apr 2025 – Jan 2026",
    certificate: "lead-ieee-sight-chair",
    description:
      "Led technical project teams focused on humanitarian IoT solutions, overseeing firmware design and sensor integration for community-impact prototypes.",
  },
  {
    role: "Assistant General Secretary",
    organization: "Embedded System Research Center (ESRC), DIU",
    period: "Jul 2024 – Dec 2025",
    certificate: "lead-esrc-ags",
    photocard: "gallery-leadership-esrc-ags",
    description:
      "Delivered hands-on Arduino, ESP32 and STM32 firmware workshops and assisted in coordinating embedded system research projects.",
  },
  {
    role: "General Chair (Student Panel)",
    organization: "IEEE International Congress on AI and Digital Health Innovation",
    period: "2026",
    certificate: "lead-icadhi-2026",
    description:
      "Served as General Chair of the student panel for the congress.",
  },
  {
    role: "Workshop Instructor",
    organization: "Embedded System and IoT Workshop",
    period: "2026",
    certificate: "lead-workshop-instructor-2026",
    description:
      "Instructed participants in embedded systems and IoT; awarded a Certificate of Appreciation.",
  },
];

/* ------------------------------------------------------------------ */
/*  06. Technical Skills                                               */
/* ------------------------------------------------------------------ */

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming",
    skills: [
      { name: "C", icon: "SiC" },
      { name: "C++", icon: "SiCplusplus" },
      { name: "Python", icon: "FaPython" },
      { name: "JavaScript", icon: "FaJsSquare" },
      { name: "HTML", icon: "FaHtml5" },
      { name: "CSS", icon: "FaCss3Alt" },
      { name: "MySQL", icon: "DiMysql" },
    ],
  },
  {
    title: "Embedded and IoT",
    skills: [
      { name: "ESP32", icon: "SiEspressif" },
      { name: "STM32", icon: "SiStmicroelectronics" },
      { name: "Arduino", icon: "SiArduino" },
      { name: "UART", icon: "BsCpu" },
      { name: "SPI", icon: "BsCpu" },
      { name: "I2C", icon: "BsCpu" },
      { name: "MQTT", icon: "SiMqtt" },
      { name: "Wi-Fi", icon: "FaWifi" },
      { name: "GPIO", icon: "BsMotherboard" },
      { name: "IoT Prototyping", icon: "FaNetworkWired" },
    ],
  },
  {
    title: "Machine Learning",
    skills: [
      { name: "TensorFlow", icon: "SiTensorflow" },
      { name: "TinyML", icon: "TbCpu" },
      { name: "Scikit-learn", icon: "SiScikitlearn" },
      { name: "CNN", icon: "TbBrain" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "STM32CubeIDE", icon: "SiStmicroelectronics" },
      { name: "Arduino IDE", icon: "SiArduino" },
      { name: "UI/UX Design", icon: "MdDesignServices" },
      { name: "Microsoft 365", icon: "FaMicrosoft" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  07. Training and Certifications                                    */
/* ------------------------------------------------------------------ */

export const TRAINING: TrainingItem[] = [
  {
    title: "Quantum Computing for Machine Learning",
    provider: "International Summer School, IIT Bombay",
    location: "India",
    international: true,
    certificate: "train-iit-bombay",
  },
  {
    title: "Volunteer Internship Program",
    provider: "International Affairs, DIU",
    location: "Dhaka",
    period: "Jul 2024 – Dec 2024",
    certificate: "train-intl-affairs-internship",
  },
  {
    title: "Advanced Firmware Development",
    provider: "Embedded System Research Center, DIU",
    location: "Dhaka",
    certificate: "train-esrc-firmware",
  },
  {
    title: "Mastering Microcontroller: Embedded Driver Development",
    provider: "Udemy",
    location: "Online",
    certificate: "train-udemy-microcontroller",
  },
  {
    title: "Microsoft Office",
    provider: "Shamim Computer Training Center",
    location: "Pabna",
    certificate: "train-ms-office",
  },
  {
    title: "Participant, IEEE INDCon 2026",
    provider: "Hosted by Ahsanullah University of Science and Technology (AUST)",
    location: "Dhaka",
    certificate: "train-indcon-2026",
  },
    {
    title: "Participant, Unlock the Algorithm Programming Contest",
    provider: "DIU Computer & Programming Club (CPC)",
    location: "Dhaka",
    period: "Spring 2024",
    certificate: "train-unlock-the-algorithm-2024",
  },
  {
    title: "Participant, Take-Off Programming Contest",
    provider: "CSE Fest 2022, Daffodil International University",
    location: "Dhaka",
    period: "Fall 2022",
    certificate: "train-cse-fest-2022",
  },
  {
    title: "Participant, Bangladesh Innovation Fair 2026",
    provider: "Ministry of Science and Technology",
    location: "Dhaka",
    period: "September 2026",
    certificate: "train-bif-2026-top-50",
  },
];

/* ------------------------------------------------------------------ */
/*  08. Volunteer Experience                                           */
/* ------------------------------------------------------------------ */

export const VOLUNTEER: VolunteerItem[] = [
  {
    name: "IDAA 2025",
    certificate: "vol-idaa-2025",
    fullName: "International Conference on Intelligent Data Analysis and Applications",
    year: "2025",
  },
  {
    name: "BIM 2025",
    certificate: "vol-bim-2025",
    fullName: "3rd International Conference on Big Data, IoT and Machine Learning",
    year: "2025",
  },
  {
    name: "DIU Job Utshob 2024",
    fullName: "Organized by Daffodil International University",
    certificate: "vol-job-utshob-2024",
    year: "2024",
  },
  {
    name: "BIM 2023",
    certificate: "vol-bim-2023",
    fullName: "2nd International Conference on Big Data, IoT and Machine Learning",
    year: "2023",
  },
];

/* ------------------------------------------------------------------ */
/*  09. Certificates gallery and 10. Images gallery                    */
/*  Built automatically from the files in public/certificates and      */
/*  public/images. Titles live in src/config/media.ts.                 */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  11. Videos                                                         */
/*  Paste a YouTube ID or an embed URL. Videos with no link are hidden. */
/* ------------------------------------------------------------------ */

export const VIDEOS: VideoItem[] = [
  {
    key: "bif-2026",
    title: "Top 10 Innovation",
    subtitle: "Bangladesh Innovation Fair 2026",
    category: "Awards",
    youtubeId: "eAtsu0StkZ4",
    embedUrl: "",
  },
];

/* ------------------------------------------------------------------ */
/*  12. Contact and References                                         */
/* ------------------------------------------------------------------ */

export const REFERENCES: Reference[] = [
  {
    name: "Professor Dr. Sheak Rashed Haider Noori",
    positions: ["Professor and Head, Department of CSE", "Counselor, IEEE DIU Student Branch"],
    institution: "Daffodil International University",
    email: "headcse@daffodilvarsity.edu.bd",
  },
  {
    name: "Dr. Md Zahid Hasan",
    positions: ["Associate Professor, Department of CSE", "Advisor, IEEE DIU Student Branch"],
    institution: "Daffodil International University",
    email: "zahid.cse@diu.edu.bd",
  },
  {
    name: "Dr. Fizar Ahmed",
    positions: ["Associate Professor, Department of CSE", "Director, Embedded System Research Center"],
    institution: "Daffodil International University",
    email: "fizar.cse@diu.edu.bd",
  },
];
