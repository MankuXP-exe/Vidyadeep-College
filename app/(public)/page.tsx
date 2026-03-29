import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, GraduationCap, MapPin, Phone, Award, Landmark, Building2, BriefcaseBusiness, Network } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { CourseCard } from "@/components/course-card";
import { FacultyCard } from "@/components/faculty-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { contactDetails, highlights } from "@/lib/data";
import { getContent, getCourses, getFaculty, getGallery, getTestimonials } from "@/lib/site";

export default async function HomePage() {
  const [courses, faculty, reviews, aboutPreview] = await Promise.all([
    getCourses(),
    getFaculty(),
    getTestimonials(),
    getContent("about-preview"),
  ]);

  return (
    <div className="pb-20">
      <section className="container pt-10 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <FadeIn className="space-y-8">
            <Badge>Admissions Open 2026</Badge>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Build Your Paramedical Career with Vidyadeep Paramedical Institute
              </h1>
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
                A premium academic campus for future nurses, therapists, and paramedical professionals, designed
                with modern learning spaces, doctor-led mentorship, and placement-first training.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/apply-online">Apply Now</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/courses">View Courses</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["UGC Aligned Pathways", "UGC aligned programs"],
                ["Doctor-led Faculty", "Students are trained not only in technical competencies but also in patient care, ethics, and professional responsibilities."],
                ["Placement Focused", "This institute actively builds connections with hospitals, diagnostic centers, and healthcare organizations to create placement opportunities for students."],
              ].map((item) => (
                <Card key={item[0]} className="p-5">
                  <div className="text-sm font-semibold text-slate-100">{item[0]}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">{item[1]}</div>
                </Card>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-2 shadow-glow">
              <div className="relative aspect-square md:aspect-[3/4] xl:aspect-[4/5] overflow-hidden rounded-[28px]">
                <Image
                  src="/images/hero-image.jpg"
                  alt="Vidyadeep campus reception"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e2a78] via-transparent to-transparent opacity-90" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="container mt-24">
        <FadeIn className="text-center sm:text-left">
          <Badge>Affiliations</Badge>
          <h2 className="mt-4 font-display text-4xl text-white">Affiliations & Recognition</h2>
        </FadeIn>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Affiliated to Asian International University", icon: GraduationCap },
            { title: "Affiliated to Pt. B.D. Sharma University, Haryana", icon: Landmark },
            { title: "Affiliated to Lingaya’s University, Faridabad", icon: Award },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="flex h-full items-center gap-4 p-6">
                  <div className="rounded-2xl bg-white/10 p-3 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="font-semibold text-white">{item.title}</div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="container mt-20 md:mt-32 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeIn>
          <Badge variant="secondary">About Vidyadeep</Badge>
          <h2 className="mt-4 font-display text-4xl text-white">{aboutPreview?.title}</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-lg leading-8 text-slate-300">{aboutPreview?.body}</p>
        </FadeIn>
      </section>


      <section className="container mt-20 md:mt-32 space-y-10">
        <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge>Programs</Badge>
            <h2 className="mt-4 font-display text-4xl text-white">Premium diploma and degree pathways</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/courses">Explore All Courses</Link>
          </Button>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {courses.slice(0, 6).map((course, index) => (
            <FadeIn key={course.slug} delay={index * 0.05}>
              <CourseCard course={course} />
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container mt-24 space-y-8">
        <FadeIn>
          <Badge variant="secondary">College Highlights</Badge>
          <h2 className="mt-4 font-display text-4xl text-white">Academic design built around employability</h2>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={index * 0.05}>
                <Card className="h-full p-6">
                  <Icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="container mt-24 space-y-8">
        <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge>Faculty</Badge>
            <h2 className="mt-4 font-display text-4xl text-white">Doctor-led Faculty</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Students are trained not only in technical competencies but also in patient care, ethics, and professional responsibilities.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/faculty">Meet the Faculty</Link>
          </Button>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {faculty.slice(0, 4).map((member, index) => (
            <FadeIn key={member.slug} delay={index * 0.05}>
              <FacultyCard member={member} />
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container mt-24 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <FadeIn>
          <Card className="h-full p-8">
            <Badge>Testimonials</Badge>
            <div className="mt-8 grid gap-6">
              {reviews.map((review, index) => (
                <div key={review.studentName + index} className="rounded-[24px] bg-white/10 p-5">
                  <div className="text-lg font-medium text-slate-100">&ldquo;{review.quote}&rdquo;</div>
                  <div className="mt-4 text-sm font-semibold text-primary">{review.studentName}</div>
                  <div className="text-sm text-slate-400">{review.course}</div>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Card className="h-full p-8">
            <Badge variant="secondary">Admissions</Badge>
            <h3 className="mt-4 font-display text-3xl text-white">Upcoming batch starts</h3>
            <div className="mt-8 space-y-4">
              {["1 June", "1 August"].map((date) => (
                <div
                  key={date}
                  className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 text-white shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <CalendarDays className="h-6 w-6 text-white" />
                  <span className="text-xl font-bold tracking-tight">{date}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-4 text-sm text-slate-300">
              <p className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-secondary" /> Fast-track counselling available
              </p>
              <p className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-secondary" /> Diploma and degree admissions open
              </p>
            </div>
            <Button asChild size="lg" className="mt-8 w-full">
              <Link href="/apply-online">Start Application</Link>
            </Button>
          </Card>
        </FadeIn>
      </section>

      <section className="container mt-24 space-y-8">
        <FadeIn className="text-center sm:text-left">
          <Badge>Placements</Badge>
          <h2 className="mt-4 font-display text-4xl text-white">Placement Focused</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            This institute actively builds connections with hospitals, diagnostic centers, and healthcare organizations to create placement opportunities for its students.
          </p>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { title: "Hospital Tie-ups", icon: Building2 },
            { title: "Job Support", icon: BriefcaseBusiness },
            { title: "Healthcare Network", icon: Network },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <Card className="flex items-center gap-4 p-6">
                  <div className="rounded-2xl bg-white/10 p-3 text-secondary">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </section>


      <section className="container mt-24">
        <FadeIn>
          <Card className="grid gap-10 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div>
              <Badge variant="secondary">Contact</Badge>
              <h2 className="mt-4 font-display text-4xl text-white">Visit the campus in Gurugram</h2>
              <div className="mt-8 space-y-4 text-slate-300">
                <div className="flex gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-primary" /> <span>{contactDetails.address.join(", ")}</span>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-1 h-5 w-5 text-primary" /> <span>{contactDetails.phones.join(" / ")}</span>
                </div>
              </div>
              <Button asChild className="mt-8">
                <Link href="/contact">
                  Full Contact Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <iframe title="College map" src={contactDetails.mapEmbed} className="min-h-[320px] w-full rounded-[28px] border-0" loading="lazy" />
          </Card>
        </FadeIn>
      </section>
    </div>
  );
}
