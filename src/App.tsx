import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Departments from './components/Departments';
import Services from './components/Services';
import Doctors from './components/Doctors';
import Gallery from './components/Gallery';
import LatestUpdates from './components/LatestUpdates';
import AppointmentForm from './components/AppointmentForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Modal from './components/Modal';
import { Bell, ChevronDown } from 'lucide-react';
import { FAQS, HOSPITAL_INFO } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedDoctorName, setSelectedDoctorName] = useState('');
  const [aboutSubTab, setAboutSubTab] = useState<'hospital' | 'directors' | 'why-choose'>('hospital');
  const [notification, setNotification] = useState<string | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  // Scroll spy to highlight current active navigation link
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const sections = ['home', 'about', 'departments', 'services', 'doctors', 'gallery', 'updates', 'contact'];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show customized action-trigger notification toast
  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const openAppointmentModal = () => {
    setIsAppointmentOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentOpen(false);
    setSelectedDoctorName('');
  };

  const handleNavigation = (id: string) => {
    if (id === 'appointment') {
      openAppointmentModal();
      return;
    }

    let targetId = id;
    
    // Manage About Us sub-tab navigation directly from Navbar dropdown!
    if (id === 'about-hospital') {
      setAboutSubTab('hospital');
      targetId = 'about';
      triggerNotification('Navigating to About Hospital Story');
    } else if (id === 'about-directors') {
      setAboutSubTab('directors');
      targetId = 'about';
      triggerNotification('Navigating to Managing Directors Message');
    } else if (id === 'about-why-choose') {
      setAboutSubTab('why-choose');
      targetId = 'about';
      triggerNotification('Navigating to competitive medical advantages');
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(targetId);
    }
  };

  const handleSelectDoctor = (doctorName: string) => {
    setSelectedDoctorName(doctorName);
    triggerNotification(`Active Booking: ${doctorName}`);
    openAppointmentModal();
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 antialiased font-sans">
      
      {/* Premium Notification Toast bar */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 animate-fade-in">
          <div className="bg-slate-950/90 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 max-w-sm">
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4 text-blue-500 animate-pulse" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider">{notification}</p>
          </div>
        </div>
      )}

      {/* Sticky Glass Navbar */}
      <Navbar onNavigate={handleNavigation} onOpenAppointment={openAppointmentModal} activeSection={activeSection} />

      {/* Hero Section */}
      <Hero onOpenAppointment={openAppointmentModal} onNavigate={handleNavigation} />

      {/* Interactive About Us Section (Includes Story, Managing Directors, Why Choose Us with dropdown) */}
      <AboutUs initialTab={aboutSubTab} key={aboutSubTab} />

      {/* Clinical Departments Grid */}
      <Departments onNavigate={handleNavigation} />

      {/* Specialized Services */}
      <Services onNavigate={handleNavigation} />

      {/* Senior Consultant Surgeons */}
      <Doctors onSelectDoctor={handleSelectDoctor} />

      {/* Masonry Image & Video Gallery */}
      <Gallery />

      {/* Latest Updates & Camps */}
      <LatestUpdates onNavigate={handleNavigation} />

      {/* FAQS SEGMENT */}
      <section className="py-12 bg-gradient-to-b from-slate-50 via-white to-blue-50/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-600/10 px-3.5 py-1.5 rounded-full">
              KNOWLEDGE HUB
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-3 font-normal">
              Get immediate, clear information on diagnostic services, laparoscopic benefits, and insurance pre-auth procedures.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white/70 glass-panel rounded-2xl border border-slate-100 shadow-sm p-5 [&_summary::-webkit-details-marker]:hidden transition-all duration-300"
              >
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-950 pr-4">
                    {faq.question}
                  </h3>
                  <span className="shrink-0 transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </span>
                </summary>
                <p className="text-xs text-slate-500 leading-relaxed font-normal mt-3 pt-3 border-t border-slate-100/60">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking Modal */}
      {isAppointmentOpen && (
        <Modal onClose={closeAppointmentModal}>
          <AppointmentForm
            selectedDoctorName={selectedDoctorName}
            onBookingSuccess={() => triggerNotification('Booking request recorded successfully!')}
            onClose={closeAppointmentModal}
          />
        </Modal>
      )}

      {/* Clinic Locations & Contact Form */}
      <Contact />

      {/* Emergency Strip Banner */}
      <div className="bg-rose-600 py-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-xs font-extrabold uppercase tracking-widest">
            🚨 24 Hours Emergency Ambulance Service Available:
          </span>
          <a
            href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
            className="bg-white text-rose-600 px-6 py-2 rounded-xl text-xs font-black tracking-wider hover:bg-slate-100 transition-colors shadow-lg"
          >
            CALL +91 {HOSPITAL_INFO.emergencyPhone}
          </a>
        </div>
      </div>

      {/* Luxury Footer */}
      <Footer onNavigate={handleNavigation} />

      {/* Float Actions Widgets (WhatsApp, Call, Scroll-to-top) */}
      <FloatingActions />
      
    </div>
  );
}
