/**
 * Types and interfaces for Nilaya Urostone & Gynae-IVF Hospital website.
 */

export interface Doctor {
  id: string;
  name: string;
  hindiName?: string;
  title: string;
  qualifications: string[];
  specialties: string[];
  regNo: string;
  experience?: string;
  pastExperience?: string[];
  avatar: string;
  timing: string;
  gender: 'male' | 'female';
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  detailedServices: string[];
  color: string;
  image?: string;
}

export interface MedicalService {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag?: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'facility' | 'equipment' | 'video';
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface UpdateItem {
  id: string;
  title: string;
  date: string;
  category: 'camp' | 'news' | 'achievement' | 'health-tip';
  description: string;
  tag?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  reason: string;
  message?: string;
  status: 'pending' | 'confirmed';
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
