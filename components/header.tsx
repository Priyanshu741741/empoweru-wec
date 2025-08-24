"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import GlowButton from "./glow-button"
import NavLink from "./nav-link"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/crossword", label: "Crossword" },
    { href: "/about", label: "About" },
    { href: "/admin", label: "Admin" },
  ]

  if (isMobile) {
    return (
      <header className="relative z-50 flex items-center justify-between pt-3 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="cursor-pointer">
            <img
              src="/WEC-logo.png"
              alt="Women Empowerment Cell Logo"
              className="h-16 w-auto"
            />
          </a>
        </div>

        {/* About Link and Mobile Menu */}
        <div className="flex items-center gap-4">
          <NavLink href="/about" className="instrument text-lg">
            About Us
          </NavLink>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="h-6 w-6 text-white" />
                <span className="sr-only">Open menu</span>
              </button>
            </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[300px] sm:w-[400px] bg-black/70 backdrop-blur-md border-white/20"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-6 mt-6">
              {navigationItems.map((item) => (
                <NavLink 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="instrument text-xl hover:text-white/90 transition-all duration-300"
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-6 flex justify-center">
                <GlowButton 
                  variant="primary" 
                  onClick={() => {
                    setIsOpen(false)
                    window.location.href = '/publish'
                  }}
                  className="w-auto px-6 py-2 instrument text-sm opacity-70 hover:opacity-90 transition-opacity duration-300"
                >
                  Publish
                </GlowButton>
              </div>
            </nav>
          </SheetContent>
          </Sheet>
        </div>
      </header>
    )
  }

  return (
    <header className="relative z-50 flex items-start justify-between pt-3 px-3">
      {/* Logo */}
      <div className="flex items-center ml-2">
        <a href="/" className="cursor-pointer">
          <img
            src="/WEC-logo.png"
            alt="Women Empowerment Cell Logo"
            className="h-20 w-auto"
          />
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-4 mt-2 ml-4 relative z-50">
        {navigationItems.map((item) => (
          <NavLink key={item.href} href={item.href}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Publish Button */}
      <div className="relative flex items-center mt-2 mr-2">
        <GlowButton variant="primary" onClick={() => window.location.href = '/publish'}>
          Publish
        </GlowButton>
      </div>
    </header>
  )
}
