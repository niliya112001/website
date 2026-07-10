import React, { useState, useEffect } from 'react';
import { DOCTORS, DEPARTMENTS } from '../data';
import { Appointment } from '../types';
import { Calendar, User, Phone, Mail, Clock, HelpCircle, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';

interface AppointmentFormProps {
  selectedDoctorName?: string;
  onBookingSuccess: () => void;
}

export default function AppointmentForm({ selectedDoctorName = '', onBookingSuccess }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    age: '',
    gender: 'male',
    department: '',
    doctor: '',
    date: '',
    timeSlot: '10:30 AM - 12:30 PM',
    reason: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [bookedDetails, setBookedDetails] = useState<Appointment | null>(null);

  // If a doctor was selected externally, set it and auto-set the department!
  useEffect(() => {
    if (selectedDoctorName) {
      const doc = DOCTORS.find(d => d.name === selectedDoctorName);
      if (doc) {
        let deptId = '';
        if (doc.id === 'dr-kislay-atharv') deptId = 'urology';
        if (doc.id === 'dr-nisha-kumari') deptId = 'gynae-ivf';

        setFormData(prev => ({
          ...prev,
          doctor: doc.name,
          department: deptId
        }));
      }
    }
  }, [selectedDoctorName]);

  // Handle department change to auto-fill the correct chief doctor!
  const handleDeptChange = (deptId: string) => {
    let autoDoc = '';
    if (deptId === 'urology') autoDoc = 'Dr. Kislay Atharv';
    if (deptId === 'gynae-ivf') autoDoc = 'Dr. Nisha Kumari';
    if (deptId === 'laparoscopy') {
      // Both can do laparoscopic surgery, let's keep it open or suggest the female doctor for gynae, male for urology
      autoDoc = 'Dr. Kislay Atharv';
    }

    setFormData(prev => ({
      ...prev,
      department: deptId,
      doctor: autoDoc
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.patientName.trim()) newErrors.patientName = 'Patient Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.age || parseInt(formData.age) <= 0) newErrors.age = 'Enter a valid age';
    if (!formData.department) newErrors.department = 'Please select a clinical department';
    if (!formData.doctor) newErrors.doctor = 'Please select a consultant';
    if (!formData.date) newErrors.date = 'Preferred consultation date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate database secure reservation delay
    setTimeout(() => {
      const generatedAppointment: Appointment = {
        id: `APT-${Math.floor(100000 + Math.random() * 900000)}`,
        patientName: formData.patientName,
        phone: formData.phone,
        email: formData.email,
        age: parseInt(formData.age),
        gender: formData.gender as 'male' | 'female',
        department: formData.department,
        doctor: formData.doctor,
        date: formData.date,
        timeSlot: formData.timeSlot,
        reason: formData.reason,
        message: formData.message,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // Save to localStorage for historical persistence
      const currentList = JSON.parse(localStorage.getItem('nilaya_appointments') || '[]');
      currentList.push(generatedAppointment);
      localStorage.setItem('nilaya_appointments', JSON.stringify(currentList));

      setBookedDetails(generatedAppointment);
      setIsSubmitting(false);
      setShowSuccessCard(true);
      onBookingSuccess();

      // Reset form
      setFormData({
        patientName: '',
        phone: '',
        email: '',
        age: '',
        gender: 'male',
        department: '',
        doctor: '',
        date: '',
        timeSlot: '10:30 AM - 12:30 PM',
        reason: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <section
      id="appointment"
      className="py-12 bg-gradient-to-tr from-slate-50 via-blue-50/20 to-slate-100 relative overflow-hidden"
    >
      <div className="absolute top-1/3 right-1/10 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/10 w-96 h-96 bg-pink-400/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-600/10 px-3.5 py-1.5 rounded-full">
            SECURE CONSULTATION SLOT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Book Appointment Slot online
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 font-normal">
            Secure an verified, priority timing slot with our chief laparoscopic surgeons and IVF embryology specialists. No upfront payment required.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white/80 glass-panel rounded-[2.5rem] p-6 sm:p-10 border border-white shadow-2xl relative">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Patient Name & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              <div className="sm:col-span-8 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-500" />
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-medium text-sm transition-colors"
                />
                {errors.patientName && <span className="text-[10px] font-bold text-rose-500">{errors.patientName}</span>}
              </div>

              <div className="sm:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Age *
                </label>
                <input
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-medium text-sm transition-colors"
                />
                {errors.age && <span className="text-[10px] font-bold text-rose-500">{errors.age}</span>}
              </div>
            </div>

            {/* Row 2: Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-500" />
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-medium text-sm transition-colors"
                />
                {errors.phone && <span className="text-[10px] font-bold text-rose-500">{errors.phone}</span>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="yourname@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-medium text-sm transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Gender, Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['male', 'female', 'other'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`py-3.5 rounded-xl text-xs font-bold uppercase border transition-all cursor-pointer ${
                        formData.gender === g
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Medical Department *
                </label>
                <div className="relative">
                  <select
                    value={formData.department}
                    onChange={(e) => handleDeptChange(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-bold text-sm transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">-- Choose Specialization --</option>
                    {DEPARTMENTS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
                </div>
                {errors.department && <span className="text-[10px] font-bold text-rose-500">{errors.department}</span>}
              </div>
            </div>

            {/* Row 4: Assigned Surgeon, Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Assigned Specialty Surgeon
                </label>
                <div className="relative">
                  <select
                    value={formData.doctor}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-bold text-sm transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">-- Choose Surgeon --</option>
                    {DOCTORS.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.title.split(' & ')[1] || d.title.split(' & ')[0]})</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
                </div>
                {errors.doctor && <span className="text-[10px] font-bold text-rose-500">{errors.doctor}</span>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  Consultation Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-medium text-sm transition-colors cursor-pointer"
                />
                {errors.date && <span className="text-[10px] font-bold text-rose-500">{errors.date}</span>}
              </div>
            </div>

            {/* Row 5: Slot Selection, Brief Reason */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  Available Timing Slot
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['10:30 AM - 12:30 PM', '4:30 PM - 6:30 PM'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeSlot: slot })}
                      className={`py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-tight border transition-all cursor-pointer ${
                        formData.timeSlot === slot
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                  Brief Symptoms / Clinical Reason
                </label>
                <input
                  type="text"
                  placeholder="E.g. Kidney stone pain, IVF counseling"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-medium text-sm transition-colors"
                />
              </div>
            </div>

            {/* Row 6: Message text area */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Additional Message / Medical History
              </label>
              <textarea
                placeholder="Optional information about medications, previous operations, or questions"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500/50 focus:outline-none bg-white font-medium text-sm transition-colors resize-none"
              ></textarea>
            </div>

            {/* Submit button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wider text-sm shadow-xl hover:shadow-2xl hover:translate-y-[-2px] transition-all duration-300 disabled:opacity-50 glow-shadow-blue cursor-pointer uppercase flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                    <span>RESERVING SECURE SLOT...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4.5 h-4.5" />
                    <span>CONFIRM CONSULTATION timing</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Success Dialog Overlay */}
          {showSuccessCard && bookedDetails && (
            <div className="absolute inset-0 bg-white rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-between items-center text-center z-50 animate-fade-in">
              <div className="my-auto space-y-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-md border border-emerald-200">
                  <CheckCircle2 className="w-9 h-9 text-emerald-500" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    RESERVATION CONFIRMED
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 pt-2">Appointment Scheduled Successfully!</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Your appointment has been registered in the Nilaya Hospital local queue. Our reception staff will call you on your mobile to confirm.
                  </p>
                </div>

                {/* Receipt Widget */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 max-w-md mx-auto space-y-3 text-left">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400 border-b border-slate-200 pb-2">
                    <span>APPOINTMENT ID</span>
                    <span className="text-slate-900">{bookedDetails.id}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-xs font-medium">
                    <span className="text-slate-500">Patient:</span>
                    <span className="text-slate-900 font-bold text-right">{bookedDetails.patientName} ({bookedDetails.age} Yrs)</span>
                    
                    <span className="text-slate-500">Surgeon:</span>
                    <span className="text-slate-900 font-bold text-right">{bookedDetails.doctor}</span>
                    
                    <span className="text-slate-500">Date:</span>
                    <span className="text-slate-900 font-bold text-right">{bookedDetails.date}</span>
                    
                    <span className="text-slate-500">Timing:</span>
                    <span className="text-slate-900 font-bold text-right">{bookedDetails.timeSlot}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowSuccessCard(false)}
                className="w-full max-w-xs py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wider rounded-xl shadow-md transition-all cursor-pointer uppercase"
              >
                Close Receipt
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
