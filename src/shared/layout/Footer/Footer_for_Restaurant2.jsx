import React from "react";

export default function Footer_for_Restaurant2() {
  const companyLinks = [
    { text: "About us", url: "https://www.swiggy.com/about" },
    { text: "Team", url: "https://www.swiggy.com/team" },
    { text: "Careers", url: "https://careers.swiggy.com/" },
    { text: "Swiggy One", url: "https://www.swiggy.com/swiggy-super" },
    { text: "Swiggy Corporate", url: "https://www.swiggy.com/corporate" },
    { text: "Swiggy Instamart", url: "https://www.swiggy.com/instamart" },
    { text: "Swiggy Dineout", url: "https://www.swiggy.com/dineout" },
    { text: "Swiggy Genie", url: "https://www.swiggy.com/genie" },
  ];

  const contactLinks = [
    { text: "Help & Support", url: "/support" },
    { text: "Partner with us", url: "https://partner.swiggy.com/" },
    { text: "Ride with us", url: "https://ride.swiggy.com/" },
  ];

  const legalLinks = [
    {
      text: "Terms & Conditions",
      url: "https://www.swiggy.com/terms-and-conditions",
    },
    { text: "Cookie Policy", url: "https://www.swiggy.com/cookie-policy" },
    { text: "Privacy Policy", url: "https://www.swiggy.com/privacy-policy" },
  ];

  const cities = [
    { text: "Bangalore", url: "https://www.swiggy.com/city/bangalore" },
    { text: "Gurgaon", url: "https://www.swiggy.com/city/gurgaon" },
    { text: "Hyderabad", url: "https://www.swiggy.com/city/hyderabad" },
    { text: "Delhi", url: "https://www.swiggy.com/city/delhi" },
    { text: "Mumbai", url: "https://www.swiggy.com/city/mumbai" },
    { text: "Pune", url: "https://www.swiggy.com/city/pune" },
    { text: "Kolkata", url: "https://www.swiggy.com/city/kolkata" },
    { text: "Chennai", url: "https://www.swiggy.com/city/chennai" },
  ];

  const followLinks = [
    { text: "Swiggy Blog", url: "https://blog.swiggy.com/" },
    { text: "Bug Bounty", url: "https://www.swiggy.com/bug-bounty" },
    { text: "Security", url: "https://www.swiggy.com/security" },
  ];

  const socialLinks = [
    {
      platform: "facebook",
      url: "https://www.facebook.com/swiggy.in",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/swiggyindia/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      platform: "twitter",
      url: "https://x.com/Swiggy",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },

    {
      platform: "linkedin",
      url: "https://www.linkedin.com/company/swiggy-in/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      platform: "pinterest",
      url: "https://www.pinterest.com/swiggyindia/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* App Download Banner */}
      <div className="bg-gradient-to-r from-[#fc8019] to-[#ffa726] py-10">
        <div className="max-w-[1200px] mx-auto px-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white rounded-2xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              For the love of great food
            </h2>
            <p className="text-lg opacity-90">
              Get the Swiggy app for a better experience
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://play.google.com/store/apps/details?id=in.swiggy.android&referrer=utm_source%3Dswiggy%26utm_medium%3Dheader"
              className="hover:opacity-90 transition-opacity"
            >
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/portal/m/play_store.png"
                alt="Get it on Google Play"
                className="h-12 md:h-14"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://apps.apple.com/in/app/swiggy-food-instamart-dineout/id989540920"
              className="hover:opacity-90 transition-opacity"
            >
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/portal/m/app_store.png"
                alt="Download on the App Store"
                className="h-12 md:h-14"
              />
            </a>
          </div>
        </div>
      </div>

      <footer className="bg-[#f5f5f5]">
        {/* Main Footer Content */}
        <div className="bg-white">
          <div className="max-w-[1200px] mx-auto px-4 py-12">
            {/* Brand Logo Row */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-[#e8e8e8]">
              <div className="flex items-center gap-3">
                <img
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_80/portal/m/logo_192x192.png"
                  alt="Swiggy"
                  className="w-12 h-12"
                />
                <span className="text-[#fc8019] text-2xl font-black tracking-tight">
                  SWIGGY
                </span>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Company */}
              <div>
                <h3 className="text-[#3d4152] font-bold text-sm uppercase tracking-wider mb-4">
                  Company
                </h3>
                <ul className="space-y-3 text-sm">
                  {companyLinks.map((link) => (
                    <li key={link.text}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#686b78] hover:text-[#fc8019] transition-colors"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-[#3d4152] font-bold text-sm uppercase tracking-wider mb-4">
                  Contact
                </h3>
                <ul className="space-y-3 text-sm">
                  {contactLinks.map((link) => (
                    <li key={link.text}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#686b78] hover:text-[#fc8019] transition-colors"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-[#3d4152] font-bold text-sm uppercase tracking-wider mb-4">
                  Legal
                </h3>
                <ul className="space-y-3 text-sm">
                  {legalLinks.map((link) => (
                    <li key={link.text}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#686b78] hover:text-[#fc8019] transition-colors"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* We deliver to */}

              <div>
                <h3 className="text-[#3d4152] font-bold text-sm uppercase tracking-wider mb-4">
                  We deliver to:
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {cities.map((city) => (
                    <a
                      key={city.text}
                      href={city.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#686b78] hover:text-[#3d4152] cursor-pointer hover:text-[#fc8019] transition-colors"
                    >
                      {city.text}
                    </a>
                  ))}
                </div>
                <button className="mt-4 text-sm text-[#fc8019] font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  <span>679+ cities</span>
                  <span className="text-xs">→</span>
                </button>
              </div>

              {/* Social & Follow us */}
              <div>
                <h3 className="text-[#3d4152] font-bold text-sm uppercase tracking-wider mb-4">
                  Follow us
                </h3>
                <div className="flex gap-4 mb-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-[#fc8019] hover:text-white transition-all group"
                      aria-label={`Follow us on ${social.platform}`}
                      title={`Follow on ${social.platform}`}
                    >
                      <span className="group-hover:scale-110 transition-transform">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
                <div className="space-y-3 text-sm">
                  {followLinks.map((link) => (
                    <a
                      key={link.text}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#686b78] hover:text-[#fc8019] transition-colors block"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
