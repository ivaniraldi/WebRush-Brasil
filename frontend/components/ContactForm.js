"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations";
import { Send, Loader2, CheckCircle2, ChevronDown } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const { language } = useLanguage();
  const t = translations[language];
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t.contact.errors?.name || "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = t.contact.errors?.email || "Valid email is required";
    if (!formData.service) newErrors.service = t.contact.errors?.service || "Please select a service";
    if (!formData.message.trim()) newErrors.message = t.contact.errors?.message || "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        "service_jjaz802", // Replace with your EmailJS Service ID
        "template_1fslz1g", // Replace with your EmailJS Template ID
        formRef.current,
        {
          publicKey: "ClntW7d3NjAsRXwOi", // Replace with your EmailJS Public Key
        }
      );
      setIsSubmitting(false);
      setSubmitted(true);
      let now = new Date();
      let time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setFormData({ name: "", email: "", phone: "", service: "", message: "", time });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      setIsSubmitting(false);
      console.error("EmailJS error:", error);
      setErrors({ submit: t.contact.errors?.submit || "Failed to send message. Please try again." });
    }
  };

  const serviceOptions = {
    webDev: t.contact.services?.webDev || "Web Development",
    marketing: t.contact.services?.marketing || "Digital Marketing",
    seo: t.contact.services?.seo || "SEO",
    other: t.contact.services?.other || "Other",
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-lg p-0 md:p-6 sm:p-8 rounded-2xl  border-0  border-gray-700/50">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-white font-heading tracking-tight">
        {t.contact.formTitle}
      </h2>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-500/10 border border-green-500/50 text-green-700 dark:text-green-300 p-4 sm:p-6 rounded-xl flex items-center space-x-2 sm:space-x-3"
        >
          <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 text-green-500" />
          <p className="font-medium text-sm sm:text-base">
            {t.contact.successMessage || "Message sent successfully!"}
          </p>
        </motion.div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <FormField
            id="name"
            type="text"
            name="name"
            label={t.contact.nameLabel}
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <FormField
            id="email"
            type="email"
            name="email"
            label={t.contact.emailLabel}
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <FormField
            id="phone"
            type="tel"
            name="phone"
            label={t.contact.phoneLabel || "Phone"}
            value={formData.phone}
            onChange={handleChange}
          />
          {/* Select personalizado */}
          <div className="relative">
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="peer w-full px-3 sm:px-4 pt-5 sm:pt-6 pb-1 sm:pb-2 bg-transparent border :border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white appearance-none cursor-pointer text-sm sm:text-base"
            >
              <option value="" disabled hidden>
                {t.contact.servicePlaceholder || ""}
              </option>
              <option className="bg-slate-800" value="web-development">{serviceOptions.webDev}</option>
              <option className="bg-slate-800" value="marketing">{serviceOptions.marketing}</option>
              <option className="bg-slate-800" value="seo">{serviceOptions.seo}</option>
              <option className="bg-slate-800" value="other">{serviceOptions.other}</option>
            </select>
            <label
              htmlFor="service"
              className={`absolute left-3 sm:left-4 text-gray-400 transition-all text-xs sm:text-sm
                ${formData.service ? 'top-2 sm:top-3 text-xs text-purple-500' : 'top-1/2 -translate-y-1/2 peer-focus:top-2 sm:peer-focus:top-3 peer-focus:text-xs peer-focus:text-purple-500'}
              `}
            >
              {t.contact.serviceLabel || "Service of Interest"}
            </label>
            <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 pointer-events-none" />
            {errors.service && <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.service}</p>}
          </div>

          <FormField
            id="message"
            type="textarea"
            name="message"
            label={t.contact.messageLabel}
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            required
            rows={4}
          />

          {errors.submit && <p className="text-xs sm:text-sm text-red-500">{errors.submit}</p>}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
            aria-label={isSubmitting ? t.contact.submitting || "Submitting..." : t.contact.submitButton}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" />
                <span>{t.contact.submitting || "Submitting..."}</span>
              </>
            ) : (
              <>
                <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>{t.contact.submitButton}</span>
              </>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
}

function FormField({ id, type, name, label, value, onChange, error, required = false, rows = 1 }) {
  return (
    <div className="relative">
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          placeholder=" "
          className="peer w-full px-3 sm:px-4 pt-5 sm:pt-6 pb-1 sm:pb-2 bg-transparent border :border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm sm:text-base"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=" "
          className="peer w-full px-3 sm:px-4 pt-5 sm:pt-6 pb-1 sm:pb-2 bg-transparent border :border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm sm:text-base"
        />
      )}
      <label
        htmlFor={id}
        className={`absolute left-3 sm:left-4 text-gray-400 transition-all text-xs sm:text-sm
          ${value ? 'top-2 sm:top-3 text-xs text-purple-500' : 'top-1/2 -translate-y-1/2 peer-focus:top-2 sm:peer-focus:top-3 peer-focus:text-xs peer-focus:text-purple-500'}
        `}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs sm:text-sm text-red-500">{error}</p>}
    </div>
  );
}