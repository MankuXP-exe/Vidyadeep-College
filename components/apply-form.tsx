"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { applySchema } from "@/lib/validations";
import { defaultCourses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FormData = {
  name: string;
  phone: string;
  email: string;
  course: string;
  message?: string;
};

export function ApplyForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      course: defaultCourses[0]?.title,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Unable to submit application");
      }

      toast.success("Application submitted successfully.");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your full name" {...register("name")} />
          {errors.name ? <p className="text-xs text-red-600">{errors.name.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="Enter your phone number" {...register("phone")} />
          {errors.phone ? <p className="text-xs text-red-600">{errors.phone.message}</p> : null}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" {...register("email")} />
          {errors.email ? <p className="text-xs text-red-600">{errors.email.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label>Course Selection</Label>
          <Select value={watch("course")} onValueChange={(value) => setValue("course", value, { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {defaultCourses.map((course) => (
                <SelectItem key={course.slug} value={course.title}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.course ? <p className="text-xs text-red-600">{errors.course.message}</p> : null}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Tell us about your academic goals" {...register("message")} />
      </div>
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
