import { Doctor, Department, MedicalService, GalleryItem, UpdateItem } from './types';
import {
  getDoctorPhoto,
  HOSPITAL_FACILITY_PHOTOS,
  HOSPITAL_FACILITY_FILENAMES,
  ADVANCED_EQUIPMENT_PHOTOS,
  ADVANCED_EQUIPMENT_FILENAMES,
  VIDEO_THUMBNAIL_PHOTOS,
  VIDEO_THUMBNAIL_FILENAMES,
  DEPARTMENT_IMAGES,
  SERVICE_IMAGES,
} from './assets/images';

export const HOSPITAL_INFO = {
  name: 'Nilaya Urostone & Gynae-IVF Hospital',
  shortName: 'Nilaya Hospital',
  tagline: 'Trusted Urology, Advanced Gynaecology & IVF Center',
  address: 'NH-31, Khatopur, Infront of Puja Gas Agency, Begusarai, Bihar',
  phone: '9234633557',
  emergencyPhone: '9234633557',
  email: 'info@nilayahospital.com',
  workingHours: '24 Hours Emergency | OPD: 10:00 AM - 6:00 PM (Mon - Sat)',
  locationCoords: {
    lat: 25.4334,
    lng: 86.1498,
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.81232821217!2d86.147611!3d25.4334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI2JzAwLjIiTiA4NsKwMDgnNTEuNCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
  }
};

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-kislay-atharv',
    name: 'Dr. Kishlaya Atharwa',
    hindiName: 'डॉ. किसलय अथर्व',
    title: 'Laparoscopic Surgeon & Urologist',
    qualifications: [
      'M.B.B.S.',
      'M.S. (General Surgery) - Kolkata',
      'M.Ch. (Urology) - GMCH'
    ],
    specialties: [
      'Laparoscopic Surgery',
      'Advanced Urology (Urosurgeon)',
      'Male Infertility Specialist'
    ],
    regNo: '61688',
    experience: '12+ Years of Surgical Excellence',
    avatar: getDoctorPhoto(0),
    timing: '10:00 AM - 2:00 PM | 4:00 PM - 6:00 PM',
    gender: 'male'
  },
  {
    id: 'dr-nisha-kumari',
    name: 'Dr. Nisha Kumari',
    hindiName: 'डॉ. निशा कुमारी',
    title: 'Laparoscopic Surgeon & IVF Specialist',
    qualifications: [
      'M.B.B.S. - Lady Hardinge Medical College (LHMC), New Delhi',
      'D.N.B. (Obstetrics & Gynecology) - Kolkata',
      'Fellowship in Infertility'
    ],
    specialties: [
      'Laparoscopic Surgery & Hysteroscopy',
      'In-Vitro Fertilization (IVF) Specialist',
      'High-Risk Pregnancy & Gynaecology'
    ],
    regNo: '64199',
    experience: '10+ Years of Fertility & Gynae Expertise',
    pastExperience: [
      'Ex- IVF Consultant (Indira IVF)',
      'Ex- IVF Consultant (Seeds of Innocence)'
    ],
    avatar: getDoctorPhoto(1),
    timing: '10:30 AM - 2:30 PM | 4:30 PM - 6:30 PM',
    gender: 'female'
  }
];

