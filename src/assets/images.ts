/**
 * Centralized image asset registry — auto-detects files from asset folders.
 *
 * Drop any image into the folders below and it will be automatically picked up:
 *   src/assets/logo/       → website logo (first file found)
 *   src/assets/doctors/    → doctor profile photos (sorted by filename)
 *   src/assets/gallery/    → gallery photos (sorted by filename)
 *   src/assets/hero/       → hero background image (first file found)
 *   src/assets/icons/      → icon images keyed by filename (sorted)
 *
 * Supported formats: .png, .jpg, .jpeg, .webp, .svg (case-insensitive)
 * Missing images fall back to premium AI-generated placeholders or inline SVG.
 */

/* ─── Premium AI Placeholders (imported locally) ───────────────────────── */

import heroBgPlaceholder from './placeholders/hero_bg_placeholder.png';
import doctorMalePlaceholder from './placeholders/doctor_male_placeholder.png';
import doctorFemalePlaceholder from './placeholders/doctor_female_placeholder.png';
import facilityReceptionPlaceholder from './placeholders/facility_reception_placeholder.png';
import facilityOtPlaceholder from './placeholders/facility_ot_placeholder.png';
import equipmentDiagnosticsPlaceholder from './placeholders/equipment_diagnostics_placeholder.png';
import equipmentIvfPlaceholder from './placeholders/equipment_ivf_placeholder.png';
import buildingExteriorPlaceholder from './placeholders/building_exterior_placeholder.png';

export {
  heroBgPlaceholder,
  doctorMalePlaceholder,
  doctorFemalePlaceholder,
  facilityReceptionPlaceholder,
  facilityOtPlaceholder,
  equipmentDiagnosticsPlaceholder,
  equipmentIvfPlaceholder,
  buildingExteriorPlaceholder,
};

/* ─── Placeholder SVG ───────────────────────────────────────────────────── */

export const PLACEHOLDER_SVG =
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="none">
       <rect width="400" height="300" rx="12" fill="#e2e8f0"/>
       <text x="200" y="148" text-anchor="middle" font-family="Arial" font-size="14" fill="#94a3b8">Image Placeholder</text>
       <text x="200" y="170" text-anchor="middle" font-family="Arial" font-size="11" fill="#94a3b8">Drop your file here</text>
     </svg>`
  )}`;

/* ─── Helper: extract sorted resolved URLs from a glob result ───────────── */

function resolveGlob(
  modules: Record<string, { default: string }>,
): string[] {
  return Object.keys(modules)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .map((key) => modules[key].default);
}

/** Extract the filename (without extension) from a glob key like './icons/phone.svg' */
function filenameFromKey(key: string): string {
  const segments = key.split('/');
  const base = segments[segments.length - 1];
  return base.replace(/\.[^.]+$/, '');
}

/* ─── Logo ──────────────────────────────────────────────────────────────── */

const logoModules = import.meta.glob<{ default: string }>(
  './logo/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
  { eager: true },
);

const logoEntries = resolveGlob(logoModules);

/** First logo found, or inline SVG placeholder */
export const LOGO_SRC: string = logoEntries[0] ?? PLACEHOLDER_SVG;

/** Whether a real logo image was detected (vs. placeholder) */
export const HAS_LOGO: boolean = logoEntries.length > 0;

/* ─── Doctor Photos ─────────────────────────────────────────────────────── */

const doctorModules = import.meta.glob<{ default: string }>(
  './doctors/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
  { eager: true },
);

/** All doctor photos, sorted alphabetically by filename */
export const DOCTOR_PHOTOS: string[] = resolveGlob(doctorModules);

/** Return the photo at `index`, or the premium AI placeholder, or the inline SVG. */
export function getDoctorPhoto(index: number): string {
  if (DOCTOR_PHOTOS[index]) {
    return DOCTOR_PHOTOS[index];
  }
  // Return premium AI-generated portraits for Kishlaya Atharwa (index 0) and Nisha Kumari (index 1)
  return index === 0
    ? doctorMalePlaceholder
    : index === 1
    ? doctorFemalePlaceholder
    : PLACEHOLDER_SVG;
}

/* ─── Gallery Photos ────────────────────────────────────────────────────── */

const hospitalFacilityModules = import.meta.glob<{ default: string }>(
  './gallery/hospital-facility/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
  { eager: true },
);

