import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Check, ExternalLink } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';

// ── Developer data ────────────────────────────────────────
const developers = [
  {
    id: 1,
    name: 'Feevol S. Into',
    photo: '/feevol_siyasat.png',
    linkedin: 'https://linkedin.com/in/feevolinto',
    email: 'fsinto@up.edu.ph',
  },
  {
    id: 2,
    name: 'Charles S. Solomon',
    photo: '/dev2.png',
    linkedin: 'https://www.linkedin.com/in/charles-solomon-34aa1b2a1/',
    email: 'solomon23charles@gmail.com',
  },
  {
    id: 3,
    name: 'Yuji B. Azuhata',
    photo: '/yuji_siyasat.png',
    linkedin: 'https://www.linkedin.com/in/yujiazuhata/',
    email: 'yujiazuhata1@gmail.com',
  },
];

// ── Stats data (hardcoded) ────────────────────────────────
const stats = [
  {
    id: 'total',
    label: 'UPLOADED THESES',
    count: '150+',
    sub: 'FROM ALL COLLEGES',
    bg: 'bg-[#8A1538]',
  },
  {
    id: 'csm',
    label: 'COLLEGE OF SCIENCES AND MATHEMATICS',
    count: '90+',
    sub: null,
    bg: 'bg-[#00512B]',
  },
  {
    id: 'chss',
    label: 'COLLEGE OF HUMANITIES AND SOCIAL SCIENCES',
    count: '30+',
    sub: null,
    bg: 'bg-[#00512B]',
  },
  {
    id: 'som',
    label: 'SCHOOL OF MANAGEMENT',
    count: '10+',
    sub: null,
    bg: 'bg-[#00512B]',
  },
];

// ── Copy button component ─────────────────────────────────
function CopyButton({
  value,
  icon,
}: {
  value: string;
  icon: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      title={copied ? 'Copied!' : `Copy ${value}`}
      className="relative w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
    >
      {copied ? <Check size={14} /> : icon}
    </button>
  );
}

function StatCard({
  bg,
  label,
  target,
  suffix = '+',
  sub,
  className = '',
}: {
  bg: string;
  label: string;
  target: number;
  suffix?: string;
  sub?: string | null;
  className?: string;
}) {
  const { count, ref } = useCountUp(target, 2000);

  return (
    <div
      ref={ref}
      className={`${bg} rounded-2xl p-4 flex flex-col justify-between ${className}`}
    >
      <p className="text-white font-optima font-bold text-[10px] md:text-[16px] tracking-wide leading-snug text-center">
        {label}
      </p>
      <div>
        <p className="text-[#EAA61A] font-optima font-bold text-3xl md:text-5xl leading-none tabular-nums text-center">
          {count}{suffix}
        </p>
        {sub && (
          <p className="text-[#EAA61A] text-[10px] md:text-xs font-bold tracking-widest mt-1 text-center">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Developer card ────────────────────────────────────────
function DeveloperCard({
  name,
  photo,
  linkedin,
  email,
}: {
  name: string;
  photo: string;
  linkedin: string;
  email: string;
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#7A1114] shadow-lg aspect-[3/4]">
      
      {/* Photo — fills entire card */}
      <img
        src={photo}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover object-top"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            'https://placehold.co/300x400/7A1114/ffffff?text=Photo';
        }}
      />

      {/* Bottom overlay — transparent to solid maroon */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#650522] via-[#650522]/80 to-transparent" />

      {/* Name + icons — on top of overlay */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 pb-5 z-10">
        <p className="text-white font-optima font-bold text-sm md:text-base tracking-wide text-center uppercase drop-shadow-md">
          {name}
        </p>
        <div className="flex items-center gap-3">
          <CopyButton
            value={linkedin}
            icon={<ExternalLink size={14} />}
          />
          <CopyButton
            value={email}
            icon={<Mail size={14} />}
          />
        </div>
      </div>

    </div>
  );
}

// ── Main AboutPage ────────────────────────────────────────
export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-5 md:px-8">

        {/* About Us */}
        <h2 className="text-[#7A1114] font-optima font-bold text-xl tracking-widest text-center border-b border-gray-200 pb-4 mb-8">
          ABOUT US
        </h2>

        <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center mb-16">
          University of the Philippines SIYASAT serves as the official
          institutional digital repository of the knowledge and scholarly
          outputs of UP Mindanao. It aims to provide wider dissemination
          and increase the visibility of the university's materials. This
          digital research repository was designed to centralize, preserve,
          and showcase undergraduate, postgraduate, and faculty theses of
          UP Mindanao. The platform aims to function as a publication-oriented
          system, enabling users — including undergraduate and postgraduate
          students, faculty members, and the general public — to access thesis
          abstracts, author information, and publication details, with optional
          integration of externally hosted full manuscripts. Incorporating
          administrative functionalities and structured cataloging features,
          the system aspires to transform fragmented physical archives into a
          sustainable, searchable, and technology-driven knowledge hub.
          Ultimately, UP SIYASAT seeks to immortalize institutional research
          contributions while fostering a more connected, efficient, and
          accessible academic research environment.
        </p>

    {/* Stats grid */}
    <div className="grid grid-cols-3 grid-rows-2 gap-4 mb-16" style={{ gridTemplateRows: '1fr 1fr' }}>

      {/* Left — total, spans 2 rows */}
      <StatCard
        bg={stats[0].bg}
        label={stats[0].label}
        target={150}
        sub={stats[0].sub}
        className="row-span-2 p-6 text-4xl md:text-6xl font-optima font-bold"
      />

      {/* CSM — row 1, col 2 */}
      <StatCard
        bg={stats[1].bg}
        label={stats[1].label}
        target={90}
      />

      {/* SOM — row 1, col 3 */}
      <StatCard
        bg={stats[3].bg}
        label={stats[3].label}
        target={10}
      />

      {/* CHSS — row 2, col 2 */}
      <StatCard
        bg={stats[2].bg}
        label={stats[2].label}
        target={30}
      />

      {/* Image card — row 2, col 3 */}
      <div className="rounded-2xl overflow-hidden bg-gray-200">
        <img
          src="/upmin.png"
          alt="UP Mindanao"
          className="w-full h-full object-cover"
        />
      </div>

    </div>

        {/* Developers */}
        <h2 className="text-[#7A1114] font-optima font-bold text-xl tracking-widest text-center border-b border-gray-200 pb-4 mb-8">
          THE DEVELOPERS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {developers.map(dev => (
            <DeveloperCard
              key={dev.id}
              name={dev.name}
              photo={dev.photo}
              linkedin={dev.linkedin}
              email={dev.email}
            />
          ))}
        </div>

      </div>
    </div>
  );
}