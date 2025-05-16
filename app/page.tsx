"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView, useAnimation, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import { ArrowUpRight, Heart, Instagram, Twitter, Linkedin } from "lucide-react"
import communitiesData from "@/data/communities.json"

// Type for community data
type Community = {
  id: string
  name: string
  category: string
  description: string
  location: string
  website: string
  featured: boolean
  rank: number
  longDescription: string
}

// Custom hook for scroll animations
function useScrollAnimation() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return { ref, controls }
}

// Scroll animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
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

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Hover animation variants for list items
const backgroundHoverVariants = {
  initial: { scaleY: 0, originY: 0 }, // Start with no height, origin at top
  hover: { scaleY: 1, originY: 0, transition: { duration: 0.3, ease: "easeOut" } }, // Expand from top to bottom
  exit: { scaleY: 0, originY: 1, transition: { duration: 0.3, ease: "easeIn" } } // Shrink from bottom to top
}

// Stats Row Component for reusability and future animation
const StatsRow = ({
  children,
  bgColor = "bg-[#2d2d2d]",
  textColor = "text-white",
  delay = 0,
}: {
  children: React.ReactNode
  bgColor?: string
  textColor?: string
  delay?: number
}) => {
  const rowAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay,
      },
    },
  }

  return (
    <motion.div variants={rowAnimation} className={`${bgColor} ${textColor} py-3 text-center uppercase text-[12px]`}>
      {children}
    </motion.div>
  )
}

// Desktop Community Modal component
const DesktopCommunityModal = ({
  community,
  isOpen,
  onClose,
}: {
  community: Community | null
  isOpen: boolean
  onClose: () => void
}) => {
  const [isLiked, setIsLiked] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscKey)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!community) return null

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 hidden md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-white rounded-xl w-full max-w-4xl overflow-hidden flex"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Left side - Dark section */}
            <div className="w-1/2 bg-[#262626] text-white p-6 flex flex-col">
              <div className="flex-1">
                <h2 className="text-xl font-serif mb-3">{community.name}</h2>
                <p className="text-base text-gray-300 mb-5 leading-relaxed tracking-tight">{community.description}</p>

                <div className="mb-6 relative overflow-hidden rounded-lg">
                  <Image
                    src="/collaborative-work.png"
                    alt={community.name}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              <div className="mt-auto flex justify-between items-center">
                <span className="text-base">#{community.category}</span>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center text-white hover:underline group"
                >
                  VISIT WEBSITE
                  <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>

              {/* Social media icons */}
              <div className="flex mt-4 space-x-2">
                <a
                  href="#"
                  className="bg-white/90 rounded-full p-1.5 text-black/80 hover:bg-white hover:text-black hover:shadow-sm transition-all duration-200"
                >
                  <Instagram className="h-3.5 w-3.5 stroke-[1.5]" />
                </a>
                <a
                  href="#"
                  className="bg-white/90 rounded-full p-1.5 text-black/80 hover:bg-white hover:text-black hover:shadow-sm transition-all duration-200"
                >
                  <Twitter className="h-3.5 w-3.5 stroke-[1.5]" />
                </a>
                <a
                  href="#"
                  className="bg-white/90 rounded-full p-1.5 text-black/80 hover:bg-white hover:text-black hover:shadow-sm transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M9 12A4 4 0 1 0 9 4a4 4 0 0 0 0 8Z"></path>
                    <path d="M14 13a4 4 0 0 0 0 8a4 4 0 0 0 0-8Z"></path>
                    <path d="M17 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
                    <line x1="8" x2="10" y1="8" y2="6"></line>
                    <line x1="15" x2="17" y1="9" y2="11"></line>
                    <line x1="8" x2="10" y1="6" y2="8"></line>
                    <line x1="15" x2="17" y1="11" y2="9"></line>
                    <line x1="9" x2="13" y1="12" y2="14"></line>
                    <line x1="13" x2="9" y1="14" y2="12"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-white/90 rounded-full p-1.5 text-black/80 hover:bg-white hover:text-black hover:shadow-sm transition-all duration-200"
                >
                  <Linkedin className="h-3.5 w-3.5 stroke-[1.5]" />
                </a>
              </div>
            </div>

            {/* Right side - White section */}
            <div className="w-1/2 p-6 overflow-y-auto max-h-[65vh]">
              <div className="mb-6">
                <p className="text-xs mb-4 tracking-tight">{community.longDescription}</p>
                <p className="text-xs mb-4 tracking-tight">
                  Located in {community.location}, this community provides resources, networking opportunities, and
                  support for women in the field of {community.category.toLowerCase()}.
                </p>
                <p className="text-xs mb-4 tracking-tight">
                  Visit their website at {community.website} to learn more about upcoming events, membership benefits,
                  and how to get involved.
                </p>
              </div>

              {/* Like button */}
              <motion.button
                onClick={toggleLike}
                className="mt-2 p-1.5"
                whileTap={{ scale: 0.8 }}
                animate={
                  isLiked
                    ? {
                        scale: [1, 1.2, 1],
                        transition: { duration: 0.5, type: "spring", stiffness: 400, damping: 10 },
                      }
                    : {}
                }
              >
                <Heart
                  className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                  strokeWidth={isLiked ? 2 : 1.5}
                />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Mobile Community Modal component
