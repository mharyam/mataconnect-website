"use client";

import type React from "react";

import { useState, useRef, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ArrowUpRight,
  Heart,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import communitiesData from "@/data/communities.json";
import type { Community } from "@/types";
import { fetchApi } from "@/config/api";

// Desktop Community Modal component
const DesktopCommunityModal = ({
  community,
  isOpen,
  onClose,
}: {
  community: Community | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!community) return null;

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

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
                <p className="text-base text-gray-300 mb-5 leading-relaxed tracking-tight">
                  {community.description}
                </p>

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
                <p className="text-xs mb-4 tracking-tight">
                  {community.longDescription}
                </p>
                <p className="text-xs mb-4 tracking-tight">
                  Located in {community.location}, this community provides
                  resources, networking opportunities, and support for women in
                  the field of {community.category.toLowerCase()}.
                </p>
                <p className="text-xs mb-4 tracking-tight">
                  Visit their website at {community.website} to learn more about
                  upcoming events, membership benefits, and how to get involved.
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
                        transition: {
                          duration: 0.5,
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        },
                      }
                    : {}
                }
              >
                <Heart
                  className={`h-6 w-6 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                  strokeWidth={isLiked ? 2 : 1.5}
                />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Mobile Community Modal component
const MobileCommunityModal = ({
  community,
  isOpen,
  onClose,
}: {
  community: Community | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  // Close modal when clicking outside
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!community) return null;

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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="sr-only">Close</span>
              </button>

              {/* Community content - restructured layout */}
              <h2 className="text-lg md:text-xl font-serif mb-3 md:mb-4">
                {community.name}
              </h2>

              {/* Description with more space */}
              <div className="mb-8">
                <p className="text-xs md:text-sm">{community.description}</p>
              </div>

              {/* Location info */}
              <div className="mb-4 text-left">
                <h3 className="text-[10px] md:text-xs uppercase mb-1 opacity-70">
                  Location
                </h3>
                <p className="text-xs md:text-sm">{community.location}</p>
              </div>

              {/* Tag and Website on same line */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] md:text-xs">
                  #{community.category}
                </span>
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
  );
};

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list"); // Default to list view
  const tableRef = useRef(null);
  const isInView = useInView(tableRef, { once: true, amount: 0.1 });
  const [placeholder, setPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    // Fetch commuties data from API
    const fetchCommunities = async () => {
      try {
        const response = await fetchApi<Community[]>("communitiesSearch");
        if (!response) {
          console.error("No communities found", response);
          setCommunities([]);
          return;
        }
        setCommunities(response);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };
    fetchCommunities();
  }, []);

  // State for the community modal
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCommunityModal = (community: Community) => {
    setSelectedCommunity(community);
    setIsModalOpen(true);
  };

  const closeCommunityModal = () => {
    setIsModalOpen(false);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  // Placeholder examples
  const placeholders = [
    "I need a community of women with PCOS",
    "I am looking for a community of women in healthtech",
    "Find me tech communities for Black women in Nigeria",
    "Women-led business communities in San Francisco",
    "Muslim women's support groups near me",
  ];

  // Typewriter effect
  useEffect(() => {
    const currentPlaceholder = placeholders[placeholderIndex];

    if (isTyping) {
      if (currentCharIndex < currentPlaceholder.length) {
        const timeout = setTimeout(() => {
          setPlaceholder(currentPlaceholder.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        }, 50); // Speed of typing
        return () => clearTimeout(timeout);
      } else {
        // Pause at the end of typing before starting to erase
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Wait time after typing completes
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentCharIndex > 0) {
        const timeout = setTimeout(() => {
          setPlaceholder(currentPlaceholder.substring(0, currentCharIndex - 1));
          setCurrentCharIndex(currentCharIndex - 1);
        }, 30); // Speed of erasing (slightly faster than typing)
        return () => clearTimeout(timeout);
      } else {
        // Move to next placeholder
        const timeout = setTimeout(() => {
          setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
          setIsTyping(true);
        }, 500); // Pause before starting the next word
        return () => clearTimeout(timeout);
      }
    }
  }, [placeholderIndex, isTyping, currentCharIndex, placeholders]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  // Filter dropdown state
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("rank");

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const selectCategory = (category: string | null) => {
    setSelectedCategory(category);
    setActiveDropdown(null);
  };

  const selectLocation = (location: string | null) => {
    setSelectedLocation(location);
    setActiveDropdown(null);
  };

  const selectSortOrder = (order: string) => {
    setSortOrder(order);
    setActiveDropdown(null);
  };

  // Get unique categories and locations for filters
  const categories = Array.from(new Set(communities.map((c) => c.category)));
  const locations = Array.from(new Set(communities.map((c) => c.location)));

  // Filter communities based on search query and filters
  const filteredCommunities = communities
    .filter((community) => {
      const matchesSearch =
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        community.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory
        ? community.category === selectedCategory
        : true;
      const matchesLocation = selectedLocation
        ? community.location === selectedLocation
        : true;

      return matchesSearch && matchesCategory && matchesLocation;
    })
    .sort((a, b) => {
      if (sortOrder === "rank") return a.rank - b.rank;
      if (sortOrder === "name") return a.name.localeCompare(b.name);
      if (sortOrder === "newest") return b.rank - a.rank; // Using rank as a proxy for "newest"
      return 0;
    });

  const staggerItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  // Hover animation variants for list items
  const backgroundHoverVariants = {
    initial: { scaleY: 0, originY: 0 }, // Start with no height, origin at top
    hover: {
      scaleY: 1,
      originY: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    }, // Expand from top to bottom
    exit: {
      scaleY: 0,
      originY: 1,
      transition: { duration: 0.3, ease: "easeIn" },
    }, // Shrink from bottom to top
  };

  return (
    <main className="min-h-screen bg-white text-[#2d2d2d] overflow-x-hidden">
      {/* Community Detail Modals - separate for mobile and desktop */}
      <MobileCommunityModal
        community={selectedCommunity}
        isOpen={isModalOpen}
        onClose={closeCommunityModal}
      />
      <DesktopCommunityModal
        community={selectedCommunity}
        isOpen={isModalOpen}
        onClose={closeCommunityModal}
      />

      {/* Navbar */}
      <Navbar
        viewMode={viewMode}
        toggleViewMode={toggleViewMode}
        showViewToggle={true}
      />

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          {/* Search Bar */}
          <div className="relative mb-4 md:mb-8 border border-gray-200 rounded-full overflow-hidden w-full max-w-[calc(60rem+2rem)]">
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full py-3 pl-6 pr-32 text-xs md:text-sm focus:outline-none bg-white text-[#2d2d2d] placeholder:text-gray-500 placeholder:text-[8px] md:placeholder:text-[12px] placeholder:font-normal"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-[#2d2d2d] text-white rounded-full px-3 md:px-4 py-1 md:py-1.5 text-[10px] md:text-xs flex items-center">
              <Search className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1 md:mr-1.5" />
              Ask MataConnect
            </button>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex justify-between mb-6 md:mb-12 w-full max-w-[calc(60rem+2rem)]">
            {/* Sort Dropdown */}
            <div className="relative w-[32%]">
              <button
                onClick={() => toggleDropdown("sort")}
                className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-200 rounded-full text-sm"
              >
                <span>
                  {sortOrder === "rank"
                    ? "Featured First"
                    : sortOrder === "name"
                    ? "A-Z"
                    : "Newest First"}
                </span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              {activeDropdown === "sort" && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                      onClick={() => selectSortOrder("rank")}
                    >
                      Featured First
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                      onClick={() => selectSortOrder("name")}
                    >
                      A-Z
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                      onClick={() => selectSortOrder("newest")}
                    >
                      Newest First
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Location Dropdown */}
            <div className="relative w-[32%]">
              <button
                onClick={() => toggleDropdown("location")}
                className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-200 rounded-full text-sm"
              >
                <span>{selectedLocation || "Location"}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              {activeDropdown === "location" && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2 max-h-60 overflow-y-auto">
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                      onClick={() => selectLocation(null)}
                    >
                      All Locations
                    </button>
                    {locations.map((location, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                        onClick={() => selectLocation(location)}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Categories Dropdown */}
            <div className="relative w-[32%]">
              <button
                onClick={() => toggleDropdown("categories")}
                className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-200 rounded-full text-sm"
              >
                <span>{selectedCategory || "Categories"}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              {activeDropdown === "categories" && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2 max-h-60 overflow-y-auto">
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                      onClick={() => selectCategory(null)}
                    >
                      All Categories
                    </button>
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                        onClick={() => selectCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {viewMode === "list" ? (
        <>
          {/* Communities Table - Desktop - Full Width */}
          <section ref={tableRef} className="hidden md:block w-full py-8 mb-0">
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
                <tbody className="text-xs">
                  {filteredCommunities.map((community, index) => (
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
                </tbody>
              </table>
            </div>
          </section>

          {/* Communities List - Mobile */}
          <section className="block md:hidden w-full py-6 mb-0">
            <div className="space-y-0">
              {filteredCommunities.map((community) => (
                <motion.div
                  key={community.id}
                  variants={staggerItem}
                  onClick={() => openCommunityModal(community)}
                  className="border-t border-gray-200 py-4 grid grid-cols-3 text-[8px] px-4 cursor-pointer relative group"
                  initial="initial"
                  whileHover="hover"
                  exit="exit"
                >
                  <div className="font-medium relative z-10 transition-colors duration-300 group-hover:text-[#F6E6D3]">
                    {community.name}
                  </div>
                  <div className="text-center relative z-10 transition-colors duration-300 group-hover:text-[#F6E6D3]">
                    #{community.category}
                  </div>
                  <div className="text-right relative z-10 transition-colors duration-300 group-hover:text-[#F6E6D3]">
                    {community.website}
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-[#262626]"
                    variants={backgroundHoverVariants}
                  ></motion.div>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      ) : (
        // Grid View
        <section ref={tableRef} className="w-full py-8 mb-0 px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <div
                key={community.id}
                className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openCommunityModal(community)}
              >
                {/* Brown top border */}
                <div className="h-1 bg-[#3D1D00] w-full"></div>

                <div className="p-6">
                  {/* Community Name */}
                  <h3 className="text-xl font-serif mb-4">{community.name}</h3>

                  {/* Description */}
                  <p className="text-sm mb-8">{community.description}</p>

                  {/* Footer with category and website link */}
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs">#{community.category}</span>
                    <a
                      href="#"
                      className="text-xs flex items-center hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                    >
                      VISIT WEBSITE
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="container mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0"
      >
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/mata-connect-logo.svg"
            alt="Mata Connect"
            width={120}
            height={24}
            className="h-6 w-auto"
          />
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
            <span className="bg-[#f6e6d3] px-3 py-1 rounded-full text-[#2d2d2d] font-medium">
              www.x.com/ahruf_
            </span>
          </motion.a>
        </div>
      </motion.footer>
    </main>
  );
}