export const DIRECTORS = [
  {
    name: 'Dr. Kishlaya Atharwa',
    designation: 'Managing Director & Chief Urologist',
    message: 'At Nilaya Hospital, our mission is to deliver world-class super-specialty healthcare to the people of Begusarai and Bihar. By pairing state-of-the-art medical technology with highly precise surgical techniques, we ensure our patients receive treatment on par with major metro hospitals, combined with home-like compassion and affordability.',
    signature: 'Dr. K. Atharv',
    avatar: getDoctorPhoto(0)
  },
  {
    name: 'Dr. Nisha Kumari',
    designation: 'Co-Founder & Clinical Director (IVF/Gynae)',
    message: 'Parenthood is a beautiful journey, and our goal is to make advanced fertility treatments like IVF, IUI, and laparoscopic gynae surgery accessible to every family. We bring international protocols and clinical experience from premier institutions like LHMC New Delhi and Indira IVF directly to our local community with custom care plans.',
    signature: 'Dr. Nisha Kumari',
    avatar: getDoctorPhoto(1)
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'urology',
    name: 'Advanced Urology',
    description: 'Comprehensive medical and surgical management for kidney stones, prostate disorders, urinary infections, and male infertility issues with cutting-edge lasers.',
    icon: 'Stethoscope',
    color: 'from-blue-500 to-cyan-500',
    image: DEPARTMENT_IMAGES.urology,
    detailedServices: [
      'Laser Kidney Stone Treatment (URSL, PCNL, RIRS)',
      'Laser Prostate Surgery (HoLEP, TURP)',
      'Male Infertility & Erectile Dysfunction therapy',
      'Reconstructive Urology & Uro-Oncology',
      'Urinary Tract Infection (UTI) specialty care',
      'Pediatric Urology & Congenital anomalies management'
    ]
  },
  {
    id: 'gynae-ivf',
    name: 'IVF & Gynaecology',
    description: 'World-class reproductive medicine and fertility solutions including IVF, ICSI, and IUI, coupled with premium obstetric care for a safe motherhood journey.',
    icon: 'Heart',
    color: 'from-pink-500 to-purple-500',
    image: DEPARTMENT_IMAGES.gynaeIvf,
    detailedServices: [
      'In-Vitro Fertilization (IVF) & Embryo Transfer',
      'Intracytoplasmic Sperm Injection (ICSI)',
      'Intrauterine Insemination (IUI)',
      'High-Risk Pregnancy Care & Painless Delivery',
      'Polycystic Ovary Syndrome (PCOS) management',
      'Uterine Fibroids & Endometriosis therapy'
    ]
  },
  {
    id: 'laparoscopy',
    name: 'Laparoscopic Surgery',
    description: 'Minimally invasive keyhole surgeries for appendix, gallbladder, hernia, and gynae conditions, ensuring faster recovery and minimal scarring.',
    icon: 'Activity',
    color: 'from-emerald-500 to-teal-500',
    image: DEPARTMENT_IMAGES.laparoscopy,
    detailedServices: [
      'Laparoscopic Cholecystectomy (Gallbladder Stone)',
      'Laparoscopic Appendectomy (Appendix removal)',
      'Advanced Hernia Repair (IPOM, TEP, TAPP)',
      'Laparoscopic Hysterectomy (Uterus removal)',
      'Laparoscopic Myomectomy (Fibroid removal)',
      'Diagnostic Laparoscopy & Hysteroscopy'
    ]
  },
  {
    id: 'diagnostics',
    name: 'Diagnostics & Radiology',
    description: 'Equipped with digital high-frequency X-Ray, high-resolution ultrasound, and an in-house laboratory to provide quick, reliable diagnostics.',
    icon: 'Shield',
    color: 'from-indigo-500 to-violet-500',
    image: DEPARTMENT_IMAGES.diagnostics,
    detailedServices: [
      '3D/4D High-Resolution Obstetrical Ultrasound',
      'Digital high-frequency X-Ray',
      'Semen Analysis & IVF Lab diagnostics',
      'Fully Automated Pathology Laboratory',
      'Urodynamic studies for bladder assessment',
      'Hysterosalpingography (HSG) for tubal testing'
    ]
  }
];

