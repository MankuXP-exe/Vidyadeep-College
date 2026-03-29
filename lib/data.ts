import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Microscope,
  MonitorSmartphone,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Users,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About College" },
  { href: "/courses", label: "Courses" },
  { href: "/faculty", label: "Faculty" },
  { href: "/facilities", label: "Facilities" },
  { href: "/admissions", label: "Admissions" },
  { href: "/placements", label: "Placements" },
  { href: "/contact", label: "Contact" },
  { href: "/apply-online", label: "Apply Online" },
];

export const contactDetails = {
  address: [
    "Near Civil Hospital",
    "Opp Nayara Petrol Pump",
    "Haily Mandi Road",
    "Farrukhnagar",
    "Gurugram",
    "Haryana India",
  ],
  phones: ["9992101666", "7988348872", "07056098341"],
  mapEmbed:
    "https://www.google.com/maps?q=Near%20Civil%20Hospital%20Opp%20Nayara%20Petrol%20Pump%20Haily%20Mandi%20Road%20Farrukhnagar%20Gurugram&output=embed",
};

export const socialLinks = {
  youtube: "https://youtube.com/@vidyadeepparamedicalcollege",
  instagram: "https://www.instagram.com/vidyadeepparamedicalinstitute/",
  map: "https://maps.app.goo.gl/GVCa31PatoJK62yq6",
};

export const highlights = [
  {
    title: "100% Job Placement Assistance",
    description: "Career support, hospital tie-ups, and interview readiness built into every program.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Highly Experienced Faculty",
    description: "Learn from doctors, clinicians, and academic mentors with real field experience.",
    icon: Users,
  },
  {
    title: "Smart Classrooms",
    description: "Digitally enabled classrooms designed for modern clinical and academic learning.",
    icon: MonitorSmartphone,
  },
  {
    title: "Fully AC Campus",
    description: "A comfortable campus environment built for focused, year-round learning.",
    icon: Building2,
  },
  {
    title: "English Speaking Training",
    description: "Professional communication support to prepare students for hospitals and interviews.",
    icon: BookOpen,
  },
  {
    title: "Government Job Preparation",
    description: "Structured guidance for public-sector exams and healthcare recruitment pathways.",
    icon: ShieldCheck,
  },
  {
    title: "Foreign Internship Program (Japan)",
    description: "International exposure with special focus on healthcare opportunities in Japan.",
    icon: Award,
  },
];

export const defaultCourses = [
  {
    slug: "diploma-in-mlt",
    title: "Diploma in MLT",
    category: "Diploma Program",
    shortDesc: "Medical lab technology and diagnostic testing.",
    duration: "2 Years",
    icon: "Microscope",
    featured: true,
  },
  {
    slug: "diploma-in-physiotherapy",
    title: "Diploma in Physiotherapy",
    category: "Diploma Program",
    shortDesc: "Rehabilitation and physical therapy treatment.",
    duration: "2 Years",
    icon: "Stethoscope",
    featured: true,
  },
  {
    slug: "diploma-in-anm",
    title: "Diploma in ANM",
    category: "Diploma Program",
    shortDesc: "Basic nursing and maternal healthcare training.",
    duration: "2 Years",
    icon: "Users",
    featured: true,
  },
  {
    slug: "diploma-in-gnm",
    title: "Diploma in GNM",
    category: "Diploma Program",
    shortDesc: "Nursing, midwifery, and patient care focus.",
    duration: "3.5 Years",
    icon: "Users",
    featured: true,
  },
  {
    slug: "diploma-in-cms-ed",
    title: "Diploma in CMS & ED",
    category: "Diploma Program",
    shortDesc: "Primary healthcare and basic essential drugs treatment.",
    duration: "18 Months",
    icon: "Syringe",
    featured: true,
  },
  {
    slug: "diploma-in-homeopathy-pharmacy",
    title: "Diploma in Homeopathy Pharmacy",
    category: "Diploma Program",
    shortDesc: "Homeopathic medicine preparation and dispensing.",
    duration: "2 Years",
    icon: "Microscope",
    featured: true,
  },
];

export const iconMap = {
  Microscope,
  Stethoscope,
  ShieldCheck,
  Syringe,
  Users,
};

export const facultyMembers = [
  ["Dr. Sandeep Singh", "dr-sandeep-singh", "Chairman", "BDS"],
  ["Dr. Neeraj Khatri", "dr-neeraj-khatri", "Principal", "BDS"],
  ["Mr. Dhiraj Jha", "mr-dhiraj-jha", "Managing Director", "BA, MA, B.Ed"],
  ["Ms. Nidhi Gulia", "ms-nidhi-gulia", "Senior Lecturer", "BSc Nursing"],
  ["Dr. Kuldeep Sheoran", "dr-kuldeep-sheoran", "Homeopathic Wing", "BHMS"],
].map(([name, slug, designation, qualifications], index) => ({
  name,
  slug,
  designation,
  qualifications,
  image: "",
  sortOrder: index + 1,
}));

export const testimonials = [
  {
    studentName: "Khushi Sharma",
    course: "BSc Nursing",
    quote:
      "The campus culture feels disciplined and premium. Faculty mentoring and placement guidance gave me confidence from day one.",
    rating: 5,
  },
  {
    studentName: "Ankit Yadav",
    course: "DMLT",
    quote:
      "Our labs, smart classrooms, and clinical exposure made the learning very practical. The career support is genuinely helpful.",
    rating: 5,
  },
  {
    studentName: "Sonia Malik",
    course: "GNM",
    quote:
      "I chose Vidyadeep because it feels like a professional healthcare institute, not just another college. The training standards are excellent.",
    rating: 5,
  },
];

export const gallerySeed = [
  {
    title: "Campus Environment",
    imageUrl: "/images/hero-image.jpg",
    altText: "Campus facade and front view of Vidyadeep Paramedical Institute",
    featured: true,
  },
  {
    title: "Reception Area",
    imageUrl: "/images/reception-look.webp",
    altText: "Premium reception and welcome layout",
    featured: true,
  },
];

export const siteContentSeed = [
  {
    section: "about-preview",
    title: "A future-ready campus for paramedical excellence",
    body: "Vidyadeep Paramedical Institute is built to prepare the next generation of healthcare professionals through industry-aligned courses, disciplined training, and a premium learning environment in Gurugram.",
  },
  {
    section: "about-page",
    title: "History, vision, and healthcare-focused growth",
    body: "Vidyadeep Paramedical Institute was established with a mission to bridge academic ambition and clinical employability. The institution combines modern infrastructure, experienced faculty, and career-first planning to nurture skilled professionals for hospitals, clinics, diagnostics centres, and global healthcare opportunities.",
  },
];
