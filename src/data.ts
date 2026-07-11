import { Doctor, Department, MedicalService, GalleryItem, UpdateItem } from './types';

export const HOSPITAL_INFO = {
  name: 'Nilaya Urostone & Gynae-IVF Hospital',
  shortName: 'Nilaya Hospital',
  tagline: 'Trusted Urology, Advanced Gynaecology & IVF Center',
  address: 'NH-31, Khatopur, Infront of Puja Gas Agency, Begusarai, Bihar',
  phone: '9234633557',
  emergencyPhone: '9234633557',
  email: 'nilaya112001@gmail.com',
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
    name: 'Dr. Kislay Atharv',
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
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=500',
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
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400&h=500',
    timing: '10:30 AM - 2:30 PM | 4:30 PM - 6:30 PM',
    gender: 'female'
  }
];

export const DIRECTORS = [
  {
    name: 'Dr. Kislay Atharv',
    designation: 'Managing Director & Chief Urologist',
    message: 'At Nilaya Hospital, our mission is to deliver world-class super-specialty healthcare to the people of Begusarai and Bihar. By pairing state-of-the-art medical technology with highly precise surgical techniques, we ensure our patients receive treatment on par with major metro hospitals, combined with home-like compassion and affordability.',
    signature: 'Dr. K. Atharv',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=400'
  },
  {
    name: 'Dr. Nisha Kumari',
    designation: 'Co-Founder & Clinical Director (IVF/Gynae)',
    message: 'Parenthood is a beautiful journey, and our goal is to make advanced fertility treatments like IVF, IUI, and laparoscopic gynae surgery accessible to every family. We bring international protocols and clinical experience from premier institutions like LHMC New Delhi and Indira IVF directly to our local community with custom care plans.',
    signature: 'Dr. Nisha Kumari',
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300&h=400'
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'urology',
    name: 'Advanced Urology',
    description: 'Comprehensive medical and surgical management for kidney stones, prostate disorders, urinary infections, and male infertility issues with cutting-edge lasers.',
    icon: 'Stethoscope',
    color: 'from-blue-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=300&h=200',
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
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=200',
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
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=300&h=200',
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
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=300&h=200',
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
    id: 'emergency',
    title: '24/7 Trauma & Emergency',
    description: 'Equipped to handle acute urological conditions, emergency cesareans, appendicitis, and critical trauma cases with round-the-clock specialists.',
    icon: 'Flame',
    tag: 'Emergency',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: 'laser-urology',
    title: 'Holmium Laser Stone Removal',
    description: 'State-of-the-art Holmium Laser for completely sutureless, painless, and rapid dissolution of kidney and ureteral stones.',
    icon: 'Sparkles',
    tag: 'Advanced Tech',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: 'ivf-lab',
    title: 'Advanced IVF Cleanroom Lab',
    description: 'Heads-up incubator systems, highly filtered cleanrooms, and computerized embryo tracking to achieve maximum success rates.',
    icon: 'FlameKindling',
    tag: 'Success Oriented',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: 'modular-ot',
    title: 'Modular Operation Theatre',
    description: 'Laminar air flows, HEPA filters, and high-definition laparoscopic towers to minimize postoperative infections and ensure safety.',
    icon: 'Layers',
    tag: 'Surgical Safety',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: 'pathology',
    title: 'In-House Pathology Lab',
    description: 'Comprehensive, fully-automated hematology, biochemistry, and hormone analysis with digital reports sent straight to your phone.',
    icon: 'Thermometer',
    tag: '24 Hours',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: 'cashless',
    title: 'Cashless TPA Insurance',
    description: 'Empaneled with major government and private insurance networks (TPA) for seamless cashless treatment.',
    icon: 'CreditCard',
    tag: 'Financial Comfort',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=300&h=200'
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'g-ext',
    title: 'Nilaya Hospital Modern Elevation',
    category: 'facility',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g-ot',
    title: 'Ultra-Clean Modular Operation Theatre',
    category: 'facility',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g-ivf',
    title: 'State-of-the-art IVF Embryology Lab',
    category: 'equipment',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g-recept',
    title: 'Premium Glassmorphic Patient Reception',
    category: 'facility',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g-room',
    title: 'Private Patient Recovery Suite',
    category: 'facility',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g-usg',
    title: 'Advanced 3D/4D Color Doppler Ultrasound',
    category: 'equipment',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'v-tour',
    title: 'Nilaya Hospital Cinematic 3D Walkthrough Tour',
    category: 'facility',
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4', // Premium placeholder video
    thumbnail: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'v-testimonial',
    title: 'Successful IVF Journey - Patient Testimonial',
    category: 'success',
    type: 'video',
    url: 'https://www.w3schools.com/html/movie.mp4', // Premium placeholder video
    thumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800'
  }
];

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
    description: 'Dr. Kislay Atharv successfully performed a sutureless Laser RIRS procedure to crush a complex 22mm staghorn calculus in a 58-year-old patient, who was discharged within 24 hours.',
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
