"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  viewMode?: "list" | "grid"
  toggleViewMode?: () => void
  showViewToggle?: boolean
}

export default function MobileMenu({
  isOpen,
  onClose,
  viewMode = "list",
  toggleViewMode,
  showViewToggle = false,
}: MobileMenuProps) {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[#2d2d2d] z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close button */}
          <motion.button
            className="absolute top-6 right-6 p-3 rounded-full bg-[#f6e6d3]"
            onClick={onClose}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </motion.button>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center space-y-12 text-white">
            <motion.div
              className="flex flex-col items-center space-y-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              <Link href="/" className="text-xl font-medium text-[#f6e6d3]" onClick={onClose}>
                HOME
              </Link>

              <Link href="/archive" className="text-xl font-medium text-[#f6e6d3]" onClick={onClose}>
                ARCHIVE
              </Link>

              <Link href="/" className="flex items-center justify-center" onClick={onClose}>
                <Image
                  src="/mata-connect-logo.svg"
                  alt="Mata Connect"
                  width={180}
                  height={36}
                  className="h-10 w-auto brightness-0 invert opacity-90 filter-[#f6e6d3]"
                />
              </Link>

              <Link href="/submit" className="text-xl font-medium text-[#f6e6d3]" onClick={onClose}>
                SUBMIT
              </Link>

              <Link href="/about" className="text-xl font-medium text-[#f6e6d3]" onClick={onClose}>
                ABOUT
              </Link>

              {showViewToggle && toggleViewMode && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleViewMode()
                    onClose()
                  }}
                  className="mt-8 bg-white text-[#2d2d2d] rounded-full px-6 py-2 flex items-center space-x-2"
                >
                  <div className="w-8 h-4 bg-gray-300 rounded-full flex items-center p-0.5">
                    <div
                      className={`w-3 h-3 rounded-full bg-[#2d2d2d] transform transition-transform ${
                        viewMode === "grid" ? "translate-x-4" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">Switch To {viewMode === "list" ? "Grid" : "List"}</span>
                </button>
              )}
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
