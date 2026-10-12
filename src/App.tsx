import React, { useState } from 'react';
import { BackgroundDots } from './components/BackgroundDots';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { AboutSection } from './components/AboutSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { StudioSection } from './components/StudioSection';
import { MetricsSection } from './components/MetricsSection';
import { IntegrationsSection } from './components/IntegrationsSection';
import { SecuritySection } from './components/SecuritySection';
import { DeliverablesSection } from './components/DeliverablesSection';
import { InquirySection } from './components/InquirySection';
import { PricingSection } from './components/PricingSection';
import { CtaSection } from './components/CtaSection';
import { FooterSection } from './components/FooterSection';
import { BookingModal } from './components/BookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPlanForBooking, setSelectedPlanForBooking] = useState('01. Brand Identity');

  const handleOpenBooking = (planOrService?: string) => {
    if (planOrService) {
      setSelectedPlanForBooking(planOrService);
    } else {
      setSelectedPlanForBooking('01. Brand Identity');
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-[#6495ED] selection:text-white relative">
      {/* Background Dots with Cornflower Blue accents */}
      <BackgroundDots />

      {/* Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Hero Section with 2x Enlarged Headline, 2x Holographic Globe, Tight Fit without gaps */}
        <HeroSection onOpenBooking={handleOpenBooking} />

        {/* About Us: Vision, Mission, Goals, Kathmandu Roots & Agency Principles */}
        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        {/* How We Work: 6 Sequential Steps (Requirement Gathering to Support & Maintenance) */}
        <HowItWorksSection onOpenBooking={() => handleOpenBooking()} />

        {/* 01–12 Complete Services / Capabilities List */}
        <FeaturesSection onOpenBooking={handleOpenBooking} />

        {/* Our Studio: Rooted in Kathmandu, Nepal & Industries We Serve */}
        <StudioSection />

        {/* Results you can measure & Kathmandu, Nepal live clock */}
        <MetricsSection />

        {/* Tools & Platforms Section with animated transparent PNGs (design software tools.png & tech stack.png) */}
        <IntegrationsSection />

        {/* Principles & Standards of Craft */}
        <SecuritySection />

        {/* Our Work: Case Study Deliverables Interactive Code Terminal */}
        <DeliverablesSection />

        {/* Packages & Pricing (Investment Packages): Essentials NPR 2,500, Growth NPR 3,500, Enterprise Custom */}
        <PricingSection onOpenBooking={handleOpenBooking} />

        {/* Direct Client Inquiry Desk: Dedicated Client Inquiry Form & Instant PDF Letterhead Receipt Generator (Placed below Investment Packages) */}
        <InquirySection initialService={selectedPlanForBooking} />

        {/* 3D ASCII Tetrahedron Interactive CTA Section */}
        <CtaSection onOpenBooking={() => handleOpenBooking('01. Brand Identity')} />
      </main>

      {/* Footer with info@bluecode.agency, +977 9715971505, bluecode.png logo */}
      <FooterSection />

      {/* Client Inquiry & Instant PDF Receipt Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedService={selectedPlanForBooking}
      />

      {/* Floating 24/7 WhatsApp Chat Support Widget */}
      <FloatingWhatsApp onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}
