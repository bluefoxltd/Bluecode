import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { StudioSection } from './components/StudioSection';
import { MetricsSection } from './components/MetricsSection';
import { IntegrationsSection } from './components/IntegrationsSection';
import { SecuritySection } from './components/SecuritySection';
import { DeliverablesSection } from './components/DeliverablesSection';
import { PricingSection } from './components/PricingSection';
import { CtaSection } from './components/CtaSection';
import { FooterSection } from './components/FooterSection';
import { BookingModal } from './components/BookingModal';
import { DownloadModal } from './components/DownloadModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedPlanForBooking, setSelectedPlanForBooking] = useState('Enterprise Custom');

  const handleOpenBooking = (planOrService?: string) => {
    if (planOrService) {
      setSelectedPlanForBooking(planOrService);
    } else {
      setSelectedPlanForBooking('Enterprise Custom');
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#0A0D14] flex flex-col font-sans selection:bg-[#0052FF] selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenDownload={() => setDownloadModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with 3D ASCII Sphere and Live Marquee */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* 01-05 Services / Capabilities */}
        <FeaturesSection onOpenBooking={handleOpenBooking} />

        {/* 3-Step Process (Discover, Design, Launch) with Live Markdown Code Simulator */}
        <HowItWorksSection />

        {/* Our Studio: Rooted in Kathmandu, Nepal & Industries We Serve */}
        <StudioSection />

        {/* Results you can measure & Kathmandu, Nepal live clock */}
        <MetricsSection />

        {/* Tools & Production Ecosystem Infinite Dual-Marquee */}
        <IntegrationsSection />

        {/* Principles & Standards of Craft */}
        <SecuritySection />

        {/* Our Work: Case Study Deliverables Interactive Code Terminal */}
        <DeliverablesSection />

        {/* Packages & Pricing: Essentials NPR 2,500, Growth NPR 3,500, 20% annual discount, Enterprise Custom */}
        <PricingSection onOpenBooking={handleOpenBooking} />

        {/* 3D ASCII Tetrahedron Interactive CTA Section */}
        <CtaSection onOpenBooking={() => handleOpenBooking('General Consultation')} />
      </main>

      {/* Footer with Blue Code branding, Kathmandu, Nepal, and ASCII Wave matrix */}
      <FooterSection />

      {/* Interactive Consultation & WhatsApp Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedPlan={selectedPlanForBooking}
      />

      {/* cPanel Hosting Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      {/* Floating 24/7 WhatsApp Chat Support Widget */}
      <FloatingWhatsApp onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}
