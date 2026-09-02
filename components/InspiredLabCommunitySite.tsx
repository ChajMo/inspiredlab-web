"use client";

import { TriviaCard } from "@/components/TriviaCard";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { FaTiktok } from "react-icons/fa";
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  Mail,
  MapPin,
  Calendar,
  ExternalLink,
  Sparkles,
  BookOpen,
  Users,
  HandHeart,
  Leaf,
  MessagesSquare,
  MessageCircle,
  Search,
  Globe,
  Instagram,
  Facebook,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Recycle,
} from "lucide-react";

const BRAND = {
  name: "InspirED Lab",
  tagline: "Science education rooted in community",
  blurb: [
  "InspirED Lab is a nonprofit organization devoted to connecting classrooms, communities and Caribbean culture to real-world science.",
  "Whether we’re performing hands-on research experiments with students or engaging in discussions about science and how it impacts us, we seek to make meaningful links between scientific inquiry and everyday life. We believe science is for everyone, and every person should feel empowered to advance the sustainable development of their communities and country."
],
  location: "Saint Kitts & Nevis",
};

const LINKS = {
  email: "inspiredlab.kn@gmail.com",
  donate: "#donate",
  volunteer: "#get-involved",
  newsletter: "#newsletter",
  instagram: "https://www.instagram.com/inspiredlab.kn/",
  tiktok: "https://www.tiktok.com/@inspiredlab.kn",
  facebook: "https://www.facebook.com/inspiredlab.kn",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionHeader({
  eyebrow,
  title,
  desc,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "text-center" : "text-left"
      )}
    >
      {eyebrow ? (
        <div className={cn(align === "center" ? "justify-center" : "", "flex")}>
          <Badge
            className="rounded-full bg-white text-black border border-border"
          >
            {eyebrow}
          </Badge>
        </div>
      ) : null}
      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight",
          align === "center" ? "mx-auto" : ""
        )}
      >
        {title}
      </h2>
      {desc ? (
        <p
          className={cn(
            "text-muted-foreground text-base sm:text-lg max-w-2xl",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function TopNav() {
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () => [
      { label: "Programs", href: "#programs" },
      { label: "Teacher Resources", href: "#teacher-resources" },
      { label: "About", href: "#about" },
      { label: "Resources", href: "#resources" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  return (
    <div className="sticky top-0 z-50 border-b backdrop-blur bg-gradient-to-b from-[oklch(var(--brand-sky)/0.28)] to-[oklch(var(--brand-sky)/0.08)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
            <Image
            src="/InspiredLab.png"
            alt="InspirED Lab Logo"
            width={100}
            height={100}
            className="rounded-xl"
            />
          <div className="leading-tight">
            <div className="font-semibold">{BRAND.name}</div>
            <div className="text-xs text-muted-foreground">
              Community Science
            </div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              {it.label}
            </a>
          ))}
          <Button
            asChild
            className="rounded-xl bg-[oklch(var(--brand-orange))] text-white hover:bg-[oklch(var(--brand-orange)/0.1)]"
          >
            <a href={LINKS.donate}>
              <Heart className="h-4 w-4 mr-2" /> Donate
            </a>
          </Button>
        </div>

        <div className="md:hidden">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            Menu
          </Button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" className="md:hidden border-t">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 grid gap-2">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="py-2 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {it.label}
              </a>
            ))}
            <div className="pt-2">
              <Button asChild className="w-full rounded-xl">
                <a href={LINKS.donate}>
                  <Heart className="h-4 w-4 mr-2" /> Donate
                </a>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Decorative background blobs for warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-[oklch(var(--brand-sky)/0.15)] blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-[400px] w-[400px] rounded-full bg-[oklch(var(--brand-sky)/0.10)] blur-3xl" />
        <Leaf
          className="absolute bottom-8 right-8 h-32 w-32 text-[oklch(var(--brand-sky)/0.08)] rotate-12"
          strokeWidth={0.5}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-7"
          >
            {/* Location pill with flag emoji for warmth */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1 text-sm font-medium"
              >
                🇰🇳 {BRAND.location}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-sm"
              >
                Students · Educators · Scientists
              </Badge>
            </div>

            {/* Headline — bigger, bolder impact */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
                Science education{" "}
                <span className="text-[oklch(var(--primary))]">
                  rooted in community
                </span>
              </h1>
              <div className="h-1.5 w-20 rounded-full bg-primary" />
            </div>

            {/* Blurb */}
            <div className="space-y-4 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              {BRAND.blurb.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-2xl text-base px-6 shadow-md hover:shadow-lg transition-shadow"
              >
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-2xl text-base px-6"
              >
              </Button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-5 text-sm text-muted-foreground pt-1">
              {[
                { icon: <Users className="h-4 w-4 text-primary" />, label: "Community-centered" },
                { icon: <Search className="h-4 w-4 text-primary" />, label: "Curiosity-driven" },
                { icon: <Globe className="h-4 w-4 text-primary" />, label: "Globally minded" },
                { icon: <Leaf className="h-4 w-4 text-primary" />, label: "Caribbean-rooted" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  {icon}
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Card panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* What we do card - COMPLETED */}
            <Card className="rounded-3xl shadow-md border-[oklch(var(--brand-sky)/0.3)] bg-[oklch(var(--brand-sky)/0.08)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  What we do
                </CardTitle>
                <CardDescription>
                  Here are some ways we show up for the community.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    icon: <BookOpen className="h-5 w-5 text-primary" />,
                    title: "Design culturally responsive STEM curricula",
                    desc: "We create learning experiences designed for Caribbean contexts, connecting subject matter to real-world applications.",
                  },
                  {
                    icon: <MessagesSquare className="h-5 w-5 text-primary" />,
                    title: "Facilitate discourse around science",
                    desc: "We create spaces where people can discuss, ask questions, and be curious about science in their lives.",
                  },
                  {
                    icon: <Users className="h-5 w-5 text-primary" />,
                    title: "Co-creation with community",
                    desc: "We collaborate with teachers, students, NGOs and more to create engaging and impactful initiatives.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-background/60 border flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm leading-tight">{item.title}</div>
                      <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

                        {/* Upcoming event card - Enhanced */}
            <Card className="rounded-3xl shadow-sm border-[oklch(var(--brand-sky)/0.25)] bg-gradient-to-br from-[oklch(var(--brand-sky)/0.06)] to-[oklch(var(--brand-sky)/0.12)]">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-primary mb-1">
                      Upcoming Event
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      The 2026 Global Big Day is approaching! Get ready to log your bird sightings.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>October 10, 2026</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Previous event card */}
            <Card className="rounded-3xl shadow-sm border-[oklch(var(--brand-sky)/0.25)] bg-white">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Recycle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-primary mb-1">
                      Previous Event
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      Conaree Beach Cleanup — 7 volunteers removed 994 pieces of trash (about 155 lbs) along 0.9 miles of coastline.
                    </p>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <img
                        src="/BeachCleanup/group.jpg"
                        alt="Volunteers at the Conaree Beach Cleanup"
                        className="h-16 w-full rounded-xl object-cover"
                      />
                      <img
                        src="/BeachCleanup/debris.jpg"
                        alt="Debris collected during the Conaree Beach Cleanup"
                        className="h-16 w-full rounded-xl object-cover"
                      />
                      <img
                        src="/BeachCleanup/bags.jpg"
                        alt="Bagged trash from the Conaree Beach Cleanup"
                        className="h-16 w-full rounded-xl object-cover"
                      />
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      Plastic bottles (301) and plastic bottle caps (128) were the most common finds — a reminder of how much single-use plastic still reaches our shores.
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>July 11, 2026 · Conaree</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


function ImageCarousel({
  images,
  altBase,
}: {
  images: string[];
  altBase: string;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = images.length;

  useEffect(() => {
    if (total <= 1 || paused || open) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 3500);
    return () => clearInterval(id);
  }, [total, paused, open]);

  // Optional: reset index if the images array changes
  const imageKey = images.join("|");
  useEffect(() => {
    setIndex(0);
  }, [imageKey]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const currentSrc = images[index];

  return (
    <div
      className="mt-2 overflow-hidden rounded-2xl border bg-[oklch(var(--brand-sky)/0.10)] shadow-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* This makes the carousel the SAME HEIGHT as your video */}
      <div className="relative aspect-video w-full">
        {/* Click-to-expand modal */}
        {mounted ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="absolute inset-0 flex items-center justify-center"
                aria-label="Open image"
              >
                <img
                  src={currentSrc}
                  alt={`${altBase} photo ${index + 1}`}
                  className="h-full w-full object-contain p-2 cursor-zoom-in"
                  loading="lazy"
                />
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl p-0 overflow-hidden">
              <VisuallyHidden>
                <DialogTitle>{`${altBase} photo ${index + 1}`}</DialogTitle>
              </VisuallyHidden>

              <div className="bg-black/90 p-4 flex items-center justify-center">
                <img
                  src={currentSrc}
                  alt={`${altBase} photo ${index + 1}`}
                  className="max-h-[80vh] w-full object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={currentSrc}
              alt={`${altBase} photo ${index + 1}`}
              className="h-full w-full object-contain p-2"
              loading="lazy"
            />
          </div>
        )}

        {/* Left arrow */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 border shadow flex items-center justify-center"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </button>
        )}

        {/* Right arrow */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 border shadow flex items-center justify-center"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </button>
        )}

        {/* Optional: small counter */}
        {total > 1 && (
          <div className="absolute bottom-2 right-2 rounded-full bg-background/90 border px-2 py-0.5 text-xs text-muted-foreground">
            {index + 1}/{total}
          </div>
        )}
      </div>
    </div>
  );
}



function Programs() {
  const programs = useMemo(
    () => [
      {
        title: "InspirED Conversations",
        eyebrow: "InspirED Media",
        desc: "We engage with community members from diverse backgrounds to explore how science shows up in daily life.",
        video: "https://www.youtube.com/embed/xz4Y7-BAQdI",
        cta: { label: "Check out our conversations!", href: "https://www.youtube.com/@InspirEDLab_kn" },
      },
      {
        title: "Birds of SKN",
        eyebrow: "Local ecology",
        desc: "Community storytelling and field observation to celebrate local birds and build ecological literacy.",
        images: [
          "/BirdsofSKN/Brown Pelican_Week 1/2.png",
          "/BirdsofSKN/Brown Pelican_Week 1/3.png",
          "/BirdsofSKN/Brown Pelican_Week 1/4.png",
          "/BirdsofSKN/Brown Pelican_Week 1/5.png",
          "/BirdsofSKN/Brown Pelican_Week 1/6.png",
          "/BirdsofSKN/Brown Pelican_Week 1/7.png",
        ],
        cta: { 
          label: "Explore spotlights", 
          href: "https://www.facebook.com/hashtag/birdsofskn" 
        },
      },
      {
        title: "DNA Barcoding",
        eyebrow: "Hands-on research",
        desc: "Intro experiences that connect classroom lessons on DNA and genetics to local biodiversity.",
        video: "/video/dna-barcoding.mp4",
        cta: { 
          label: "Check it out!", 
          href: "https://www.instagram.com/reel/C9bDPIZoq5a/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" 
        },
      },
    ],
    []
  );

  return (
    <section id="programs" className="relative bg-[oklch(var(--brand-sky)/0.10)] py-20 sm:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[oklch(var(--brand-coral)/0.08)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[oklch(var(--brand-sky)/0.12)] rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Programs"
          title="Science experiences for all ages"
          desc="Our programs are designed to be welcoming, hands-on, and rooted in local culture — with materials and methods that work in real-world settings."
        />

        <div className="mt-12 sm:mt-16 grid md:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.1,
                ease: [0.21, 0.45, 0.27, 0.9]
              }}
              className="h-full"
            >
              <Card className="group h-full flex flex-col rounded-3xl border-2 border-transparent hover:border-[oklch(var(--brand-sky)/0.2)] hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <Badge
                      className="rounded-full bg-[oklch(var(--brand-sky)/0.15)] text-[oklch(var(--brand-orange))] border-0 font-medium px-3 py-1 text-xs"
                    >
                      {p.eyebrow}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl sm:text-2xl leading-tight group-hover:text-[oklch(var(--brand-orange))] transition-colors">
                      {p.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {p.desc}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col space-y-5">
                  {/* Video Section */}
                  {p.video && (
                    <div className="rounded-2xl overflow-hidden shadow-md bg-black ring-1 ring-black/5">
                      <div className="aspect-video w-full">
                        {p.video.includes("youtube.com") || p.video.includes("youtu.be") ? (
                          <iframe
                            src={p.video}
                            title={p.title}
                            className="h-full w-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            controls
                            preload="metadata"
                            className="h-full w-full"
                            style={{ objectFit: "cover" }}
                          >
                            <source src={p.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Image Carousel */}
                  {p.images && p.images.length > 0 && (
                    <div className="rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5">
                      <ImageCarousel images={p.images} altBase={p.title} />
                    </div>
                  )}

                  {/* CTA - Pushed to bottom */}
                  <div className="mt-auto pt-2">
                    {p.cta && (
                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full rounded-2xl h-11 font-medium group/btn hover:bg-[oklch(var(--brand-sky)/0.08)] hover:text-[oklch(var(--brand-sky))] hover:border-[oklch(var(--brand-sky)/0.3)] transition-all"
                      >
                        <a href={p.cta.href} target={p.cta.href.startsWith('http') ? '_blank' : undefined} rel={p.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                          {p.cta.label} 
                          <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>   
    </section>
  );
}


function TeacherResources() {
  const teacherResources = useMemo(
    () => [
      {
        title: "SOS! Inquiry Planning Template",
        category: "Inquiry-Based Learning",
        author: "Hilary Ferguson Morton",
        desc: "A simple template for quick inquiry-based forward planning across three categories — Strategy, Object (to think with), and Space. Use for one class, or add rows to plan multiple classes per week.",
        links: [
          {
            label: "Open Google Doc template",
            href: "https://docs.google.com/document/d/12LlExF2tC-QiGe6livEZed4bWsJS1srM/copy",
          },
        ],
      },
      {
        title: "Community Partner Letter Bundle",
        category: "Community Engagement",
        author: "Hilary Ferguson Morton",
        desc: "Letter templates for connecting with businesses, organizations, or individuals whose work relates to what's being taught in class — plus a parent letter with a detachable permission slip.",
        links: [
          {
            label: "Community Partnership Letter (Letter size)",
            href: "https://docs.google.com/document/d/1k05U7bwcuWwVWxmO0KSF_y_FEDXxVI0O/copy",
          },
          {
            label: "Letter to Parents (Legal size)",
            href: "https://docs.google.com/document/d/1oXYzxh6dBKd1zYZxowUa6GqDJ2r6ey6p/copy",
          },
        ],
      },
      {
        title: "Group Accountability Form",
        category: "Project Based Learning",
        author: "Hilary Ferguson Morton",
        desc: "Lets each group member assess peers and themselves on their role and contribution, so trends can be tracked individually and grades assigned accordingly.",
        links: [
          {
            label: "Open Google Doc template",
            href: "https://docs.google.com/document/d/1tfHMuVri7k3GFV3Z6Bqq-3VF6CUO8LiqFOcOOEXcFB0/copy",
          },
        ],
      },
      {
        title: "PBL Brainstormer",
        category: "Project Based Learning",
        author: "Hilary Ferguson Morton",
        desc: "A starting point for planning a Project-Based Learning unit — the challenge, big idea, curricular objectives, assessments, milestones, and possible community collaborations, all on one page.",
        links: [
          {
            label: "Open fillable PDF",
            href: "https://drive.google.com/file/d/1NxaRF2-ke8yNlZpyfW7bHfhC8GzSL70I/view?usp=sharing",
          },
        ],
      },
      {
        title: "Osmosis Inquiry Scaffold",
        category: "Inquiry-Based Learning",
        author: "Hilary Ferguson Morton",
        desc: "A graphic organizer to scaffold student thinking around the concept of osmosis.",
        links: [
          {
            label: "Open Canva template",
            href: "https://www.canva.com/design/DAFvl0WcaHM/VQ70mLjbL-ekOXUP3dXPrA/view?utm_content=DAFvl0WcaHM&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview",
          },
        ],
      },
      {
        title: "Osmosis Kinesthetic Activity",
        category: "Whole Body Learning",
        author: "Hilary Ferguson",
        desc: "A whole-body classroom activity using chairs and movement to model a selectively permeable membrane and osmosis — a good engage activity for the topic.",
        links: [
          {
            label: "Open Google Doc template",
            href: "https://docs.google.com/document/d/1OAuQ9U3RbIHH1geDsILe20s675anR4WWeEUcDhh2Ku4/copy",
          },
        ],
      },
    ],
    []
  );

  return (
    <section
      id="teacher-resources"
      className="relative bg-white py-20 sm:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="InspirED Lab Teacher Resources"
          title="Ready-to-use templates for your classroom"
          desc="Designs created by our community, for our community. All resources are free and editable — download, use, share, and adapt them to your needs."
        />

        <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {teacherResources.map((r) => (
            <Card
              key={r.title}
              className="group h-full flex flex-col rounded-3xl border-2 border-transparent hover:border-[oklch(var(--brand-sky)/0.2)] hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="space-y-3">
                <Badge className="w-fit rounded-full bg-[oklch(var(--brand-sky)/0.15)] text-[oklch(var(--brand-orange))] border-0 font-medium px-3 py-1 text-xs">
                  {r.category}
                </Badge>
                <div className="space-y-2">
                  <CardTitle className="text-lg sm:text-xl leading-tight group-hover:text-[oklch(var(--brand-orange))] transition-colors">
                    {r.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {r.desc}
                  </CardDescription>
                  {r.author && (
                    <div className="text-xs text-muted-foreground pt-1">
                      By {r.author}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-end space-y-2">
                {r.links.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="outline"
                    className="w-full rounded-2xl min-h-11 h-auto py-2.5 px-4 font-medium whitespace-normal text-sm leading-snug text-center hover:bg-[oklch(var(--brand-sky)/0.08)] hover:text-[oklch(var(--brand-sky))] hover:border-[oklch(var(--brand-sky)/0.3)] transition-all"
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <span>{link.label}</span>
                      <ExternalLink className="h-4 w-4 ml-2 shrink-0" />
                    </a>
                  </Button>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutVisionFaq() {
  const faq = [
    {
      q: "Who is InspirED Lab for?",
      a: "Students, educators, scientists and community partners — anyone who wants accessible science that connects to local life.",
    },
    {
      q: "Do you work only in Saint Kitts & Nevis?",
      a: "Our roots are in Saint Kitts & Nevis, and we want to collaborate across the Caribbean and with global partners when it strengthens local impact.",
    },
    {
      q: "How can a school partner with you?",
      a: "Send a message with your goals, age group, and timing. We'll propose a short pilot and a plan for materials, facilitation, and evaluation.",
    },
  ];

  const people = [
    {
      name: "Hilary Ferguson Morton, B.S., M.Ed.",
      role: "STEAM Educator • Learning Experience Designer",
      image: "/team/hilary.jpg",
      alt: "Hilary Ferguson Morton",
      bio: [
        "Hilary is a science educator with over a decade of experience in secondary school education. She completed her Master's in Instructional Technology and Media at Teachers College, Columbia University, with a focus on Culturally Relevant and Responsive Science Education.",
        "Her teaching philosophy is rooted in dialogue and co-empowerment—allowing students to express, through multiple ways, what they already bring to the classroom and guiding them in making connections to the science of their everyday life experiences. She believes in creating learning spaces that engage and inspire persons not merely to acquire knowledge, but to use that knowledge to solve problems of personal and community relevance. She refers to this as learning that matters.",
      ],
    },
    {
      name: "Chad Morton, B.S., Ph.D.",
      role: "Scientist • STEM Educator • STEM Advocate",
      image: "/team/chad.jpg",
      alt: "Chad Morton",
      bio: [
        "Chad is a scientist, science educator, and advocate for equity in STEM. After earning his Ph.D. in Bioscience from The Rockefeller University, he expanded his work beyond the bench to focus on a question that comes up in every community: who gets to access science, and who gets left out. He is committed to making scientific ideas understandable, relevant, and genuinely welcoming, without the jargon or gatekeeping that too often puts people on the outside looking in.",
        "As co-founder of InspirED Lab, Chad designs community-rooted science learning experiences that center representation, curiosity, and real opportunity. He believes people from small islands and big cities alike deserve meaningful ways to explore science, build skills, and see themselves as part of it. His goal is simple: to reimagine what inclusive, community-based science education can be and to help make it real.",
      ],
    },
  ] as const;

  return (
    <section id="about" className="relative bg-[oklch(var(--brand-sky)/0.10)] py-20 sm:py-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 w-96 h-96 bg-[oklch(var(--brand-coral)/0.06)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-[oklch(var(--brand-sky)/0.08)] rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="About"
          title="How we show up"
          desc="InspirED Lab brings together science, culture, and community through an approach that is collaborative, grounded, and deeply connected to place."
        />

        <div className="mt-12 sm:mt-16 grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN - Approach & FAQ */}
          <div className="space-y-6 lg:space-y-8">
            {/* Our Approach Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <Card className="group rounded-3xl bg-gradient-to-br from-white to-[oklch(var(--brand-sky)/0.08)] border border-[oklch(var(--brand-sky)/0.15)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[oklch(var(--brand-sky)/0.2)] flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-[oklch(var(--brand-sky))]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-[oklch(var(--brand-navy))]">
                      Our approach
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Our approach to STEAM education is deeply community-centered, culturally grounded, and action-oriented.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Rather than treating science as something abstract or confined to laboratories, we connect it directly to everyday life in Saint Kitts & Nevis and the wider Caribbean. Whether through backyard experiments using familiar materials, biodiversity storytelling about local birds, or hands-on DNA barcoding projects, we aim to make science feel relevant, accessible, and empowering.
                  </p>
                  <p>
                    Our philosophy blends academic rigor with cultural relevance—creating learning spaces where curiosity is nurtured, dialogue is encouraged, and people of all ages see themselves as capable contributors to sustainable development. At our core, InspirED Lab treats science not just as knowledge to be learned, but as a tool communities can use to understand their world and shape their future.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <Card className="group rounded-3xl bg-gradient-to-br from-white to-[oklch(var(--brand-sky)/0.08)] border border-[oklch(var(--brand-sky)/0.15)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[oklch(var(--brand-sky)/0.2)] flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-[oklch(var(--brand-sky))]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 1.918-2 3.522-2 2.21 0 4 1.567 4 3.5 0 1.355-.88 2.53-2.167 3.118-.85.388-1.333.915-1.333 1.632V16m.01 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-[oklch(var(--brand-navy))]">
                      FAQ
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Quick answers for potential partners and community members.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faq.map((f) => (
                    <div
                      key={f.q}
                      className="rounded-2xl border bg-white/80 p-4 hover:bg-white transition-colors"
                    >
                      <div className="font-medium">{f.q}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {f.a}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Team */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="group rounded-3xl bg-gradient-to-br from-white to-[oklch(var(--brand-sky)/0.08)] border border-[oklch(var(--brand-sky)/0.15)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[oklch(var(--brand-sky)/0.2)] flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-[oklch(var(--brand-sky))]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5V9H2v11h5m10 0v-3a3 3 0 00-3-3H10a3 3 0 00-3 3v3m10 0H7m8-11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-[oklch(var(--brand-navy))]">
                      Meet the people shaping the vision
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    InspirED Lab is co-founded and led by educators committed to culturally relevant, community-rooted science.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {people.map((p) => (
                    <div
                      key={p.name}
                      className="rounded-3xl border bg-white/80 p-5 shadow-sm"
                    >
                      <div className="space-y-5">
                        <div className="grid gap-5 md:grid-cols-[160px_1fr] md:items-center">
                          <div className="flex justify-center md:justify-start">
                            <div className="relative h-40 w-40 overflow-hidden rounded-3xl border bg-muted shadow-sm">
                              <Image
                                src={p.image}
                                alt={p.alt}
                                fill
                                sizes="160px"
                                className="object-cover"
                                priority={p.name.startsWith("Hilary")}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="text-xl sm:text-2xl font-semibold tracking-tight">
                              {p.name}
                            </div>
                            <div className="h-1 w-16 bg-primary rounded-full"></div>
                            <div className="text-sm text-muted-foreground">
                              {p.role}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                          {p.bio.map((para) => (
                            <p key={para}>{para}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Resources() {
  const resources = useMemo(
    () => [
      {
        title: "STRAWS (Science, Technology, Arts and Work Study)",
        desc: "Community-based participatory research and STEAM outreach.",
        href: "https://www.noshortstraws.com/",
        audience: "Community",
      },
      {
        title: "The OECS Learning Hub",
        desc: "A comprehensive platform for teachers and educators across the Organisation of Eastern Caribbean States.",
        href: "https://oecslearninghub.org/",
        audience: "Educators",
      },
      {
        title: "RockEDU Science Outreach",
        desc: "Curated science resources created by and for scientists and educators to engage in science as a justice-centered process.",
        href: "https://rockedu.rockefeller.edu/resources/",
        audience: "Educators",
      },
      {
        title: "PhET Interactive Simulations",
        desc: "Free physics, chemistry, biology, and math simulations for inquiry-based learning.",
        href: "https://phet.colorado.edu/",
        audience: "Educators",
      },
      {
        title: "NASA STEM Resources",
        desc: "Lesson plans, climate data, engineering challenges, and real mission science.",
        href: "https://www.nasa.gov/stem",
        audience: "Educators",
      },
      {
        title: "NOAA Education",
        desc: "Oceans, weather, climate, and coastal science—perfect for Caribbean context.",
        href: "https://www.noaa.gov/education",
        audience: "Educators",
      },
      {
        title: "HHMI BioInteractive",
        desc: "High-quality biology films, data-driven lessons, and classroom resources.",
        href: "https://www.biointeractive.org/",
        audience: "Educators",
      },
      {
        title: "iNaturalist",
        desc: "Citizen-science biodiversity platform for field observation and nature journaling.",
        href: "https://www.inaturalist.org/",
        audience: "Educators",
      },
      {
        title: "Khan Academy",
        desc: "Strong foundational courses in math, biology, chemistry, and physics.",
        href: "https://www.khanacademy.org/",
        audience: "Students",
      },
      {
        title: "Crash Course",
        desc: "Fast-paced concept overviews across science, history, and economics.",
        href: "https://www.youtube.com/user/crashcourse",
        audience: "Students",
      },
      {
        title: "Zooniverse",
        desc: "Participate in real research projects in astronomy, ecology, and more.",
        href: "https://www.zooniverse.org/",
        audience: "Students",
      },
      {
        title: "freeCodeCamp",
        desc: "Learn coding for data storytelling and digital tools.",
        href: "https://www.freecodecamp.org/",
        audience: "Students",
      },
      {
        title: "Our World in Data",
        desc: "Clear, accessible data visualizations on global health, climate, and development.",
        href: "https://ourworldindata.org/",
        audience: "Community",
      },
      {
        title: "PAHO",
        desc: "Trusted Caribbean-relevant public health guidance and resources.",
        href: "https://www.paho.org/",
        audience: "Community",
      },
    ],
    []
  );

  const [showAllResources, setShowAllResources] = useState(false);
  const visibleResources = showAllResources ? resources : resources.slice(0, 3);

  return (
    <section id="resources" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Resources"
          title="Free STEM learning and engagement resources"
          desc="Curated tools, platforms, and learning spaces that connect science to real-world experiences across the Caribbean and beyond."
        />

        {/* Resource Grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleResources.map((r) => (
            <Card
              key={r.title}
              className="group rounded-3xl bg-gradient-to-br from-white to-[oklch(var(--brand-sky)/0.08)] border border-[oklch(var(--brand-sky)/0.15)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full"
            >
              <CardHeader className="space-y-3">
                <Badge className="w-fit rounded-full bg-[oklch(var(--brand-sky)/0.15)] text-black border border-[oklch(var(--brand-sky)/0.25)]">
                  {r.audience}
                </Badge>

                <CardTitle className="text-base font-semibold text-[oklch(var(--brand-navy))]">
                  {r.title}
                </CardTitle>

                <CardDescription className="text-sm">
                  {r.desc}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button
                  variant="outline"
                  className="w-full rounded-2xl group-hover:bg-[oklch(var(--brand-sky)/0.15)] transition"
                  asChild
                >
                  <a href={r.href} target="_blank" rel="noopener noreferrer">
                    Visit resource
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expand / Collapse */}
        {resources.length > 3 && (
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() => setShowAllResources((prev) => !prev)}
            >
              {showAllResources ? "Show fewer" : "Explore more resources"}
            </Button>
          </div>
        )}

        {/* Trivia */}
        <div className="mt-14">
          <TriviaCard maxQuestions={10} />
        </div>
      </div>
    </section>
  );
}



function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-gradient-to-b from-[oklch(var(--brand-sky)/0.28)] text-primary-transition"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">

        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-3">
            <div className="text-lg font-semibold">{BRAND.name}</div>
            <div className="text-sm text-black/70 leading-relaxed">
              Science education rooted in community. Connecting real world science research to classrooms,
              culture, and everyday life.
            </div>
          </div>

          {/* Partners */}
          <div className="space-y-3">
            <div className="text-sm font-semibold uppercase tracking-wide text-black/80">
              Partners & Collaborators
            </div>

            <div className="space-y-2 text-sm">
              <a
                href="https://www.noshortstraws.com/"
                target="_blank"
                rel="noreferrer"
                className="block text-black/70 hover:text-[oklch(var(--brand-orange))]"
              >
                STRAWS (Science, Technology, Arts & Work Study)
              </a>

              <a
                href="https://rockedu.rockefeller.edu/"
                target="_blank"
                rel="noreferrer"
                className="block text-orange/70 hover:text-[oklch(var(--brand-orange))]"
              >
                RockEDU Science Outreach
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <div className="text-sm font-semibold uppercase tracking-wide text-black/80">
              Connect
            </div>

            <div className="space-y-2 text-sm">
              <a
                href={`mailto:${LINKS.email}`}
                className="block text-black/70 hover:text-black transition"
              >
                {LINKS.email}
              </a>

              <div className="flex items-center gap-4 pt-1">
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/70 hover:text-[oklch(var(--brand-orange))]"
                >
                  <Instagram className="h-4 w-4" />
                </a>

                <a
                  href={LINKS.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/70 hover:text-[oklch(var(--brand-orange))]"
                >
                  <FaTiktok className="h-4 w-4" />
                </a>

                <a
                  href={LINKS.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/70 hover:text-[oklch(var(--brand-orange))] transition"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/60">
          <div>
            © {year} {BRAND.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function InspiredLabCommunitySite() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <TopNav />

      <main className="flex-1">
        <Hero />
        <Programs />
        <TeacherResources />
        <AboutVisionFaq />
        <Resources />
      </main>

      <Footer />
    </div>
  );
}
