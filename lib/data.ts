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
  { href: "/gallery", label: "Gallery" },
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
    slug: "diploma-in-medical-laboratory-technology",
    title: "Diploma in Medical Laboratory Technology",
    category: "Diploma Program",
    shortDesc: "Hands-on training in pathology, diagnostics, and laboratory operations.",
    overview:
      "This diploma prepares students for the fast-growing diagnostics ecosystem with practical exposure to pathology labs, sample handling, and modern testing workflows.",
    eligibility: "10+2 or equivalent",
    duration: "2 Years",
    careers: "Medical Laboratory Technician, Pathology Lab Assistant, Diagnostic Centre Executive",
    icon: "Microscope",
    featured: true,
  },
  {
    slug: "diploma-in-operation-theatre-technology",
    title: "Diploma in Operation Theatre Technology",
    category: "Diploma Program",
    shortDesc: "Develop core OT support skills, sterilization knowledge, and surgical readiness.",
    overview:
      "Designed for students aiming to work in operation theatre environments, this program covers surgical support, anesthesia assistance, sterile procedures, and patient safety.",
    eligibility: "10+2 or equivalent",
    duration: "2 Years",
    careers: "OT Technician, Surgical Assistant, Hospital Support Specialist",
    icon: "Stethoscope",
    featured: true,
  },
  {
    slug: "diploma-in-dental-hygiene",
    title: "Diploma in Dental Hygiene",
    category: "Diploma Program",
    shortDesc: "Focused education in dental care, preventive procedures, and patient hygiene support.",
    overview:
      "Students gain foundational knowledge in oral healthcare, scaling assistance, patient communication, and hygiene practices that support dental clinics and hospitals.",
    eligibility: "10+2 or equivalent",
    duration: "2 Years",
    careers: "Dental Hygienist, Dental Clinic Assistant, Oral Healthcare Educator",
    icon: "ShieldCheck",
    featured: false,
  },
  {
    slug: "diploma-in-physiotherapy",
    title: "Diploma in Physiotherapy",
    category: "Diploma Program",
    shortDesc: "Build rehabilitation and physical therapy support skills for diverse care settings.",
    overview:
      "This program introduces musculoskeletal rehabilitation, exercise therapy, patient handling, and physiotherapy support protocols for clinics and wellness centres.",
    eligibility: "10+2 or equivalent",
    duration: "2 Years",
    careers: "Physiotherapy Assistant, Rehab Technician, Therapy Centre Coordinator",
    icon: "Syringe",
    featured: false,
  },
  {
    slug: "diploma-in-optometry",
    title: "Diploma in Optometry",
    category: "Diploma Program",
    shortDesc: "Practical vision care education covering eye testing and optical support systems.",
    overview:
      "Students learn visual assessment basics, lens support, refraction principles, and patient care workflows for optical centres and eye hospitals.",
    eligibility: "10+2 or equivalent",
    duration: "2 Years",
    careers: "Optometry Assistant, Vision Care Executive, Optical Centre Technician",
    icon: "ShieldCheck",
    featured: false,
  },
  {
    slug: "diploma-in-anm",
    title: "Diploma in ANM",
    category: "Diploma Program",
    shortDesc: "Community-focused nursing education for essential frontline healthcare practice.",
    overview:
      "ANM training develops core patient care abilities, maternal and child health awareness, and community healthcare preparedness.",
    eligibility: "10+2 or equivalent",
    duration: "2 Years",
    careers: "ANM Nurse, Community Health Worker, Rural Health Assistant",
    icon: "Stethoscope",
    featured: true,
  },
  {
    slug: "diploma-in-gnm",
    title: "Diploma in GNM",
    category: "Diploma Program",
    shortDesc: "Comprehensive nursing diploma combining clinical fundamentals and patient care.",
    overview:
      "GNM equips students with hospital-ready clinical knowledge, ward procedures, and nursing ethics for professional healthcare environments.",
    eligibility: "10+2 or equivalent",
    duration: "3 Years",
    careers: "GNM Nurse, Staff Nurse, Clinical Care Associate",
    icon: "Users",
    featured: true,
  },
  {
    slug: "bsc-nursing",
    title: "BSc Nursing",
    category: "Degree Program",
    shortDesc: "Advanced nursing education with strong academic, clinical, and leadership grounding.",
    overview:
      "A degree pathway for future nursing professionals covering anatomy, patient care, pharmacology, hospital practice, and care leadership.",
    eligibility: "10+2 with science stream",
    duration: "4 Years",
    careers: "Registered Nurse, Hospital Nursing Officer, Clinical Supervisor",
    icon: "Users",
    featured: true,
  },
  {
    slug: "bachelor-in-physiotherapy",
    title: "Bachelor in Physiotherapy (BPT)",
    category: "Degree Program",
    shortDesc: "Deep physiotherapy training with rehabilitation, assessment, and treatment exposure.",
    overview:
      "BPT prepares students for professional physiotherapy roles through movement science, injury rehab, neuro-muscular recovery, and patient management.",
    eligibility: "10+2 with science stream",
    duration: "4.5 Years",
    careers: "Physiotherapist, Rehabilitation Specialist, Sports Therapy Associate",
    icon: "Syringe",
    featured: true,
  },
  {
    slug: "bachelor-in-medical-lab-technology",
    title: "Bachelor in Medical Lab Technology (BMLT)",
    category: "Degree Program",
    shortDesc: "A modern diagnostics degree for pathology, research, and healthcare lab systems.",
    overview:
      "BMLT offers advanced study of diagnostics, biochemistry, pathology, microbiology, and laboratory quality protocols for modern healthcare systems.",
    eligibility: "10+2 with science stream",
    duration: "3 Years",
    careers: "Senior Lab Technologist, Diagnostic Analyst, Research Lab Associate",
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
  ["Dr Sandeep Singh", "chairman", "Chairman", "MBBS, MD"],
  ["Dr Neeraj Khatri", "principal", "Principal", "MBBS, MHA"],
  ["Sir Maan Singh", "vice-principal", "Vice Principal", "MPT, Academic Administration"],
  ["Dr Yogesh Yadav", "dr-yogesh-yadav", "Senior Faculty", "MBBS"],
  ["Pt Sudarshan Mishra", "pt-sudarshan-mishra", "Faculty", "BPT, MPT"],
  ["Dr Bharat Singh", "dr-bharat-singh", "Faculty", "MBBS"],
  ["Dr Pop Singh", "dr-pop-singh", "Faculty", "MBBS"],
  ["Dr Bhupender Yadav", "dr-bhupender-yadav", "Faculty", "MBBS"],
  ["Dr Varnit Aggarwal", "dr-varnit-aggarwal", "Faculty", "BDS"],
  ["Dr Amit Dahiya", "dr-amit-dahiya", "Faculty", "MBBS"],
  ["Dr Anshul Saini", "dr-anshul-saini", "Faculty", "MBBS"],
  ["Mr Mahesh Yadav", "mr-mahesh-yadav", "Faculty", "MMLT"],
  ["Mr Dhiraj Jha", "mr-dhiraj-jha", "Faculty", "MOT"],
  ["Mrs Roshni Yadav", "mrs-roshni-yadav", "Faculty", "GNM, BSc Nursing"],
  ["Mrs Rohini", "mrs-rohini", "Faculty", "ANM, Nursing Educator"],
  ["Mr Neeraj Yadav", "mr-neeraj-yadav", "Faculty", "BMLT"],
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
    title: "Reception and Welcome Area",
    imageUrl: "/images/reception-look.webp",
    altText: "Reception area of Vidyadeep Paramedical College",
    featured: true,
  },
  {
    title: "Campus Identity",
    imageUrl: "/images/logo.png",
    altText: "Vidyadeep Paramedical College logo",
    featured: true,
  },
];

export const siteContentSeed = [
  {
    section: "about-preview",
    title: "A future-ready campus for paramedical excellence",
    body: "Vidyadeep Paramedical College is built to prepare the next generation of healthcare professionals through industry-aligned courses, disciplined training, and a premium learning environment in Gurugram.",
  },
  {
    section: "about-page",
    title: "History, vision, and healthcare-focused growth",
    body: "Vidyadeep Paramedical College was established with a mission to bridge academic ambition and clinical employability. The institution combines modern infrastructure, experienced faculty, and career-first planning to nurture skilled professionals for hospitals, clinics, diagnostics centres, and global healthcare opportunities.",
  },
];
