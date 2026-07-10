import React, { useState } from 'react';
import { HOSPITAL_INFO } from '../data';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-12 bg-gradient-to-b from-slate-50 via-white to-blue-50/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-600/10 px-3.5 py-1.5 rounded-full">
            CONNECT WITH US
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Our Location & Contact Centers
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 font-normal">
            Drop by for a clinical checkup or submit an online inquiry. Our clinical coordinators will respond within 30 minutes.
          </p>
        </div>

        {/* Contact Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left: Contact Info & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel bg-white/70 rounded-3xl p-6 sm:p-8 border border-white shadow-xl space-y-6">
              
              <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                Nilaya Consultation Centers
              </h3>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <MapPin className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Main Clinic Address</span>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed mt-0.5">{HOSPITAL_INFO.address}</p>
                  </div>
                </div>

                {/* Hotlines */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Phone className="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">OPD Hotline / Mobile</span>
                    <a href={`tel:${HOSPITAL_INFO.phone}`} className="text-xs font-bold text-blue-600 hover:underline mt-0.5 block">
                      +91 {HOSPITAL_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Mail className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Clinical Coordinator Email</span>
                    <a href={`mailto:${HOSPITAL_INFO.email}`} className="text-xs font-semibold text-slate-800 hover:underline mt-0.5 block">
                      {HOSPITAL_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Working hours */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Clock className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Consultation hours</span>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5 leading-relaxed">{HOSPITAL_INFO.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Frame */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200/50 aspect-video lg:aspect-square w-full max-h-[300px]">
              <iframe
                title="Google Maps"
                src={HOSPITAL_INFO.locationCoords.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right: Glass Inquiry Form */}
          <div className="lg:col-span-7 bg-white/80 glass-panel rounded-[2.5rem] p-6 sm:p-10 border border-white shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Send Direct Message
            </h3>

            {submitted ? (
              <div className="space-y-6 text-center py-10">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-sm border border-emerald-200">
                  <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-slate-900">Inquiry Sent Successfully!</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto font-normal">
                    Thank you. Your message has been routed to our executive Desk. We will call you back on your registered phone within 30 minutes.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase rounded-xl shadow-sm hover:bg-slate-800 cursor-pointer"
                >
                  Write New Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Name *</label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-medium text-xs transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="Mobile number"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-medium text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Email</label>
                    <input
                      type="email"
                      placeholder="Email ID"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-medium text-xs transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Subject</label>
                    <input
                      type="text"
                      placeholder="Inquiry topic"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-medium text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Message</label>
                  <textarea
                    placeholder="Enter message or medical questions"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-medium text-xs transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wider text-xs rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer uppercase glow-shadow-blue"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4.5 h-4.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
