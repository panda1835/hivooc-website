"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

export default function TailorForm() {
  const t = useTranslations('TailorForm');

  return (
    <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm max-w-4xl mx-auto text-branding-green">
      <h2 className="text-3xl md:text-4xl font-medium mb-6">{t('title')}</h2>
      
      <ul className="list-disc pl-5 mb-8 space-y-2 text-base opacity-90">
        <li>{t('description1')}</li>
        <li>{t('description2')}</li>
      </ul>

      <form className="space-y-8">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-medium">{t('firstName')} <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder={t('enterFirstName')} 
              className="w-full p-3 border border-gray-200 rounded bg-gray-50/30 focus:outline-none focus:border-branding-green focus:ring-1 focus:ring-branding-green/20 transition-colors placeholder:text-gray-400" 
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium">{t('lastName')} <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder={t('enterLastName')} 
              className="w-full p-3 border border-gray-200 rounded bg-gray-50/30 focus:outline-none focus:border-branding-green focus:ring-1 focus:ring-branding-green/20 transition-colors placeholder:text-gray-400" 
            />
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-medium">{t('phoneNumber')} <span className="text-red-500">*</span></label>
            <input 
              type="tel" 
              placeholder={t('enterPhoneNumber')} 
              className="w-full p-3 border border-gray-200 rounded bg-gray-50/30 focus:outline-none focus:border-branding-green focus:ring-1 focus:ring-branding-green/20 transition-colors placeholder:text-gray-400" 
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium">{t('email')} <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              placeholder={t('enterEmail')} 
              className="w-full p-3 border border-gray-200 rounded bg-gray-50/30 focus:outline-none focus:border-branding-green focus:ring-1 focus:ring-branding-green/20 transition-colors placeholder:text-gray-400" 
            />
          </div>
        </div>

        {/* Have you been to Vietnam before? */}
        <div className="space-y-3">
          <label className="block font-medium">{t('visitedVietnam')} <span className="text-red-500">*</span></label>
          <div className="flex gap-8">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="radio" name="visited_vietnam" className="peer appearance-none w-5 h-5 border border-gray-300 rounded-full checked:border-branding-green checked:border-2 transition-colors" />
                <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-branding-green scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
              <span className="group-hover:text-branding-green/80 transition-colors">{t('yes')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="radio" name="visited_vietnam" className="peer appearance-none w-5 h-5 border border-gray-300 rounded-full checked:border-branding-green checked:border-2 transition-colors" />
                <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-branding-green scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
              <span className="group-hover:text-branding-green/80 transition-colors">{t('no')}</span>
            </label>
          </div>
        </div>

        {/* Type of experience */}
        <div className="space-y-3">
          <label className="block font-medium">{t('experienceType')} <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-8">
            {[t('byExperiences'), t('byDestination'), t('dontKnowYet')].map((item) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                   <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-300 rounded checked:bg-branding-green checked:border-branding-green transition-colors" />
                   <svg className="absolute inset-0 m-auto w-3.5 h-3.5 text-white scale-0 peer-checked:scale-100 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                   </svg>
                </div>
                <span className="group-hover:text-branding-green/80 transition-colors">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Which experiences (Tours) */}
        <div className="space-y-3">
          <label className="block font-medium">{t('interestedExperiences')} <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
             {[t('sonTraTours'), t('primateTours'), t('birdingTours'), t('wildlifeNorth'), t('wildlifeSouth')].map((item) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                   <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-300 rounded checked:bg-branding-green checked:border-branding-green transition-colors" />
                   <svg className="absolute inset-0 m-auto w-3.5 h-3.5 text-white scale-0 peer-checked:scale-100 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                   </svg>
                </div>
                <span className="group-hover:text-branding-green/80 transition-colors">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* When to travel */}
        <div className="space-y-3">
          <label className="block font-medium">{t('travelDate')} <span className="text-red-500">*</span></label>
          <div className="flex gap-8">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="radio" name="know_travel_date" className="peer appearance-none w-5 h-5 border border-gray-300 rounded-full checked:border-branding-green checked:border-2 transition-colors" />
                <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-branding-green scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
              <span className="group-hover:text-branding-green/80 transition-colors">{t('yes')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="radio" name="know_travel_date" className="peer appearance-none w-5 h-5 border border-gray-300 rounded-full checked:border-branding-green checked:border-2 transition-colors" />
                <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-branding-green scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
              <span className="group-hover:text-branding-green/80 transition-colors">{t('no')}</span>
            </label>
          </div>
        </div>

        {/* Companions */}
        <div className="space-y-3">
          <label className="block font-medium">{t('companions')} <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-8">
            {[t('solo'), t('myFamily'), t('myFriends'), t('myPartner')].map((item) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                   <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-300 rounded checked:bg-branding-green checked:border-branding-green transition-colors" />
                   <svg className="absolute inset-0 m-auto w-3.5 h-3.5 text-white scale-0 peer-checked:scale-100 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                   </svg>
                </div>
                <span className="group-hover:text-branding-green/80 transition-colors">{item}</span>
              </label>
            ))}
          </div>
        </div>

      </form>
    </div>
  );
}
