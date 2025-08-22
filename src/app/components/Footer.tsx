"use client";

import Link from "next/link";
import Image from "next/image";

// Footer component for the website
export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative bg-[#f5f5f5] text-[#0C1A71] px-8 py-16 font-sans overflow-hidden"
    >

      {/* Decorative SVG background circles */}
      <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 opacity-50 pointer-events-none z-0">
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="380" cy="120" r="90" fill="rgba(135, 206, 250, 0.3)" />
          <circle cx="320" cy="260" r="120" fill="rgba(135, 206, 250, 0.3)" />
          <circle cx="450" cy="300" r="70" fill="rgba(135, 206, 250, 0.3)" />
          <circle cx="280" cy="400" r="100" fill="rgba(135, 206, 250, 0.3)" />
          <circle cx="200" cy="180" r="50" fill="rgba(135, 206, 250, 0.3)" />
        </svg>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">

        {/* Left column: Logo, description, social icons */}
        <div className="flex-1">
          {/* Company Logo */}
          <Image
            src="https://img.freepik.com/premium-vector/vision-vector-logo-vintage-template-illustration-design_1094201-139.jpg"
            alt="Your Logo"
            width={150}
            height={40}
          />

          {/* Short mission statement */}
          <p className="text-lg leading-relaxed text-[#0C1A71] max-w-sm mt-6">
            Our mission is to democratize computational drug discovery tools and empower researchers and organizations worldwide.
          </p>

          {/* Social media/contact icons */}
          <div className="mt-6 flex space-x-4">
            {/* WhatsApp */}
            <div
              aria-label="WhatsApp"
              className="inline-flex items-center justify-center border border-[#0C1A71] rounded-full p-2 text-[#0C1A71]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M20.52 3.48A11.8 11.8 0 0012 0C5.37 0 0 5.37 0 12a11.92 11.92 0 002.08 6.52L0 24l5.6-2.12A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52zm-8.4 17.32a9.68 9.68 0 01-5.14-1.52l-.36-.21-3.32 1.26 1.25-3.24-.23-.34A9.71 9.71 0 012.4 12c0-5.37 4.36-9.74 9.72-9.74 2.6 0 5.05 1.02 6.89 2.88a9.7 9.7 0 012.83 6.85c0 5.38-4.36 9.74-9.74 9.74zm5.26-7.14c-.29-.15-1.72-.85-1.98-.95-.26-.1-.45-.15-.64.15-.19.3-.74.95-.9 1.15-.16.19-.32.22-.61.07-.29-.15-1.23-.45-2.35-1.44-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.44.13-.59.13-.13.29-.32.44-.48.15-.16.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.55-.88-2.12-.23-.56-.46-.49-.64-.5-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.3-1 1-1 2.43 0 1.44 1.03 2.83 1.18 3.02.15.19 2.04 3.12 4.94 4.37.69.3 1.23.48 1.65.62.69.23 1.32.2 1.82.12.56-.09 1.72-.7 1.96-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33z" />
              </svg>
            </div>

            {/* Instagram */}
            <div
              aria-label="Instagram"
              className="inline-flex items-center justify-center border border-[#0C1A71] rounded-full p-2 text-[#0C1A71]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zm0 1.5h8.5a4.25 4.25 0 014.25 4.25v8.5a4.25 4.25 0 01-4.25 4.25h-8.5a4.25 4.25 0 01-4.25-4.25v-8.5a4.25 4.25 0 014.25-4.25zm8.37 2.25a1.12 1.12 0 11-2.25 0 1.12 1.12 0 012.25 0zm-4.12 1a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 1.5a3 3 0 110 6 3 3 0 010-6z" />
              </svg>
            </div>

            {/* Phone call */}
            <div
              aria-label="Call"
              className="inline-flex items-center justify-center border border-[#0C1A71] rounded-full p-2 text-[#0C1A71]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M6.62 10.79a15.09 15.09 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.54.57 1 1 0 011 1v3.58a1 1 0 01-1 1A16 16 0 013 5a1 1 0 011-1h3.58a1 1 0 011 1 11.36 11.36 0 00.57 3.54 1 1 0 01-.21 1.11l-2.32 2.14z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right column: Navigation links */}
        <div className="text-[#0C1A71] space-y-6">
          {[
            { label: "Home", href: "/", active: true },
            { label: "Goals", href: "/goals" },
            { label: "Projects", href: "/projects" },
            { label: "Contact Us", href: "/contact" },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              {/* Active indicator dot */}
              {item.active ? (
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              ) : (
                <span className="w-2 h-2"></span>
              )}
              <Link
                href={item.href}
                className={`text-lg hover:underline ${item.active ? "text-[#0C1A71]" : "text-[#0C1A71]/80"}`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>

      </div>

      {/* Footer bottom: Copyright and policies */}
      <div className="relative z-10 border-t border-[#0C1A71]/20 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-[#0C1A71]/70">
        <p>Copyright 2025© Atombeat, All Rights Reserved</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <span className="text-[#0C1A71]/30">·</span>
          <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
        </div>
      </div>

    </footer>
  );
}
