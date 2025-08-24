"use client"

import GlowButton from "./glow-button"
import NavLink from "./nav-link"

export default function Header() {
  return (
    <header className="relative z-50 flex items-start justify-between pt-3 px-3">
      {/* Logo */}
      <div className="flex items-center ml-2">
        <img
          src="/WEC-logo.png"
          alt="Women Empowerment Cell Logo"
          className="h-20 w-auto"
        />
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-4 mt-2 ml-4 relative z-50">
        <NavLink href="/">
          Home
        </NavLink>
        <NavLink href="/blog">
          Blog
        </NavLink>
        <NavLink href="/about">
          About
        </NavLink>
        <NavLink href="/admin">
          Admin
        </NavLink>
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