export const SERVICES: MedicalService[] = [
  {
    id: 'advanced-urology',
    title: 'Advanced Urology',
    description: 'Comprehensive management of prostate disorders, urinary infections, reconstructive urology, and male infertility issues by senior urosurgeons.',
    icon: 'Stethoscope',
    tag: 'Specialty Care',
    image: SERVICE_IMAGES.advancedUrology
  },
  {
    id: 'laser-treatments',
    title: 'Holmium Laser Stone Removal & Laser Treatments',
    description: 'Advanced laser-based treatment for kidney stones and various urological conditions using modern Holmium Laser technology. ',
    icon: 'Sparkles',
    tag: 'Laser Tech',
    image: SERVICE_IMAGES.laserTreatments
  },
  {
    id: 'laparoscopic-surgery',
    title: 'Laparoscopic Surgery',
    description: 'Minimally invasive keyhole surgeries for appendix, gallbladder stones, hernia, and gynae conditions, ensuring faster post-op recovery.',
    icon: 'Layers',
    tag: 'Keyhole Surgery',
    image: SERVICE_IMAGES.laparoscopicSurgery
  },
  {
    id: 'ivf-fertility',
    title: 'IVF & Fertility Care',
    description: 'Comprehensive reproductive solutions including IVF, ICSI, IUI, and high-success embryology lab cleanroom setup.',
    icon: 'Heart',
    tag: 'Success Oriented',
    image: SERVICE_IMAGES.ivfFertility
  },
  {
    id: 'pregnancy-care',
    title: 'Advanced Pre & Post Pregnancy Care',
    description: 'Dedicated clinical care, fetal development tracking, high-risk pregnancy management, and compassionate postpartum support.',
    icon: 'Baby',
    tag: 'Obstetrics',
    image: SERVICE_IMAGES.pregnancyCare
  },
  {
    id: 'normal-delivery',
    title: 'Normal Delivery',
    description: 'Painless and natural delivery services under the supervision of highly experienced obstetricians and supportive maternity staff.',
    icon: 'HeartPulse',
    tag: 'Maternity',
    image: SERVICE_IMAGES.normalDelivery
  },
  {
    id: 'c-section',
    title: 'Caesarean Section (C-Section)',
    description: 'Planned and emergency Caesarean section deliveries performed in sterile modular OTs to ensure maximum maternal and fetal safety.',
    icon: 'Activity',
    tag: 'Surgical Birth',
    image: SERVICE_IMAGES.cSection
  },
  {
    id: 'diagnostics-imaging',
    title: 'Diagnostics & Imaging',
    description: 'Fully automated pathology laboratory, digital high-frequency X-Rays, and high-resolution 3D/4D ultrasound Doppler scans.',
    icon: 'Thermometer',
    tag: '24 Hours',
    image: SERVICE_IMAGES.diagnosticsImaging
  },
  {
    id: 'emergency-care',
    title: 'Emergency Care',
    description: 'Round-the-clock emergency medical response and critical trauma services staffed by senior super-specialty consultants.',
    icon: 'Flame',
    tag: 'Emergency',
    image: SERVICE_IMAGES.emergencyCare
  }
];

/**
 * Gallery items — dynamically generated from subfolders under src/assets/gallery/.
 *
 * Just drop files into:
 *   src/assets/gallery/hospital-facility/
 *   src/assets/gallery/advanced-equipment/
 *   src/assets/gallery/videos/
 *
 * Filenames are used to derive titles (e.g. "operation-theatre.jpg" → "Operation Theatre").
 */
