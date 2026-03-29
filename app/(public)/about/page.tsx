import Image from "next/image";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/fade-in";
import { getContent } from "@/lib/site";

export default async function AboutPage() {
  const content = await getContent("about-page");

  return (
    <div id="gallery" className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
      <FadeIn className="text-center mb-12">
        <Badge>About College</Badge>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl text-white max-w-3xl mx-auto">
          History, vision, and growth built for healthcare excellence
        </h1>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
        <FadeIn>
          <Card className="p-6 md:p-8 border-white/10 bg-white/5 shadow-glow">
            <h2 className="font-display text-2xl sm:text-3xl text-white">{content?.title}</h2>
            <div className="mt-6 space-y-4 max-w-prose">
              <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                {content?.body}
              </p>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="p-6 md:p-8 border-white/10 bg-white/5 shadow-glow flex flex-col gap-10">
            <div className="space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl text-white">Our Vision</h3>
              <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                Our vision is not just to educate, but to transform lives. 
                Under the guidance of Vyomkesh Health and Educational Foundation, a government registered NGO committed to women empowerment and upliftment of rural students, the institute was established to bring hope where opportunities are limited.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl text-white">Our Mission</h3>
              <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                We believe doctors alone cannot transform healthcare. Paramedics are the backbone ensuring accurate diagnosis, patient care, emergency support, and smooth functioning of medical systems. 
                <br /><br />
                Our mission is to strengthen rural healthcare by creating skilled paramedics and bringing quality care to every village.
              </p>
            </div>
          </Card>
        </FadeIn>
      </div>

      <section id="gallery" className="mt-16 md:mt-24">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Campus Life & Gallery</h2>
          <p className="text-gray-400 mt-2">Real moments from our institute</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: "Student Group",
              url: "/images/student and teacher photo.jpg",
            },
            {
              title: "Holi Celebration",
              url: "/images/holi celebration.jpg",
            },
            {
              title: "Students Outdoor",
              url: "/images/students.jpg",
            },
            {
              title: "College Infrastructure",
              url: "/images/hero-image.jpg",
            },
            {
              title: "Activities & Trips",
              url: "/images/movie trip.jpg",
            },
          ].map((item, index) => (
            <FadeIn key={index} delay={index * 0.05}>
              <div className="group relative h-60 w-full overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-glass transition duration-300 hover:scale-105">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-sm font-medium text-white px-4 py-2 bg-black/50 rounded-full">{item.title}</span>
                </div>
              </div>
            </FadeIn>
          ))}
          
          <FadeIn delay={0.3}>
            <div className="group relative flex h-60 w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-glass transition duration-300 hover:scale-105">
              <div className="rounded-full bg-white/10 p-4 text-white transition-transform duration-300 group-hover:scale-110">
                <Play className="h-10 w-10 fill-white" />
              </div>
              <span className="mt-4 text-sm font-medium text-white">Campus Tour</span>
              <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
