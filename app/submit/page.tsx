"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import Navbar from "@/components/navbar"

export default function SubmitPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    communityName: "",
    category: "",
    location: "",
    website: "",
    linkedin: "",
    otherSocials: "",
    description: "",
    featured: "",
  })

  const [focused, setFocused] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)
  const isInView = useInView(formRef, { once: true, amount: 0.2 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleFocus = (field: string) => {
    setFocused(field)
  }

  const handleBlur = () => {
    setFocused(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formState)
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormState({
        name: "",
        email: "",
        communityName: "",
        category: "",
        location: "",
        website: "",
        linkedin: "",
        otherSocials: "",
        description: "",
        featured: "",
      })
      setSubmitted(false)
    }, 3000)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, backgroundColor: "#1a1a1a" },
    tap: { scale: 0.95 },
  }

  // Update the inputVariants to keep the border line consistent
  const inputVariants = {
    initial: { borderColor: "#e2e2e2" },
    focus: { borderColor: "#e2e2e2" }, // Keep the same color on focus
    filled: { borderColor: "#a3a3a3" },
  }

  // Placeholder text for each field
  const placeholders = {
    name: "Jane Doe",
    email: "jane@womenconnect.org",
    communityName: "Women Who Code",
    category: "TECH, HEALTH, BUSINESS, etc.",
    location: "San Francisco, USA",
    website: "www.womenwhocode.com",
    linkedin: "linkedin.com/company/women-who-code",
    otherSocials: "@womenwhocode (Twitter), @wwcode (Instagram)",
    description: "A global non-profit organization dedicated to inspiring women to excel in technology careers.",
    featured:
      "Our community has helped over 500 women transition into tech careers and provides free resources to underrepresented groups.",
  }

  return (
    <main className="min-h-screen bg-white text-[#2d2d2d] overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Submit Form Section */}
      <section className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Illustration */}
          <motion.div className="mb-8" variants={itemVariants}>
            <Image
              src="/Frame 2147226559.svg"
              alt="Women illustration"
              width={150}
              height={150}
              className="rounded-lg"
              priority
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-2xl md:text-5xl font-serif mb-12 text-center leading-tight"
            variants={itemVariants}
          >
            Submit Your(A) Group And Help
            <br />
            More Women Connect, Grow, And
            <br />
            Thrive.
          </motion.h1>

          {/* Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Name Field */}
              <motion.div className="flex flex-col" variants={itemVariants}>
                <label htmlFor="name" className="text-xs mb-2">
                  YOUR NAME *
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={handleBlur}
                  placeholder={focused !== "name" ? placeholders.name : ""}
                  className="border-b border-gray-300 py-2 focus:outline-none placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 bg-white text-[#2d2d2d]"
                  variants={inputVariants}
                  initial="initial"
                  animate={focused === "name" ? "focus" : formState.name ? "filled" : "initial"}
                  whileFocus="focus"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div className="flex flex-col" variants={itemVariants}>
                <label htmlFor="email" className="text-xs mb-2">
                  EMAIL *
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                  placeholder={focused !== "email" ? placeholders.email : ""}
                  className="border-b border-gray-300 py-2 focus:outline-none placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 bg-white text-[#2d2d2d]"
                  variants={inputVariants}
                  initial="initial"
                  animate={focused === "email" ? "focus" : formState.email ? "filled" : "initial"}
                  whileFocus="focus"
                />
              </motion.div>

              {/* Community Name Field */}
              <motion.div className="flex flex-col" variants={itemVariants}>
                <label htmlFor="communityName" className="text-xs mb-2">
                  COMMUNITY NAME *
                </label>
                <motion.input
                  type="text"
                  id="communityName"
                  name="communityName"
                  required
                  value={formState.communityName}
                  onChange={handleChange}
                  onFocus={() => handleFocus("communityName")}
                  onBlur={handleBlur}
                  placeholder={focused !== "communityName" ? placeholders.communityName : ""}
                  className="border-b border-gray-300 py-2 focus:outline-none placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 bg-white text-[#2d2d2d]"
                  variants={inputVariants}
                  initial="initial"
                  animate={focused === "communityName" ? "focus" : formState.communityName ? "filled" : "initial"}
                  whileFocus="focus"
                />
              </motion.div>

              {/* Category Field */}
              <motion.div className="flex flex-col" variants={itemVariants}>
                <label htmlFor="category" className="text-xs mb-2">
                  CATEGORY *
                </label>
                <motion.input
                  type="text"
                  id="category"
                  name="category"
                  required
                  value={formState.category}
                  onChange={handleChange}
                  onFocus={() => handleFocus("category")}
                  onBlur={handleBlur}
                  placeholder={focused !== "category" ? placeholders.category : ""}
                  className="border-b border-gray-300 py-2 focus:outline-none placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 bg-white text-[#2d2d2d]"
                  variants={inputVariants}
                  initial="initial"
                  animate={focused === "category" ? "focus" : formState.category ? "filled" : "initial"}
                  whileFocus="focus"
                />
              </motion.div>

              {/* Location Field */}
              <motion.div className="flex flex-col" variants={itemVariants}>
                <label htmlFor="location" className="text-xs mb-2">
                  LOCATION *
                </label>
                <motion.input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formState.location}
                  onChange={handleChange}
                  onFocus={() => handleFocus("location")}
                  onBlur={handleBlur}
                  placeholder={focused !== "location" ? placeholders.location : ""}
                  className="border-b border-gray-300 py-2 focus:outline-none placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 bg-white text-[#2d2d2d]"
                  variants={inputVariants}
                  initial="initial"
                  animate={focused === "location" ? "focus" : formState.location ? "filled" : "initial"}
                  whileFocus="focus"
                />
              </motion.div>

              {/* Website Field */}
              <motion.div className="flex flex-col" variants={itemVariants}>
                <label htmlFor="website" className="text-xs mb-2">
                  WEBSITE *
                </label>
                <motion.input
                  type="url"
                  id="website"
                  name="website"
                  required
                  value={formState.website}
                  onChange={handleChange}
                  onFocus={() => handleFocus("website")}
                  onBlur={handleBlur}
                  placeholder={focused !== "website" ? placeholders.website : ""}
                  className="border-b border-gray-300 py-2 focus:outline-none placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 bg-white text-[#2d2d2d]"
                  variants={inputVariants}
                  initial="initial"
                  animate={focused === "website" ? "focus" : formState.website ? "filled" : "initial"}
                  whileFocus="focus"
                />
              </motion.div>

              {/* LinkedIn Field */}
              <motion.div className="flex flex-col" variants={itemVariants}>
                <label htmlFor="linkedin" className="text-xs mb-2">
                  LINKEDIN
                </label>
                <motion.input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formState.linkedin}
                  onChange={handleChange}
                  onFocus={() => handleFocus("linkedin")}
                  onBlur={handleBlur}
                  placeholder={focused !== "linkedin" ? placeholders.linkedin : ""}
                  className="border-b border-gray-300 py-2 focus:outline-none placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 bg-white text-[#2d2d2d]"
                  variants={inputVariants}
                  initial="initial"
                  animate={focused === "linkedin" ? "focus" : formState.linkedin ? "filled" : "initial"}
                  whileFocus="focus"
                />
              </motion.div>

              {/* Other Socials Field */}
              <motion.div className="flex flex-col" variants={itemVariants}>
                <label htmlFor="otherSocials" className="text-xs mb-2">
                  OTHER SOCIALS
                </label>
                <motion.input
                  type="text"
                  id="otherSocials"
                  name="otherSocials"
                  value={formState.otherSocials}
                  onChange={handleChange}
                  onFocus={() => handleFocus("otherSocials")}
                  onBlur={handleBlur}
                  placeholder={focused !== "otherSocials" ? placeholders.otherSocials : ""}
                  className="border-b border-gray-300 py-2 focus:outline-none placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 bg-white text-[#2d2d2d]"
                  variants={inputVariants}
                  initial="initial"
                  animate={focused === "otherSocials" ? "focus" : formState.otherSocials ? "filled" : "initial"}
                  whileFocus="focus"
                />
              </motion.div>
            </div>

            {/* Description Field - Full Width */}
            <motion.div className="flex flex-col mt-6" variants={itemVariants}>
              <label htmlFor="description" className="text-xs mb-2">
                SHORT DESCRIPTION *
              </label>
              <motion.textarea
                id="description"
                name="description"
                required
                value={formState.description}
                onChange={handleChange}
                onFocus={() => handleFocus("description")}
                onBlur={handleBlur}
                placeholder={focused !== "description" ? placeholders.description : ""}
                className="border-b border-gray-300 py-2 focus:outline-none placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 bg-white text-[#2d2d2d] min-h-[60px] resize-none"
                variants={inputVariants}
                initial="initial"
                animate={focused === "description" ? "focus" : formState.description ? "filled" : "initial"}
                whileFocus="focus"
              />
            </motion.div>

            {/* Featured Field - Full Width */}
            <motion.div className="flex flex-col mt-6" variants={itemVariants}>
              <label htmlFor="featured" className="text-xs mb-2">
                WHY SHOULD THIS BE FEATURED (OPTIONAL)
              </label>
              <motion.textarea
                id="featured"
                name="featured"
                value={formState.featured}
                onChange={handleChange}
                onFocus={() => handleFocus("featured")}
                onBlur={handleBlur}
                placeholder={focused !== "featured" ? placeholders.featured : ""}
                className="border-b border-gray-300 py-2 focus:outline-none placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 bg-white text-[#2d2d2d] min-h-[60px] resize-none"
                variants={inputVariants}
                initial="initial"
                animate={focused === "featured" ? "focus" : formState.featured ? "filled" : "initial"}
                whileFocus="focus"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div className="mt-12 flex justify-start" variants={itemVariants}>
              <motion.button
                type="submit"
                className="bg-[#2d2d2d] text-white px-8 py-3 rounded-full text-sm"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                disabled={submitted}
              >
                {submitted ? "Submitted Successfully!" : "Submit My Community"}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="container mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0 mt-12"
      >
        <Link href="/" className="flex items-center justify-center">
          <Image src="/mata-connect-logo.svg" alt="Mata Connect" width={120} height={24} className="h-6 w-auto" />
        </Link>
        <div className="text-[10px] text-[#262626] text-center md:text-right relative group">
          <motion.div
            className="flex flex-col items-center md:items-end"
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <span>DESIGNED & DEVELOPED BY @AHRUF</span>
            <span>© MATA CONNECT 2025. ALL RIGHTS RESERVED ©</span>
          </motion.div>
          <motion.a
            href="https://www.x.com/ahruf_"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center md:justify-end text-gray-500 hover:text-gray-800"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
          >
            <span className="bg-[#f6e6d3] px-3 py-1 rounded-full text-[#2d2d2d] font-medium">www.x.com/ahruf_</span>
          </motion.a>
        </div>
      </motion.footer>
    </main>
  )
}