function buildGalleryItems(): GalleryItem[] {
  const items: GalleryItem[] = [];

  const formatTitle = (rawName: string) => {
    return rawName
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // 1. Hospital Facility images
  HOSPITAL_FACILITY_PHOTOS.forEach((url, idx) => {
    const rawName = HOSPITAL_FACILITY_FILENAMES[idx] ?? `facility-${idx + 1}`;
    items.push({
      id: `facility-${idx}`,
      title: formatTitle(rawName),
      category: 'facility',
      type: 'image',
      url,
    });
  });

  // 2. Advanced Equipment images
  ADVANCED_EQUIPMENT_PHOTOS.forEach((url, idx) => {
    const rawName = ADVANCED_EQUIPMENT_FILENAMES[idx] ?? `equipment-${idx + 1}`;
    items.push({
      id: `equipment-${idx}`,
      title: formatTitle(rawName),
      category: 'equipment',
      type: 'image',
      url,
    });
  });

  // 3. Video thumbnails
  VIDEO_THUMBNAIL_PHOTOS.forEach((url, idx) => {
    const rawName = VIDEO_THUMBNAIL_FILENAMES[idx] ?? `video-${idx + 1}`;
    items.push({
      id: `video-${idx}`,
      title: formatTitle(rawName),
      category: 'video',
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4', // Keep existing play behavior
      thumbnail: url,
    });
  });

  return items;
}

export const GALLERY: GalleryItem[] = buildGalleryItems();

export const UPDATES: UpdateItem[] = [
  {
    id: 'up-1',
    title: 'Free Mega Urology & Infertility Health Camp',
    date: 'July 15, 2026',
    category: 'camp',
    description: 'Nilaya Hospital is organizing a free diagnostic and consultation camp for Kidney Stones, Prostate, and Infertility issues in Begusarai. Free Semen Analysis and USG scans for registered patients.',
    tag: 'Upcoming Camp'
  },
  {
    id: 'up-2',
    title: 'Successful Removal of 22mm Staghorn Kidney Stone via Laser',
    date: 'June 28, 2026',
    category: 'achievement',
    description: 'Dr. Kishlaya Atharwa successfully performed a sutureless Laser RIRS procedure to crush a complex 22mm staghorn calculus in a 58-year-old patient, who was discharged within 24 hours.',
    tag: 'Surgical Success'
  },
  {
    id: 'up-3',
    title: 'Nilaya IVF Celebrates 100+ Successful Pregnancies This Year',
    date: 'June 10, 2026',
    category: 'achievement',
    description: 'We are delighted to announce that our advanced cleanroom IVF lab has crossed the milestone of 100+ successful clinical pregnancies in 2026, bringing joy to couples struggling with infertility.',
    tag: 'Milestone'
  },
  {
    id: 'up-4',
    title: 'Laparoscopy vs. Traditional Surgery: Key Recovery Benefits',
    date: 'May 15, 2026',
    category: 'health-tip',
    description: 'Our specialists outline why laparoscopic keyhole surgery leads to 70% less post-op pain, minimal blood loss, and lets you return to daily activities in days instead of weeks.',
    tag: 'Health Tips'
  }
];

export const WHY_CHOOSE_US = [
  {
    id: 'wc-1',
    title: 'Super-Specialist Expertise',
    description: 'Our chief surgeons are alumni of premier national institutions (LHMC New Delhi, Kolkata, GMCH) with proven records in complex urology and IVF treatments.',
    icon: 'Award'
  },
  {
    id: 'wc-2',
    title: 'Sutureless Laser Procedures',
    description: 'Equipped with medical Holmium lasers that allow safe, non-invasive, bloodless kidney stone surgery with quick hospital discharge.',
    icon: 'Zap'
  },
  {
    id: 'wc-3',
    title: 'High IVF Success Rates',
    description: 'Advanced embryology cleanrooms and customized ovarian stimulation protocols designed to maximize clinical pregnancy rates.',
    icon: 'TrendingUp'
  },
  {
    id: 'wc-4',
    title: 'In-House Modular Care',
    description: 'From fully filtered Modular OTs and diagnostic ultrasound to advanced semen processing - everything is unified under one roof.',
    icon: 'Cpu'
  }
];

export const HEALTH_PACKAGES = [
  {
    name: 'Basic Kidney Stone Screening',
    price: '₹1,499',
    originalPrice: '₹3,000',
    features: ['Semen Analysis (for males)', 'Urine Routine & Microscopic', 'KFT (Kidney Function Test)', 'USG KUB (Kidney, Ureter, Bladder)', 'Specialist Consultation'],
    popular: false,
    color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20'
  },
  {
    name: 'Executive Fertility Assessment',
    price: '₹2,999',
    originalPrice: '₹6,000',
    features: ['Hormone Profiling (FSH, LH, AMH)', 'High-Resolution Pelvic USG', 'Semen Analysis (Computerized)', 'Tubal Patency Review', 'IVF Consultant Session'],
    popular: true,
    color: 'from-pink-500/10 to-purple-500/10 border-pink-500/20'
  },
  {
    name: 'Premium Laparoscopic Fit Screen',
    price: '₹1,999',
    originalPrice: '₹4,000',
    features: ['Complete Blood Count (CBC)', 'Random Blood Sugar', 'ECG (Heart Rhythm)', 'Chest X-Ray Reference', 'Surgical Specialist Consultation'],
    popular: false,
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20'
  }
];

export const FAQS = [
  {
    question: 'What makes laparoscopic surgery better than traditional open surgery?',
    answer: 'Laparoscopic surgery uses small keyhole incisions (5-10mm) instead of a large abdominal incision. This results in significantly less pain, minimal bleeding, smaller scars, and a much faster recovery. Most laparoscopic patients are discharged within 24 to 48 hours.'
  },
  {
    question: 'How do lasers remove kidney stones without open surgery?',
    answer: 'Using a procedure called RIRS or URSL, a thin optical fiber is passed into the urinary tract directly to the stone under high-definition camera guidance. The Holmium Laser is then activated to safely pulverize the stone into dust, which naturally washes out with urine. No cuts or stitches are required.'
  },
  {
    question: 'What is the success rate of IVF treatments at Nilaya Hospital?',
    answer: 'Our state-of-the-art Embryology Lab and customized clinical protocols allow us to maintain a high clinical pregnancy rate of 65% to 75% per embryo transfer cycle, depending on the maternal age and clinical profile. We also specialize in treating repeated IVF failures.'
  },
  {
    question: 'Do you offer cashless admission or empanelment with health insurances?',
    answer: 'Yes! We support cashless treatments through all major Third Party Administrators (TPA) and health insurance providers. Our dedicated billing desk will guide you through pre-authorization and documentation to ensure a seamless claim process.'
  }
];