export const HOSPITAL_FACILITY_PHOTOS: string[] = resolveGlob(hospitalFacilityModules);
export const HOSPITAL_FACILITY_FILENAMES: string[] = Object.keys(hospitalFacilityModules)
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  .map(filenameFromKey);

const advancedEquipmentModules = import.meta.glob<{ default: string }>(
  './gallery/advanced-equipment/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
  { eager: true },
);

export const ADVANCED_EQUIPMENT_PHOTOS: string[] = resolveGlob(advancedEquipmentModules);
export const ADVANCED_EQUIPMENT_FILENAMES: string[] = Object.keys(advancedEquipmentModules)
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  .map(filenameFromKey);

const videoThumbnailModules = import.meta.glob<{ default: string }>(
  './gallery/videos/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
  { eager: true },
);

export const VIDEO_THUMBNAIL_PHOTOS: string[] = resolveGlob(videoThumbnailModules);
export const VIDEO_THUMBNAIL_FILENAMES: string[] = Object.keys(videoThumbnailModules)
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  .map(filenameFromKey);

/** Return the gallery photo at `index`, or the placeholder if out of range. */
export function getGalleryPhoto(index: number): string {
  const allPhotos = [...HOSPITAL_FACILITY_PHOTOS, ...ADVANCED_EQUIPMENT_PHOTOS];
  return allPhotos[index] ?? PLACEHOLDER_SVG;
}

/* ─── Hero Backgrounds ──────────────────────────────────────────────────── */

const heroModules = import.meta.glob<{ default: string }>(
  './hero/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true },
);

/** All hero background images, sorted alphabetically */
export const HERO_BGS: string[] = resolveGlob(heroModules);

/** First hero background image found, or undefined */
export const HERO_BG: string | undefined = HERO_BGS[0];

/* ─── Icons ─────────────────────────────────────────────────────────────── */

const iconModules = import.meta.glob<{ default: string }>(
  './icons/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
  { eager: true },
);

/** Icons keyed by filename (without extension), e.g. { phone: '/assets/icons/phone.svg' } */
export const ICON_IMAGES: Record<string, string> = Object.keys(iconModules)
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  .reduce<Record<string, string>>((acc, key) => {
    acc[filenameFromKey(key)] = iconModules[key].default;
    return acc;
  }, {});

/** Get an icon by name (filename without extension), or `undefined` if not found */
export function getIcon(name: string): string | undefined {
  return ICON_IMAGES[name];
}

/* ─── Department / Service / About images ───────────────────────────────── */
/*
 * These sections use local icons when available (matched by filename key).
 * If no local icon matches, a premium AI illustration placeholder is used.
 * No external CDN / Unsplash URLs.
 */

const DEPARTMENT_PLACEHOLDERS: Record<string, string> = {
  urology: facilityOtPlaceholder,
  gynaeIvf: equipmentIvfPlaceholder,
  laparoscopy: facilityOtPlaceholder,
  diagnostics: equipmentDiagnosticsPlaceholder,
};

const SERVICE_PLACEHOLDERS: Record<string, string> = {
  emergency: facilityReceptionPlaceholder,
  laserUrology: facilityOtPlaceholder,
  ivfLab: equipmentIvfPlaceholder,
  modularOt: facilityOtPlaceholder,
  pathology: equipmentDiagnosticsPlaceholder,
  cashless: facilityReceptionPlaceholder,
};

const ABOUT_PLACEHOLDERS: Record<string, string> = {
  hospitalBuilding: buildingExteriorPlaceholder,
};

function buildImageMapWithAiFallbacks(
  keys: readonly string[],
  placeholders: Record<string, string>,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of keys) {
    result[key] = ICON_IMAGES[key] ?? placeholders[key] ?? PLACEHOLDER_SVG;
  }
  return result;
}

export const DEPARTMENT_IMAGES: Record<string, string> = buildImageMapWithAiFallbacks(
  ['urology', 'gynaeIvf', 'laparoscopy', 'diagnostics'],
  DEPARTMENT_PLACEHOLDERS,
);

export const SERVICE_IMAGES: Record<string, string> = buildImageMapWithAiFallbacks(
  ['emergency', 'laserUrology', 'ivfLab', 'modularOt', 'pathology', 'cashless'],
  SERVICE_PLACEHOLDERS,
);

export const ABOUT_IMAGES: Record<string, string> = buildImageMapWithAiFallbacks(
  ['hospitalBuilding'],
  ABOUT_PLACEHOLDERS,
);
