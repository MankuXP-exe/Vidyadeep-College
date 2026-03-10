import { z } from "zod";

export const applySchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(10).max(15),
  email: z.string().email(),
  course: z.string().min(2).max(120),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export const courseSchema = z.object({
  slug: z.string().min(2).max(160),
  title: z.string().min(2).max(160),
  category: z.string().min(2).max(60),
  shortDesc: z.string().min(10).max(300),
  overview: z.string().min(30).max(5000),
  eligibility: z.string().min(2).max(300),
  duration: z.string().min(2).max(120),
  careers: z.string().min(10).max(2000),
  icon: z.string().min(2).max(60),
  featured: z.boolean().optional().default(false),
});

export const facultySchema = z.object({
  name: z.string().min(2).max(160),
  slug: z.string().min(2).max(160),
  designation: z.string().min(2).max(160),
  qualifications: z.string().min(2).max(300),
  bio: z.string().max(3000).optional().or(z.literal("")),
  image: z.string().url().optional().or(z.literal("")),
  sortOrder: z.number().int().min(0).max(999).optional().default(0),
});

export const testimonialSchema = z.object({
  studentName: z.string().min(2).max(160),
  course: z.string().min(2).max(160),
  quote: z.string().min(10).max(1000),
  rating: z.number().int().min(1).max(5).default(5),
  featured: z.boolean().optional().default(true),
});

export const contentSchema = z.object({
  section: z.string().min(2).max(80),
  title: z.string().min(2).max(160),
  body: z.string().min(10).max(5000),
});
