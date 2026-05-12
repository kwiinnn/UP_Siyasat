import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#8A1538] to-[#24050F] text-white pt-8 pb-8 px-5 md:px-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-6 md:h-3 bg-gradient-to-r from-[#062115] via-[#8A1538] to-[#24050F] z-40 shadow-inner" />
      {/* Background Baybayin Image */}
      <div className="absolute right-20 top-0 h-full opacity-80 pointer-events-none select-none overflow-hidden mix-blend-lighten">
        <img
          src="/baybayin.png"
          className="h-[120%] -mt-[10%] w-auto object-cover object-right opacity-50"
        />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col justify-between">
        {/* Left Section: Branding */}

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              src="/upminlogo.svg"
              alt="UP Mindanao Logo"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-abhaya text-[12px] tracking-wide opacity-90 leading-none">
              University of the Philippines
            </div>
            <div className="font-abhaya text-[26.5px] tracking-widest leading-none mt-1">
              MINDANAO
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 relative z-10 mt-8">
          <div className="space-y-6 flex flex-col justify-between">
            <div>
              <h2 className="font-optima text-5xl md:text-6xl font-medium tracking-wide text-[#FFD700] mb-4 md:mb-6">
                SIYASAT
              </h2>
              <p className="text-sm opacity-90 max-w-sm leading-relaxed">
                Official institutional digital repository of the knowledge and
                scholarly outputs of UP Mindanao
              </p>
            </div>

            <div className="pt-2 md:pt-4">
              <p className="font-optima text-lg opacity-90 pt-2 md:pt-4 inline-block">
                Shaping minds that shape the nation
              </p>
            </div>
          </div>

          {/* Right Section: Social Media */}

          <div className="md:pl-12 flex flex-col justify-between">
            <div className="mb-8 md:mb-12">
              <h3 className="font-optima text-xl font-bold text-white mb-2 tracking-wider">
                BROWSE
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/undergraduate"
                    className="hover:text-[#FFD700] transition-colors text-[#C5C5C5]"
                  >
                    Undergraduate Theses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faculty"
                    className="hover:text-[#FFD700] transition-colors text-[#C5C5C5]"
                  >
                    Faculty Theses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/postgraduate"
                    className="hover:text-[#FFD700] transition-colors text-[#C5C5C5]"
                  >
                    Postgraduate Theses
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-optima text-sm mb-2 mt-3">
                Explore <span className="text-[#FFD700]">@upmindanao</span> on
                Social Media
              </p>
              <div className="flex flex-wrap gap-2 md:gap-1">
                <a
                  href="https://www.facebook.com/UPMindanao/" target="_blank"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-all"
                >
                  <img src="/facebook.svg" alt="Facebook" className="w-8 h-8" />
                </a>
                <a
                  href="https://www.instagram.com/upmindanao/" target="_blank"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-all"
                >
                  <img
                    src="/instragram.svg"
                    alt="Instagram"
                    className="w-8 h-8"
                  />
                </a>

                <a
                  href="https://twitter.com/UPMindanao" target="_blank"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-all"
                >
                  <img
                    src="/twt.svg"
                    alt="X (Formerly Twitter)"
                    className="w-8 h-8"
                  />
                </a>

                <a
                  href=" https://www.linkedin.com/company/university-of-the-philippines-mindanao" target="_blank"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-all"
                >
                  <img src="/linkedin.svg" alt="LinkedIn" className="w-8 h-8" />
                </a>
                <a
                  href="https://www.tiktok.com/@upmindanao" target="_blank"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-all"
                >
                  <img src="/tiktok.svg" alt="TikTok" className="w-8 h-8" />
                </a>
                <a
                  href="https://www.youtube.com/@upmindanao1995" target="_blank"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-all"
                >
                  <img src="/youtube.svg" alt="YouTube" className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-5xl mx-auto mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] tracking-wide opacity-90">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
           <Link to="https://privacy.up.edu.ph/" target="_blank" rel="noopener noreferrer" 
           className="hover:underline text-[#979797]">
            Privacy
          </Link>
          <Link to="https://up.edu.ph/approved-acceptable-use-policy-for-information-technology-it-resources-of-the-up-system/" target="_blank" rel="noopener noreferrer" 
          className="hover:underline text-[#979797]">
            Acceptable Use
          </Link>
          <Link to="https://up.edu.ph/approved-acceptable-use-policy-for-information-technology-it-resources-of-the-up-system/" target="_blank" rel="noopener noreferrer" 
          className="hover:underline text-[#979797]">
            Policy
          </Link>
          <Link to="https://www.elsevier.com/legal/elsevier-website-terms-and-conditions" target="_blank" rel="noopener noreferrer"
          className="hover:underline text-[#979797]">
            Copyright
          </Link>
        </div>
        <div className="text-center md:text-left text-[#979797]">
          2026 University of the Philippines Mindanao Siyasat | Into Solomon
          Azuhata
        </div>
      </div>
    </footer>
  );
}
