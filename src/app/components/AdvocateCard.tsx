"use client";

import React, { useState } from "react";
import { Phone } from "lucide-react";

interface Advocate {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}
interface Props { advocate: Advocate; }

export function AdvocateCard({ advocate }: Props) {
  const [expanded, setExpanded] = useState(false);
  const maxTags = 5;
  const displayedTags = expanded
    ? advocate.specialties
    : advocate.specialties.slice(0, maxTags);

  return (
    <div className="relative bg-solace-bg rounded-3xl p-6 flex flex-col hover:shadow-3xl transition-shadow duration-300 dark:bg-gray-800">
      {/* Neon Glow Border */}
      <div className="absolute inset-0 pointer-events-none border-2 border-transparent rounded-3xl animate-pulse-slow gradient-border" />
      <div className="relative z-10 flex items-center space-x-4 mb-4">
        <div className="w-14 h-14 bg-gradient-to-tr from-pink-500 via-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-extrabold shadow-lg">
          {advocate.firstName[0]}{advocate.lastName[0]}
        </div>
        <div>
          <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">
            {advocate.firstName} {advocate.lastName}
          </h3>
          <p className="text-sm opacity-70 text-gray-700 dark:text-gray-300">
            {advocate.degree} • {advocate.city}
          </p>
        </div>
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-3 mb-3">
        {displayedTags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white text-sm font-semibold rounded-full shadow-md transition-transform duration-300 transform hover:-translate-y-1 hover:scale-110"
          >
            {tag}
          </span>
        ))}
      </div>
      {advocate.specialties.length > maxTags && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-pink-500 font-bold uppercase text-xs tracking-wider hover:text-pink-300 transition-colors duration-200"
          >
            {expanded ? 'Show Less ↑' : `+${advocate.specialties.length - maxTags} More ↓`}
          </button>
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-lg font-bold text-gray-900 opacity-90 dark:text-gray-100">
          {advocate.yearsOfExperience} yrs
        </span>
        <a
          href={`tel:${advocate.phoneNumber}`}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-400 transition-colors duration-200 dark:text-blue-300 dark:hover:text-blue-200"
        >
          <Phone className="w-6 h-6" />
          <span className="uppercase text-sm font-semibold">Call</span>
        </a>
      </div>
    </div>
  );
}
