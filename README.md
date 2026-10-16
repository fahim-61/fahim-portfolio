# Md. Fahim Ferdous | Portfolio

Personal portfolio built with Next.js 16 and Tailwind CSS 4.

**The short version:** to put a certificate or photo on the site, rename the file to the name listed below and upload it to the right folder on GitHub. When the site redeploys (Vercel does this automatically on every commit, usually within 1 to 2 minutes), the file shows up in every place it belongs. You do not touch any code for that.

---

## Contents

1. [How it works](#1-how-it-works)
2. [Certificates: every filename and where it appears](#2-certificates)
3. [Images: every filename and where it appears](#3-images)
4. [Everyday tasks, step by step](#4-everyday-tasks-step-by-step)
5. [Editing text and entries in any section](#5-editing-text-and-entries)
6. [Adding a new section](#6-adding-a-new-section)
7. [Settings](#7-settings)
8. [Caching and deployment](#8-caching-and-deployment)
9. [Troubleshooting](#9-troubleshooting)
10. [Project structure and running locally](#10-project-structure-and-running-locally)

---

## 1. How it works

There are two folders for files and two files for settings:

| What | Where | You do this |
|---|---|---|
| Certificate scans | `public/certificates/` | Upload, replace or delete files |
| Photos | `public/images/` | Upload, replace or delete files |
| Certificate and photo titles | `src/config/media.ts` | Only when you add a brand new certificate or photo with a custom title |
| All text on the site | `src/config/data.ts` | Only when you change text or add/remove entries |

> The folders live inside `public/` because that is the folder Next.js publishes to the web. On GitHub, open `public`, then `certificates` or `images`. Each folder has its own short README with the filename checklist.

**The rules the site follows when it builds:**

- It looks at every file in `public/certificates/` and `public/images/`.
- It matches files by **name only**. The extension and letter case do not matter: `edu-hsc.jpg`, `EDU-HSC.PNG`, `edu_hsc.jpeg` and `edu hsc.pdf` are all treated as `edu-hsc`.
- One certificate file can appear in **several places** at once (for example a section card and the Certificates gallery). There is only ever one copy of the file.
- Every entry in Education, Honors & Awards, Leadership Experience, Training & Certifications and Volunteer Experience already shows a **View Certificate** button. Until its file is uploaded, the button opens a neat "Certificate will be added soon" card. Once you upload the file, the same button shows the real certificate.
- Every project in Key Projects shows a **View Photos** button the same way: "Photo will be added soon" until you upload its photos.
- Galleries only show files that exist, so there are never broken images. A gallery with no files is hidden, and the section numbers and the navbar adjust automatically.
- Every file URL carries a fingerprint of the file content (`?v=1a2b3c4d`), so when you replace a file with a new one of the same name, visitors get the new version right away.

**Supported file types**

| Folder | Types | Recommended |
|---|---|---|
| `public/certificates/` | `.jpg` `.jpeg` `.png` `.webp` `.pdf` | **JPG or PNG**, about 1600 px wide, under 1 MB |
| `public/images/` | `.jpg` `.jpeg` `.png` `.webp` | **JPG**, about 1600 px wide, under 500 KB |

PDF certificates work, but browsers cannot draw a preview of a PDF, so the card shows a document icon and phones open the PDF in a new tab. If you have a PDF, the best result is to upload **both** `name.jpg` (shown on the site) and `name.pdf` (offered as "PDF version" in the viewer).

---

## 2. Certificates

**Folder:** `public/certificates/`

Each name below can be used with any supported extension, for example `edu-hsc.jpg`. The first word of the name decides the category in the Certificates gallery:

| Prefix | Gallery category |
|---|---|
| `edu-` | Education |
| `lead-` | Leadership |
| `research-` | Research |
| `award-` | Awards |
| `train-` | Training |
| `vol-` | Volunteering |

Each entry in the sections already has its **View Certificate** button. When you upload the file, that button shows it, and a card for it also appears in the **Certificates gallery**. Both use the same file.

### Education

| Filename (any extension) | Certificate | Appears in |
|---|---|---|
| `edu-bsc` | B.Sc. in Computer Science and Engineering, Daffodil International University | Education → B.Sc. in CSE<br>Certificates gallery (Education filter) |
| `edu-hsc` | Higher Secondary Certificate (HSC), Zonail Degree College | Education → Higher Secondary Certificate (HSC)<br>Certificates gallery (Education filter) |
| `edu-ssc` | Secondary School Certificate (SSC), Saint Louis High School | Education → Secondary School Certificate (SSC)<br>Certificates gallery (Education filter) |

### Leadership

| Filename (any extension) | Certificate | Appears in |
|---|---|---|
| `lead-ieee-cs-bdc-chair` | Chairperson, Secretariat Ex-Com, IEEE Computer Society Bangladesh Chapter | Leadership Experience → Chairperson, IEEE Computer Society Bangladesh Chapter, Secretariat Ex-Com<br>Certificates gallery (Leadership filter) |
| `lead-ieee-diu-sb-chair` | Chairperson, IEEE DIU Student Branch | Leadership Experience → Chairperson, IEEE Daffodil International University Student Branch<br>Certificates gallery (Leadership filter) |
| `lead-ieee-sight-chair` | Chairperson, IEEE DIU SB SIGHT Group | Leadership Experience → Chairperson, IEEE DIU Student Branch SIGHT Group<br>Certificates gallery (Leadership filter) |
| `lead-esrc-ags` | Assistant General Secretary, Embedded System Research Center, DIU | Leadership Experience → Assistant General Secretary, Embedded System Research Center (ESRC), DIU<br>Certificates gallery (Leadership filter) |
| `lead-icadhi-2026` | General Chair (Student Panel), ICADHI 2026 | Leadership Experience → General Chair (Student Panel), IEEE International Congress on AI and Digital Health Innovation<br>Certificates gallery (Leadership filter) |
| `lead-workshop-instructor-2026` | Certificate of Appreciation, Workshop Instructor, Embedded System and IoT Workshop | Leadership Experience → Workshop Instructor, Embedded System and IoT Workshop<br>Certificates gallery (Leadership filter) |

### Research

| Filename (any extension) | Certificate | Appears in |
|---|---|---|
| `research-publication-recognition-2025` | Scholarly Publication Recognition, Division of Research, DIU | Honors & Awards → Scholarly Publication Recognition, Research Recognition 2025<br>Certificates gallery (Research filter) |
| `research-paper-presentation-idaa-2025` | Paper Presentation, IDAA 2025: Deep Learning-Based Classification of Medicinal Plant Leaf Diseases | Publications → Deep Learning-Based Classification of Me…<br>Certificates gallery (Research filter) |

### Awards

| Filename (any extension) | Certificate | Appears in |
|---|---|---|
| `award-bif-2026` | Top 10 Innovation, Bangladesh Innovation Fair 2026 | Honors & Awards → Top 10 Innovation, Bangladesh Innovation Fair 2026<br>Certificates gallery (Awards filter) |
| `award-becithcon-2026` | 1st Runner-up, IEEE BECITHCON 2026, IUBAT | Honors & Awards → 1st Runner-up, IEEE BECITHCON 2026<br>Certificates gallery (Awards filter) |
| `award-react-2026` | 1st Runner-up, REACT 2026, Southeast University | Honors & Awards → 1st Runner-up, REACT 2026<br>Certificates gallery (Awards filter) |
| `award-indcon-2025` | 1st Runner-up, IoT Project Showcase, INDCon 2025 | Honors & Awards → 1st Runner-up, IoT Project Showcase, INDCon 2025<br>Certificates gallery (Awards filter) |
| `award-bim-2023` | Champion, IoT Project Showcase, BIM 2023 Collocated Event | Honors & Awards → Champion, IoT Project Showcase, BIM 2023 Collocated Event<br>Certificates gallery (Awards filter) |
| `award-science-fair-2020` | 1st Position, Science Project Showcasing, Science Fair 2020 | Certificates gallery (Awards filter) |

### Training

| Filename (any extension) | Certificate | Appears in |
|---|---|---|
| `train-iit-bombay` | Quantum Computing for Machine Learning, International Summer School, IIT Bombay | Training & Certifications → Quantum Computing for Machine Learning<br>Certificates gallery (Training filter) |
| `train-intl-affairs-internship` | Volunteer Internship Program, International Affairs, DIU | Training & Certifications → Volunteer Internship Program<br>Certificates gallery (Training filter) |
| `train-esrc-firmware` | Advanced Firmware Development, Embedded System Research Center, DIU | Training & Certifications → Advanced Firmware Development<br>Certificates gallery (Training filter) |
| `train-bcc-iot-robotics` | IoT and Robotics Skill Development, Bangladesh Computer Council, ICT Division | Training & Certifications → IoT and Robotics Skill Development<br>Certificates gallery (Training filter) |
| `train-udemy-microcontroller` | Mastering Microcontroller: Embedded Driver Development, Udemy | Training & Certifications → Mastering Microcontroller: Embedded Driver Development<br>Certificates gallery (Training filter) |
| `train-ms-office` | Microsoft Office, Shamim Computer Training Center | Training & Certifications → Microsoft Office<br>Certificates gallery (Training filter) |
| `train-indcon-2026` | Participant, IEEE INDCon 2026, Ahsanullah University of Science and Technology | Training & Certifications → Participant, IEEE INDCon 2026<br>Certificates gallery (Training filter) |

### Volunteering

| Filename (any extension) | Certificate | Appears in |
|---|---|---|
| `vol-idaa-2025` | Volunteer, IDAA 2025, Intl. Conference on Intelligent Data Analysis and Applications | Volunteer Experience → IDAA 2025<br>Certificates gallery (Volunteering filter) |
| `vol-data-visionary-2025` | Volunteer, Data Visionary Contest 2025 | Volunteer Experience → Data Visionary Contest 2025<br>Certificates gallery (Volunteering filter) |
| `vol-bim-2025` | Volunteer, BIM 2025, 3rd Intl. Conference on Big Data, IoT and Machine Learning | Volunteer Experience → BIM 2025<br>Certificates gallery (Volunteering filter) |
| `vol-job-utshob-2024` | Volunteer, DIU Job Utshob 2024, Daffodil International University | Volunteer Experience → DIU Job Utshob 2024<br>Certificates gallery (Volunteering filter) |
| `vol-bim-2023` | Volunteer, BIM 2023, 2nd Intl. Conference on Big Data, IoT and Machine Learning | Volunteer Experience → BIM 2023<br>Certificates gallery (Volunteering filter) |

### Extra certificates that are not in this list

You can upload a certificate that is not in the table **without editing any code**. Name it `<prefix>-<short-description>`, for example:

- `award-hackathon-champion-2027.jpg` → Certificates gallery, **Awards**, titled "Hackathon Champion", dated 2027
- `train-aws-cloud-practitioner.png` → Certificates gallery, **Training**, titled "AWS Cloud Practitioner"

The title is made from the words in the filename (a year at the end becomes the date). If you want a nicer title, an issuer line, or a **View Certificate** button in a section, see [Add a brand-new certificate](#add-a-brand-new-certificate-with-a-proper-title).

---

## 3. Images

**Folder:** `public/images/`

| Filename (any extension) | What it is | Appears in |
|---|---|---|
| `profile` | Your profile picture | Top of the page (hero) |
| `project-homepital-nexus` | First photo: Homepital Nexus | Key Projects ("View Photos" button on the card)<br>Images gallery (Projects filter) |
| `project-homepital-nexus-2`, `-3`, … | More photos: Homepital Nexus | Same places, in number order |
| `project-smarttherm` | First photo: SmartTherm | Key Projects ("View Photos" button on the card)<br>Images gallery (Projects filter) |
| `project-smarttherm-2`, `-3`, … | More photos: SmartTherm | Same places, in number order |
| `project-soil-fertility` | First photo: Smart Soil Fertility Analysis and Fertilizer Recommendation System | Key Projects ("View Photos" button on the card)<br>Images gallery (Projects filter) |
| `project-soil-fertility-2`, `-3`, … | More photos: Smart Soil Fertility Analysis and Fertilizer Recommendation System | Same places, in number order |
| `project-elephant-detection` | First photo: Automatic Wild Elephant Detection System | Key Projects ("View Photos" button on the card)<br>Images gallery (Projects filter) |
| `project-elephant-detection-2`, `-3`, … | More photos: Automatic Wild Elephant Detection System | Same places, in number order |
| `video-bif-2026` | Thumbnail for the video "Top 10 Innovation" (optional) | Videos |
| `gallery-awards-bif-2026` | Top 10 Innovation, Bangladesh Innovation Fair 2026 | Images gallery (Awards filter) |
| `gallery-awards-becithcon-2026` | 1st Runner-up, IEEE BECITHCON 2026 | Images gallery (Awards filter) |
| `gallery-awards-react-2026` | 1st Runner-up, REACT 2026 | Images gallery (Awards filter) |
| `gallery-awards-indcon-2025` | 1st Runner-up, INDCon 2025 IoT Project Showcase | Images gallery (Awards filter) |
| `gallery-leadership-ieee-diu-sb` | Chairperson, IEEE DIU Student Branch | Images gallery (Leadership filter) |
| `gallery-leadership-ieee-sight` | Chairperson, IEEE DIU SB SIGHT Group | Images gallery (Leadership filter) |
| `gallery-leadership-icadhi-2026` | General Chair, ICADHI 2026 | Images gallery (Leadership filter) |
| `gallery-leadership-workshop-2026` | Workshop Instructor, Embedded System and IoT Workshop | Images gallery (Leadership filter) |
| `gallery-events-iit-bombay` | International Summer School, IIT Bombay, India | Images gallery (Events filter) |
| `gallery-volunteering-idaa-2025` | Volunteer, IDAA 2025 | Images gallery (Volunteering filter) |

**Project photos:** each project card has a **View Photos** button (no picture is shown on the card itself). The photo without a number opens first; add `-2`, `-3`, `-4` and so on for more, and they open in that order. Numbers do not need to be continuous.

**Extra gallery photos without code:** upload `gallery-<category>-<description>.jpg` where category is one of `awards`, `leadership`, `projects`, `events`, `volunteering`. Example: `gallery-events-tech-fest-2027.jpg` appears in the Images gallery under **Events**, titled "Tech Fest 2027".

**Profile picture:** if `profile` is missing, the hero shows your initials instead.

---

## 4. Everyday tasks, step by step

All steps use the GitHub website. Rename files **on your computer before uploading** (GitHub's website cannot rename image files).

### Add a certificate or photo

1. Find its filename in [section 2](#2-certificates) or [section 3](#3-images).
2. Rename the file on your computer, for example `award-react-2026.jpg`.
3. On GitHub open `public/certificates` (or `public/images`).
4. Click **Add file → Upload files**, drop the file in, then click **Commit changes**.
5. Wait for the deploy to finish. The file now shows everywhere it belongs.

### Replace a certificate or photo

Upload the new file with **exactly the same name** (steps above). GitHub replaces the old file. Every place that uses it updates on the next deploy.

If the new file has a **different extension** (old `edu-hsc.jpg`, new `edu-hsc.png`), delete the old one too. When two images share a name, the site uses the first in this order: webp, avif, jpg, jpeg, png, gif.

### Remove a certificate or photo everywhere

On GitHub open the file, click the **⋯** menu (top right), choose **Delete file**, then **Commit changes**. Its gallery card disappears, and its section button goes back to showing "Certificate will be added soon". To remove the button as well, delete the entry's `certificate: "..."` line (next step).

### Remove a certificate from ONE section but keep it in the gallery

Open `src/config/data.ts`, find the entry, and delete its `certificate: "..."` line. The **View Certificate** button disappears from that entry only. Example, Leadership:

```ts
{
  role: "Chairperson",
  organization: "IEEE DIU Student Branch SIGHT Group",
  period: "Apr 2025 – Jan 2026",
  description: "...",
  certificate: "lead-ieee-sight-chair",   // ← delete this line
},
```

The file and its gallery card stay.

### Keep a certificate in its section but hide it from the gallery

Open `src/config/media.ts` and add `gallery: false` to it:

```ts
"edu-ssc": { title: "Secondary School Certificate (SSC)", issuer: "Saint Louis High School", date: "2019", gallery: false },
```

### Show one certificate in another section too

Add the same filename to the other entry in `src/config/data.ts`. Nothing is copied, both places use one file:

```ts
// an Award entry that should also show the IIT Bombay certificate
certificate: "award-bif-2026",
// or several certificates on one entry (button becomes "View Certificates (2)")
certificate: ["award-react-2026", "award-becithcon-2026"],
```

Any entry in Education, Honors & Awards, Publications, Leadership, Training or Volunteer can take a `certificate` line. Add `certificateLabel: "..."` to change the button text.

### Add a brand-new certificate with a proper title

1. Pick a filename with a category prefix, for example `award-hackathon-2027`.
2. Open `src/config/media.ts` and add a line inside `CERTIFICATES`, in the category block where you want it to appear in the gallery:
   ```ts
   "award-hackathon-2027": { title: "Champion", issuer: "National Hackathon 2027", date: "2027" },
   ```
3. Optional: to add a **View Certificate** button in a section, add `certificate: "award-hackathon-2027"` to that entry in `src/config/data.ts`.
4. Upload `award-hackathon-2027.jpg` to `public/certificates/`.

### Add or change project photos

Upload `project-<slug>.jpg` (first photo) and `project-<slug>-2.jpg`, `-3` ... The slug is the `photos:` value of the project in `src/config/data.ts` (for example `smarttherm`). For a new project, choose any slug and add `photos: "my-slug"` to it.

### Change the profile picture

Upload a new `profile.jpg` to `public/images/` (replace the old one).

### Add a video

Open `src/config/data.ts`, find `VIDEOS`, and fill in one of these:

```ts
{
  key: "bif-2026",                       // optional thumbnail: public/images/video-bif-2026.jpg
  title: "Top 10 Innovation",
  subtitle: "Bangladesh Innovation Fair 2026",
  category: "Awards",
  youtubeId: "abc123XYZ",                // from youtube.com/watch?v=abc123XYZ
  embedUrl: "",                          // OR a Facebook / Google Drive embed link
},
```

Videos with no `youtubeId`, `embedUrl` or `src` are hidden. Copy the whole `{ ... }` block to add more videos (give each a different `key`).

---

## 5. Editing text and entries

All text lives in **`src/config/data.ts`**, in the same order as the page. Each section is a list of `{ ... }` blocks separated by commas.

| Section on the site | List in `data.ts` |
|---|---|
| Hero, summary, contact details | `PORTFOLIO_OWNER` |
| Quick-facts strip | `HIGHLIGHTS` |
| 01 Education | `EDUCATION` |
| 02 Honors & Awards | `AWARDS` |
| 03 Key Projects | `PROJECTS` |
| 04 Publications | `PUBLICATIONS` |
| 05 Leadership Experience | `LEADERSHIP` |
| 06 Technical Skills | `SKILL_CATEGORIES` |
| 07 Training & Certifications | `TRAINING` |
| 08 Volunteer Experience | `VOLUNTEER` |
| Videos | `VIDEOS` |
| Contact & References | `PORTFOLIO_OWNER`, `REFERENCES` |

**Add an entry:** copy an existing `{ ... },` block in the same list, paste it where you want it (order on the site = order in the list), and change the text.

**Remove an entry:** delete its whole `{ ... },` block. Its certificate file can stay; it still appears in the gallery.

**Reorder:** move the blocks.

**Publication buttons:** each paper in `PUBLICATIONS` can have link buttons and a certificate button:

```ts
links: [
  { label: "Read the paper", url: "https://www.sciencedirect.com/...", kind: "paper" },
  { label: "View Dataset on Mendeley Data", url: "https://data.mendeley.com/...", kind: "dataset" },
],
certificate: "research-paper-presentation-idaa-2025",
certificateLabel: "View Presentation Certificate",
```

`kind` picks the icon: `paper`, `dataset`, `code` or `link`. The first link is drawn as the bright button. A link with an empty `url: ""` stays hidden, so you can fill it in later (the second paper's "Read the paper" is waiting for its link).

**Edit on GitHub:** open `src/config/data.ts`, click the pencil icon, edit, then **Commit changes**. If the deploy fails after an edit, the usual cause is a missing comma or quote; Vercel's build log shows the line.

Small things to know:

- Text with an apostrophe goes inside double quotes: `"Bachelor's degree"`.
- `badge`, `metrics`, `subtitle`, `organizer`, `project`, `period`, `fullName`, `certificate`, `certificateLabel`, `links` and `photos` are optional; leave them out if not needed.
- The website or GitHub link in Contact appears when you fill in `website` in `PORTFOLIO_OWNER`.

---

## 6. Adding a new section

1. Add the data to `src/config/data.ts`, for example:
   ```ts
   export const COURSES = [
     { title: "Course name", provider: "Provider", certificate: "train-course-name" },
   ];
   ```
2. Create `src/components/Courses.tsx`. The quickest way is to copy `Volunteer.tsx` (a simple card grid with a View Certificate button), rename it, and change `VOLUNTEER` to `COURSES` and the field names.
3. Add it to `src/app/page.tsx` where it should appear: `<Courses />`.
4. Optional: add a navbar link in the `links` list in `src/app/page.tsx`.

Use `<CertificateButton certificate={item.certificate} />` anywhere to get a View Certificate button that follows all the rules above.

---

## 7. Settings

At the top of `src/config/media.ts`:

| Setting | Default | What it does |
|---|---|---|
| `alwaysShowCertificateButtons` | `true` | Every entry with a `certificate` line shows its View Certificate button, even before the file is uploaded (it opens a "will be added soon" card). `false` shows the button only after the file is uploaded. |
| `alwaysShowPhotoButtons` | `true` | Every project shows its View Photos button, even before photos are uploaded. `false` shows it only once a photo exists. |
| `showPlaceholders` | `false` | `true` shows a grey "pending" card or button for every listed file that is not uploaded yet. Handy for seeing where things will go; turn it back off for the live site. |
| `includeProjectPhotosInGallery` | `true` | Project photos also appear in the Images gallery under Projects. |
| `certificatesInitiallyVisible` | `9` | Cards shown before "Show all" in the Certificates gallery. |
| `photosInitiallyVisible` | `12` | Same for the Images gallery. |

---

## 8. Caching and deployment

- The site reads the folders **when it is built**. Every commit to GitHub triggers a new build on Vercel, so uploads and deletions appear after that deploy finishes (check the Deployments tab on Vercel).
- Replaced files get a new fingerprint in their URL, so browsers download the new version immediately. If you still see the old one, do a hard refresh (Ctrl + Shift + R).
- Running `npm run dev` locally picks up new files on every page refresh.

---

## 9. Troubleshooting

| Problem | Fix |
|---|---|
| Uploaded a certificate but the button still says "will be added soon" | Check the name against the table (a missing letter or hyphen is the usual cause). Check the file is inside `public/certificates`, not in `public` or the project root. Wait for the deploy to finish. |
| Windows shows `edu-hsc.jpg` but it still does not work | Windows may hide extensions; the real name could be `edu-hsc.jpg.jpg`. The site handles that, so check the name itself and the folder. |
| Old picture still showing after replacing | If the new file has a different extension, delete the old file. Then hard refresh. |
| PDF shows a document icon | Expected: browsers cannot preview PDFs as thumbnails. Upload a JPG with the same name to get a preview. |
| A whole gallery is missing | It has no files yet. It appears as soon as one matching file is uploaded. |
| Deploy failed after editing `data.ts` or `media.ts` | A comma, quote or bracket is missing. Open the failed deploy's log on Vercel; it names the file and line. |

---

## 10. Project structure and running locally

```
public/
  certificates/            certificate scans (see section 2)
  images/                  photos (see section 3)
src/
  config/
    data.ts                all text content, and which entry links to which certificate
    media.ts               certificate and photo titles, categories, settings
  lib/
    media-manifest.ts      reads the two folders at build time
    media.ts               matches files to entries, builds the galleries
  components/
    media/                 shared viewer, View Certificate button, profile photo
    *.tsx                  one file per section
  app/page.tsx             page order, section numbers, navbar links
```

Run locally:

```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```
