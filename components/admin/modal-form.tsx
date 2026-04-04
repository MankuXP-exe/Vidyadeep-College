"use client";

import { useState, type ReactNode } from "react";
import { useAdminTheme } from "./theme-provider";
import { X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ open, onClose, title, description, children, maxWidth = "max-w-lg" }: ModalProps) {
  const { theme } = useAdminTheme();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className={`relative w-full rounded-2xl border p-6 shadow-2xl ${maxWidth} ${
              theme === "dark"
                ? "border-white/[0.08] bg-[#141b2d]"
                : "border-slate-200 bg-white"
            }`}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className={`absolute right-4 top-4 rounded-lg p-1.5 transition-colors ${
                theme === "dark"
                  ? "text-slate-500 hover:bg-white/[0.06] hover:text-white"
                  : "text-slate-400 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="mb-5">
              <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {title}
              </h2>
              {description && (
                <p className={`mt-1 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  {description}
                </p>
              )}
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface ConfirmDeleteProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}

export function ConfirmDelete({ open, onClose, onConfirm, title = "Delete Item", message = "Are you sure you want to delete this item? This action cannot be undone.", loading = false }: ConfirmDeleteProps) {
  const { theme } = useAdminTheme();

  return (
    <Modal open={open} onClose={onClose} title="" maxWidth="max-w-sm">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15">
          <AlertTriangle className="h-7 w-7 text-red-500" />
        </div>
        <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          {title}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
          {message}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
              theme === "dark"
                ? "bg-white/[0.06] text-slate-300 hover:bg-white/[0.1]"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

interface FormFieldConfig {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "select";
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
}

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  fields: FormFieldConfig[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onSubmit: () => void;
  loading?: boolean;
  submitLabel?: string;
}

export function ModalForm({
  open,
  onClose,
  title,
  description,
  fields,
  values,
  onChange,
  onSubmit,
  loading = false,
  submitLabel = "Save",
}: ModalFormProps) {
  const { theme } = useAdminTheme();

  const inputClass = `w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all ${
    theme === "dark"
      ? "bg-white/[0.04] text-white placeholder-slate-500 focus:bg-white/[0.07] focus:ring-1 focus:ring-indigo-500/40"
      : "bg-slate-100 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-indigo-500/40 border border-slate-200"
  }`;

  return (
    <Modal open={open} onClose={onClose} title={title} description={description} maxWidth="max-w-xl">
      <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-1">
        {fields.map((field) => (
          <div key={field.name}>
            <label className={`mb-1.5 block text-xs font-medium ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}>
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                rows={3}
                value={values[field.name] ?? ""}
                onChange={(e) => onChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={`${inputClass} resize-none`}
              />
            ) : field.type === "checkbox" ? (
              <label className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm cursor-pointer ${
                theme === "dark"
                  ? "bg-white/[0.04] text-slate-300"
                  : "bg-slate-100 text-slate-700 border border-slate-200"
              }`}>
                <input
                  type="checkbox"
                  checked={Boolean(values[field.name])}
                  onChange={(e) => onChange(field.name, e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500"
                />
                Enabled
              </label>
            ) : field.type === "select" ? (
              <select
                value={values[field.name] ?? ""}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={inputClass}
              >
                <option value="">Select...</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type === "number" ? "number" : "text"}
                value={values[field.name] ?? ""}
                onChange={(e) => onChange(field.name, field.type === "number" ? Number(e.target.value) : e.target.value)}
                placeholder={field.placeholder}
                className={inputClass}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
            theme === "dark"
              ? "bg-white/[0.06] text-slate-300 hover:bg-white/[0.1]"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-50"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </Modal>
  );
}