const MobileCommunityModal = ({
  community,
  isOpen,
  onClose,
}: {
  community: Community | null
  isOpen: boolean
  onClose: () => void
}) => {
  // Close modal when clicking outside
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!community) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-[#262626] text-white rounded-xl w-full max-w-md overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="relative p-6 pb-12">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>

              {/* Community content - restructured layout */}
              <h2 className="text-lg md:text-xl font-serif mb-3 md:mb-4">{community.name}</h2>

              {/* Description with more space */}
              <div className="mb-8">
                <p className="text-xs md:text-sm">{community.description}</p>
              </div>

              {/* Location info */}
              <div className="mb-4 text-left">
                <h3 className="text-[10px] md:text-xs uppercase mb-1 opacity-70">Location</h3>
                <p className="text-xs md:text-sm">{community.location}</p>
              </div>

              {/* Tag and Website on same line */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] md:text-xs">#{community.category}</span>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center text-[10px] md:text-xs text-white underline"
                >
                  VISIT WEBSITE
                  <ArrowUpRight className="h-2.5 w-2.5 md:h-3 md:w-3 ml-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Home() {
  // Get communities from the JSON file - only top 10
  const communities: Community[] = communitiesData.communities.sort((a, b) => a.rank - b.rank).slice(0, 10)

  const heroAnimation = useScrollAnimation()
  const tableAnimation = useScrollAnimation()
  const statsAnimation = useScrollAnimation()
  const quoteAnimation = useScrollAnimation()

  // State for the modal
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openCommunityModal = (community: Community) => {
    setSelectedCommunity(community)
    setIsModalOpen(true)
  }

  const closeCommunityModal = () => {
    setIsModalOpen(false)
  }

  // Parallax effect for hero image
  const { scrollY } = useScroll()
  const heroImageY = useTransform(scrollY, [0, 500], [0, 100])

  return (
    <main className="min-h-screen bg-white text-[#2d2d2d] overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Community Detail Modals - separate for mobile and desktop */}
      <MobileCommunityModal community={selectedCommunity} isOpen={isModalOpen} onClose={closeCommunityModal} />
      <DesktopCommunityModal community={selectedCommunity} isOpen={isModalOpen} onClose={closeCommunityModal} />

      {/* Hero Section */}
      <motion.section
        ref={heroAnimation.ref}
        initial="hidden"
        animate={heroAnimation.controls}
        variants={fadeInUp}
        className="container mx-auto px-4 py-8 md:py-16 text-center"
      >
        <motion.div style={{ y: heroImageY }} className="max-w-md mx-auto mb-8">
          <Image
            src="/hero-picture.svg"
            alt="Diverse women illustration"
            width={250}
            height={250}
            className="mx-auto"
          />
        </motion.div>

        <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl font-serif mb-4 md:mb-6 leading-tight">
          Ladies Wander No more—Find
          <br />
          Your Perfect Community.
        </motion.h1>

        <motion.p variants={fadeInUp} className="text-xs md:text-sm leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto">
          At MataConnect, We Bring Together Like-Minded Individuals Who Share Your Passions, Dreams, And Aspirations.
          Connect With A Community That Supports Your Growth, Offers Inspiration, And Helps You Unlock New
          Opportunities. No More Wandering—Your Perfect Community Is Ready And Waiting.
        </motion.p>

        <Link href="/archive">
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#2d2d2d] text-white px-6 py-2 rounded-full text-sm"
          >
            Explore All Archives
          </motion.button>
        </Link>
      </motion.section>

      {/* Communities Table - Desktop - Full Width */}
      <motion.section
        ref={tableAnimation.ref}
        initial="hidden"
        animate={tableAnimation.controls}
        variants={fadeIn}
        className="hidden md:block w-full py-8 mb-0"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="uppercase text-xs font-medium">
                <th className="py-4 text-left pl-8 pr-4">Community Name</th>
                <th className="py-4 text-center px-4">Category</th>
                <th className="py-4 text-center px-4">Description</th>
                <th className="py-4 text-center px-4">Location</th>
                <th className="py-4 text-right pr-8 pl-4">Website</th>
              </tr>
            </thead>
            <motion.tbody variants={staggerContainer} className="text-xs">
              {communities.map((community) => (
                <motion.tr
                  key={community.id}
                  variants={staggerItem}
                  onClick={() => openCommunityModal(community)}
                  className="border-t border-gray-200 cursor-pointer relative overflow-hidden group"
                  initial="initial"
                  whileHover="hover"
                  exit="exit"
                >
                  <td className="py-6 text-left pl-8 pr-4 font-medium relative z-10 transition-colors duration-300 group-hover:text-[#F6E6D3]">
                    {community.name}
                  </td>
                  <td className="py-6 text-center px-4 relative z-10 transition-colors duration-300 group-hover:text-[#F6E6D3]">
                    #{community.category}
                  </td>
                  <td className="py-6 text-center px-4 uppercase relative z-10 transition-colors duration-300 group-hover:text-[#F6E6D3]">
                    {community.description}
                  </td>
                  <td className="py-6 text-center px-4 relative z-10 transition-colors duration-300 group-hover:text-[#F6E6D3]">
                    {community.location}
                  </td>
                  <td className="py-6 text-right pr-8 pl-4 relative z-10 transition-colors duration-300 group-hover:text-[#F6E6D3]">
                    {community.website}
                  </td>
                  <motion.div 
                    className="absolute inset-0 bg-[#262626]"
                    variants={backgroundHoverVariants}
                  ></motion.div>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.section>

      {/* Communities List - Mobile - Full Width */}
      <motion.section
        initial="hidden"
        animate={tableAnimation.controls}
        variants={fadeIn}
        className="md:hidden w-full py-6 mb-0"
      >
        <motion.div variants={staggerContainer} className="space-y-0">
          {communities.map((community) => (
            <motion.div
              key={community.id}
              variants={staggerItem}
              onClick={() => openCommunityModal(community)}
              className="border-t border-gray-200 py-4 grid grid-cols-3 text-[8px] px-4 cursor-pointer relative group"
              initial="initial"
              whileHover="hover"
              exit="exit"
            >
              <div className="font-medium relative z-10 transition-colors duration-300 group-hover:text-[#F6E6D3]">{community.name}</div>
              <div className="text-center relative z-10 transition-colors duration-300 group-hover:text-[#F6E6D3]">#{community.category}</div>
              <div className="text-right relative z-10 transition-colors duration-300 group-hover:text-[#F6E6D3]">{community.website}</div>
              <motion.div 
                className="absolute inset-0 bg-[#262626]"
                variants={backgroundHoverVariants}
              ></motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Marquee Banner */}
      <section className="bg-[#262626] text-[#F6E6D3] h-[50px] flex items-center overflow-hidden">
        <InfiniteMarquee />
      </section>

      {/* Stats and Illustration Section */}
      <section className="container mx-auto px-4 pt-4 pb-8 md:pt-8 md:pb-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <motion.div
          ref={statsAnimation.ref}
          initial="hidden"
          animate={statsAnimation.controls}
          variants={fadeInUp}
          className="w-full md:w-1/2 scale-90 md:scale-100" // Added scale-90 for mobile
        >
          <motion.div variants={staggerContainer} className="w-full md:max-w-sm overflow-hidden rounded-lg">
            {/* Logo Section */}
            <StatsRow delay={0}>
              <div className="inline-block px-3 py-1">
                <Image
                  src="/mata-connect-logo.svg"
                  alt="Mata Connect"
                  width={100}
                  height={20}
                  className="h-5 md:h-6 w-auto brightness-0 invert" // Reduced height on mobile
                />
              </div>
            </StatsRow>

            {/* Stats Rows - Alternating Colors */}
            <StatsRow bgColor="bg-[#f6e6d3]" textColor="text-[#2d2d2d]" delay={0.1}>
              <p className="text-[12px] py-0 my-0">+1023 COMMUNITIES IN OUR ARCHIVE</p>
            </StatsRow>

            <StatsRow delay={0.2}>
              <p className="text-[12px] py-0 my-0">COMMUNITIES ACROSS 6 CONTINENTS</p>
            </StatsRow>

            <StatsRow bgColor="bg-[#f6e6d3]" textColor="text-[#2d2d2d]" delay={0.3}>
              <p className="text-[12px] py-0 my-0">+1023 TECH COMMUNITIES</p>
            </StatsRow>

            <StatsRow delay={0.4}>
              <p className="text-[12px] py-0 my-0">MORE THAN +500 SUBMISSIONS MADE</p>
            </StatsRow>

            <StatsRow bgColor="bg-[#f6e6d3]" textColor="text-[#2d2d2d]" delay={0.5}>
              <p className="text-[12px] py-0 my-0">OFFICIALLY THE BEST ARCHIVE OF WOMEN COMMUNITIES</p>
            </StatsRow>

            <StatsRow delay={0.6}>
              <p className="text-[12px] py-0 my-0">OFFICIALLY THE BEST ARCHIVE OF WOMEN COMMUNITIES</p>
            </StatsRow>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={statsAnimation.controls}
          variants={fadeInUp}
          className="w-full md:w-1/2 scale-75 md:scale-100" // Added scale-75 for mobile
        >
          <Image
            src="/hero-picture.svg"
            alt="Diverse women illustration"
            width={400}
            height={400}
            className="mx-auto w-[300px] md:w-[400px]" // Reduced width on mobile
          />
        </motion.div>
      </section>

      {/* Quote Section */}
      <motion.section
        ref={quoteAnimation.ref}
        initial="hidden"
        animate={quoteAnimation.controls}
        variants={fadeIn}
        className="mx-5 py-16 md:py-24"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.8,
                ease: "easeOut",
              },
            },
          }}
          className="bg-[#2d2d2d] text-[#F6E6D3] py-16 md:py-20 px-8 md:px-12 rounded-[40px] w-auto"
        >
          <div className="text-center">
            <motion.blockquote
              variants={fadeInUp}
              className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tighter mb-8"
            >
              "Alone we can do so
              <br />
              little; together we can
              <br />
              do so much"
            </motion.blockquote>
            <motion.cite variants={fadeInUp} className="text-sm md:text-base font-light">
              — Helen Keller
            </motion.cite>
          </div>
        </motion.div>
      </motion.section>

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
