"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, Grid, List } from "lucide-react"
import { motion } from "framer-motion"
import MobileMenu from "./mobile-menu"

interface NavbarProps {
  viewMode?: "list" | "grid"
  toggleViewMode?: () => void
  showViewToggle?: boolean
}

const NavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link href={href} className="uppercase text-xs font-medium relative overflow-hidden group">
      <div className="flex flex-col h-5 transition-transform duration-300">
        <span className="group-hover:-translate-y-full transition-transform duration-300">
          {label}
        </span>
        <span className="absolute translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          {label}
        </span>
      </div>
    </Link>
  )
}

export default function Navbar({ viewMode = "list", toggleViewMode, showViewToggle = false }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative">
        {/* Desktop Navigation - Left */}
        <nav className="hidden md:flex space-x-8">
          <NavLink href="/" label="Home" />
          <NavLink href="/archive" label="Archive" />
        </nav>

        {/* Mobile Navigation - Left */}
        <div className="md:hidden">
          <Link href="/archive" className="uppercase text-xs font-medium">
            Archive
          </Link>
        </div>

        {/* Logo - Both Mobile and Desktop */}
        <Link href="/" className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
          <Image src="/mata-connect-logo.svg" alt="Mata Connect" width={120} height={24} className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation - Right */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/submit" label="Submit" />
          <NavLink href="/about" label="About" />

          {/* View Toggle Button - Desktop */}
          {showViewToggle && toggleViewMode && (
            <motion.button
              onClick={toggleViewMode}
              className="flex items-center justify-center px-4 py-1.5 bg-[#2d2d2d] text-white rounded-full text-xs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.span initial={{ opacity: 1 }} animate={{ opacity: 1 }} className="mr-2">
                {viewMode === "list" ? <Grid className="h-3.5 w-3.5" /> : <List className="h-3.5 w-3.5" />}
              </motion.span>
              <motion.span
                key={viewMode}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Switch To {viewMode === "list" ? "Grid" : "List"}
              </motion.span>
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full bg-[#f6e6d3]"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </button>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        viewMode={viewMode}
        toggleViewMode={toggleViewMode}
        showViewToggle={showViewToggle}
      />
    </>
  )
}
