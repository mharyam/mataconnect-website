"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Navbar from "@/components/navbar"

export default function AboutPage() {
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)
  const section4Ref = useRef(null)
  const foundersHeadingRef = useRef(null)
  const paragraphRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  const section1InView = useInView(section1Ref, { once: true, amount: 0.3 })
  const section2InView = useInView(section2Ref, { once: true, amount: 0.3 })
  const section3InView = useInView(section3Ref, { once: true, amount: 0.3 })
  const section4InView = useInView(section4Ref, { once: true, amount: 0.3 })

  // Scroll-based color animation for founders heading
  const { scrollYProgress: foundersScrollProgress } = useScroll({
    target: foundersHeadingRef,
    offset: ["start end", "end start"],
  })

  // Transform scroll progress to color (from light gray to black)
  const textColor = useTransform(
    foundersScrollProgress,
    [0, 0.5], // Input range: 0 = start of visibility, 0.5 = halfway through scroll
    ["#9ca3af", "#2d2d2d"], // Output range: light gray to black
  )

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  // Manual scroll tracking for paragraph color
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Calculate paragraph color based on its position
  const [paragraphColor, setParagraphColor] = useState("#C1C1C1")

  useEffect(() => {
    if (paragraphRef.current) {
      const paragraphRect = paragraphRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how far the paragraph is through the viewport
      // 1 = just entered bottom of screen, 0 = centered in viewport, -1 = exited top of screen
      const viewportPosition = (paragraphRect.top + paragraphRect.height / 2) / (windowHeight / 2) - 1

      // Map this position to a color
      if (viewportPosition <= 0) {
        // Paragraph is in the top half of the screen or higher
        setParagraphColor("#262626")
      } else if (viewportPosition >= 1) {
        // Paragraph is in the bottom half of the screen or lower
        setParagraphColor("#C1C1C1")
      } else {
        // Paragraph is moving through the viewport
        // Create a gradient between the colors
        const ratio = 1 - viewportPosition
        const r = Math.round(193 + (38 - 193) * ratio)
        const g = Math.round(193 + (38 - 193) * ratio)
        const b = Math.round(193 + (38 - 193) * ratio)
        setParagraphColor(`rgb(${r}, ${g}, ${b})`)
      }
    }
  }, [scrollY])

  return (
    <main className="min-h-screen bg-white text-[#2d2d2d] overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Section 1: Hero with white background */}
      <section ref={section1Ref} className="bg-white text-[#2d2d2d] py-10 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Mobile image at top */}
            <motion.div
              className="w-full md:hidden mb-6 flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={section1InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-[#f6e6d3] rounded-3xl overflow-hidden w-[180px] h-[180px]">
                <Image
                  src="/pic_0f_section_1.svg"
                  alt="Woman in traditional attire"
                  width={180}
                  height={180}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-8 text-center md:text-left"
              initial="hidden"
              animate={section1InView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h1 className="text-3xl md:text-5xl font-serif mb-6 md:mb-8" variants={fadeIn}>
                Mata Connect
              </motion.h1>

              <motion.p className="text-xs md:text-base leading-relaxed mb-6" variants={fadeIn}>
                In The Hausa Language, "Mata" Means "Women." It Symbolizes Strength, Resilience, And The Powerful Impact
                Women Have In Shaping Communities And Driving Change. The Name MataConnect Speaks To The Very Essence Of
                Our Mission: To Create A Platform Where Women From All Walks Of Life Can Come Together, Support Each
                Other, And Thrive.
              </motion.p>

              <motion.p className="text-xs md:text-base leading-relaxed" variants={fadeIn}>
                At MataConnect, We Aim To Build A Global Community Where Women Can Share Their Stories, Grow
                Professionally, And Support One Another In Their Personal Journeys. Just As The Word "Mata" Reflects The
                Central Role Women Play In Society, MataConnect Is Designed To Empower And Connect Women, Fostering A
                Network That Bridges Gaps, Encourages Collaboration, And Inspires Change.
              </motion.p>
            </motion.div>

            {/* Desktop image on right */}
            <motion.div
              className="hidden md:block w-full md:w-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={section1InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-[#f6e6d3] rounded-3xl overflow-hidden">
                <Image
                  src="/pic_0f_section_1.svg"
                  alt="Woman in traditional attire"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <section ref={section3Ref} className="bg-[#262626] text-[#F6E6D3] h-[50px] flex items-center overflow-hidden">
        <InfiniteMarquee />
      </section>

      {/* Section 2: Repeated content with image for mobile layout */}
      <section ref={section2Ref} className="bg-white text-[#262626] py-10 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Mobile image at top */}
            <motion.div
              className="w-full md:hidden mb-6 flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={section2InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-[#f6e6d3] rounded-3xl overflow-hidden w-[180px] h-[180px]">
                <Image
                  src="/section 2_picture.svg"
                  alt="Women at Women's Center"
                  width={180}
                  height={180}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 mb-10 md:mb-0 order-2 md:order-2 pl-0 md:pl-8 text-center md:text-left"
              initial="hidden"
              animate={section2InView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h2 className="text-3xl md:text-5xl font-serif mb-6 md:mb-8" variants={fadeIn}>
                Mata Connect
              </motion.h2>

              <motion.p className="text-xs md:text-base leading-relaxed mb-6" variants={fadeIn}>
                In The Hausa Language, "Mata" Means "Women." It Symbolizes Strength, Resilience, And The Powerful Impact
                Women Have In Shaping Communities And Driving Change. The Name MataConnect Speaks To The Very Essence Of
                Our Mission: To Create A Platform Where Women From All Walks Of Life Can Come Together, Support Each
                Other, And Thrive.
              </motion.p>

              <motion.p className="text-xs md:text-base leading-relaxed" variants={fadeIn}>
                At MataConnect, We Aim To Build A Global Community Where Women Can Share Their Stories, Grow
                Professionally, And Support One Another In Their Personal Journeys. Just As The Word "Mata" Reflects The
                Central Role Women Play In Society, MataConnect Is Designed To Empower And Connect Women, Fostering A
                Network That Bridges Gaps, Encourages Collaboration, And Inspires Change.
              </motion.p>
            </motion.div>

            {/* Desktop image on left */}
            <motion.div
              className="hidden md:block w-full md:w-1/2 order-1 md:order-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={section2InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Image
                src="/section 2_picture.svg"
                alt="Women at Women's Center"
                width={600}
                height={450}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Founders */}
      <section ref={section4Ref} className="bg-white text-[#262626] py-10 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2
            ref={foundersHeadingRef}
            className="text-3xl md:text-5xl font-serif mb-8 md:mb-12 text-left tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={section4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            style={{ color: textColor }}
          >
            Founded & Brought To
            <br className="md:hidden" /> Live By—Maryam &<br className="md:hidden" /> Ahmad
          </motion.h2>

          <p
            ref={paragraphRef}
            className="text-lg md:text-2xl mb-10 md:mb-16 max-w-5xl text-left tracking-tight transition-colors duration-300"
            style={{ color: paragraphColor }}
          >
            I Reached Out To Ahmad, The Creative Designer, And Shared My Challenge With Him. He Helped Bring My Vision
            To Life Through Ideation, Design, And Guiding The Overall Direction, Turning My Mataconnect Into Something
            Tangible And Impactful.
          </p>

          {/* Founders Cards - New Design based on SVGs */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative">
            {/* Maryam Card */}
            <div className="w-full max-w-xl">
              <motion.div
                className="relative w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={section4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{
                  width: "110%",
                  x: "-5%",
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                {/* Card Content */}
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="w-full md:w-1/3 p-4">
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/maryam.svg"
                        alt="Maryam Yusuf"
                        width={300}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-2/3 p-4 md:p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-serif mb-2">Maryam Yusuf—Founder</h3>
                      <p className="text-sm text-gray-600 mb-4">Senior Associate Software Engineer At JPMorgan</p>

                      <div className="hidden group-hover:block">
                        <p className="text-sm mb-4">
                          Passionate about creating inclusive spaces for women in technology and business. With a
                          background in software engineering and community building, Maryam brings technical expertise
                          and vision to MataConnect.
                        </p>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-4 mt-4">
                      <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                            stroke="#262626"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 9H2V21H6V9Z"
                            stroke="#262626"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                            stroke="#262626"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z"
                            stroke="#262626"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                            stroke="#262626"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 8V8.01"
                            stroke="#262626"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect x="3" y="3" width="18" height="18" rx="5" stroke="#262626" strokeWidth="1.5" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay - Additional Content that appears on hover */}
                <motion.div
                  className="absolute inset-0 bg-white bg-opacity-95 flex flex-col justify-center p-8 opacity-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    transition: { delay: 0.2, duration: 0.3 },
                  }}
                >
                  <h3 className="text-2xl font-serif mb-4">Maryam Yusuf—Founder</h3>
                  <p className="text-base mb-6">
                    As the founder of MataConnect, Maryam brings her passion for community building and technology to
                    create a platform that empowers women across the globe. With experience at JPMorgan, she combines
                    technical expertise with a vision for connecting women from diverse backgrounds.
                  </p>
                  <p className="text-base mb-6">
                    "I created MataConnect to be the resource I wish I had when starting my career - a place where women
                    can find mentorship, opportunities, and a supportive community."
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                          stroke="#262626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 9H2V21H6V9Z"
                          stroke="#262626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                          stroke="#262626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z"
                          stroke="#262626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                          stroke="#262626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 8V8.01"
                          stroke="#262626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <rect x="3" y="3" width="18" height="18" rx="5" stroke="#262626" strokeWidth="1.5" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Ahmad Card */}
            <div className="w-full max-w-xl">
              <motion.div
                className="relative w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={section4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{
                  width: "110%",
                  x: "5%",
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                {/* Card Content */}
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="w-full md:w-1/3 p-4">
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/ahruf.svg"
                        alt="Ahmad"
                        width={300}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-2/3 p-4 md:p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-serif mb-2">Ahmad—Creative Designer</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Ahmad Was In Charge Of Designing And Directing All The Key Parts Of Mataconnect
                      </p>

                      <div className="hidden group-hover:block">
                        <p className="text-sm mb-4">
                          A visionary designer with expertise in creating intuitive and engaging user experiences. Ahmad
                          brings creative direction and design thinking to MataConnect.
                        </p>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-4 mt-4">
                      <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                            stroke="#262626"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 9H2V21H6V9Z"
                            stroke="#262626"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                            stroke="#262626"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z"
                            stroke="#262626"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                            stroke="#262626"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 8V8.01"
                            stroke="#262626"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect x="3" y="3" width="18" height="18" rx="5" stroke="#262626" strokeWidth="1.5" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay - Additional Content that appears on hover */}
                <motion.div
                  className="absolute inset-0 bg-white bg-opacity-95 flex flex-col justify-center p-8 opacity-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    transition: { delay: 0.2, duration: 0.3 },
                  }}
                >
                  <h3 className="text-2xl font-serif mb-4">Ahmad—Creative Designer</h3>
                  <p className="text-base mb-6">
                    Ahmad brings his creative vision and design expertise to MataConnect. With a background in UX/UI
                    design and brand development, he has shaped the visual identity and user experience of the platform.
                  </p>
                  <p className="text-base mb-6">
                    "Design is about solving problems and creating experiences. With MataConnect, we've designed a
                    platform that makes it easy and intuitive for women to find and connect with communities that
                    resonate with their goals and values."
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                          stroke="#262626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 9H2V21H6V9Z"
                          stroke="#262626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                          stroke="#262626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z"
                          stroke="#262626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                          stroke="#262626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 8V8.01"
                          stroke="#262626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <rect x="3" y="3" width="18" height="18" rx="5" stroke="#262626" strokeWidth="1.5" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="container mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0"
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

function InfiniteMarquee() {
  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  }

  const marqueeContent = (
    <>
      <span className="text-base md:text-lg font-serif mr-4">Find Your Wings</span>
      <Image src="/butterfly-1.svg" alt="Butterfly" width={30} height={30} className="w-6 h-6 md:w-8 md:h-8 mx-4" />
      <span className="text-base md:text-lg font-serif mx-4">Where Women Connect, Learn, And Thrive</span>
      <Image
        src="/peony-arrangement.svg"
        alt="Peony Arrangement"
        width={30}
        height={30}
        className="w-6 h-6 md:w-8 md:h-8 mx-4"
      />
      <span className="text-base md:text-lg font-serif ml-4">Find Your Voice, Find Your Tribe.</span>
    </>
  )

  return (
    <div className="flex overflow-hidden relative w-full">
      <motion.div className="flex items-center whitespace-nowrap" variants={marqueeVariants} animate="animate">
        {marqueeContent}
        {marqueeContent}
        {marqueeContent}
        {marqueeContent}
      </motion.div>
    </div>
  )
}
