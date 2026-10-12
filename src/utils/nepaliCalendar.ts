// Nepali Bikram Sambat (BS) Calendar Utilities
// Nepali months and their English phonetic transliterations & Devanagari
export interface NepaliMonth {
  index: number; // 1 to 12
  nameEn: string;
  nameNp: string;
  approxDays: number;
}

export const NEPALI_MONTHS: NepaliMonth[] = [
  { index: 1, nameEn: 'Baisakh', nameNp: 'वैशाख', approxDays: 31 },
  { index: 2, nameEn: 'Jestha', nameNp: 'जेठ', approxDays: 31 },
  { index: 3, nameEn: 'Ashadh', nameNp: 'असार', approxDays: 32 },
  { index: 4, nameEn: 'Shrawan', nameNp: 'साउन', approxDays: 32 },
  { index: 5, nameEn: 'Bhadra', nameNp: 'भदौ', approxDays: 31 },
  { index: 6, nameEn: 'Ashwin', nameNp: 'असोज', approxDays: 30 },
  { index: 7, nameEn: 'Kartik', nameNp: 'कात्तिक', approxDays: 30 },
  { index: 8, nameEn: 'Mangsir', nameNp: 'मंसिर', approxDays: 30 },
  { index: 9, nameEn: 'Poush', nameNp: 'पुस', approxDays: 30 },
  { index: 10, nameEn: 'Magh', nameNp: 'माघ', approxDays: 30 },
  { index: 11, nameEn: 'Falgun', nameNp: 'फागुन', approxDays: 30 },
  { index: 12, nameEn: 'Chaitra', nameNp: 'चैत', approxDays: 30 },
];

// Available starting years in Bikram Sambat (BS) from 2083 to 2093
export const NEPALI_YEARS = [2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093];

// Map standard Nepali calendar days count for modern years
export const NEPALI_DAYS_IN_MONTH: Record<number, number[]> = {
  2083: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2084: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2085: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  2086: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  2087: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2088: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2089: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  2090: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2091: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2092: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  2093: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
};

// Nepali numerals helper
export const toNepaliDigits = (num: number | string): string => {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (d) => nepaliDigits[Number(d)]);
};

// Get days count for a given BS year and month (1-indexed)
export const getDaysInNepaliMonth = (year: number, monthIndex: number): number => {
  const yearTable = NEPALI_DAYS_IN_MONTH[year];
  if (yearTable && yearTable[monthIndex - 1]) {
    return yearTable[monthIndex - 1];
  }
  return 30;
};

// Format Nepali date into clean label string
export const formatNepaliDate = (year: number, monthIndex: number, day: number): string => {
  const month = NEPALI_MONTHS.find((m) => m.index === monthIndex) || NEPALI_MONTHS[0];
  return `${day} ${month.nameEn} ${year} BS (${toNepaliDigits(day)} ${month.nameNp} ${toNepaliDigits(year)})`;
};

// Default current BS starting date (2083 BS onwards)
export const getDefaultNepaliDate = () => {
  const defaultYear = 2083;
  const defaultMonth = 1; // Baisakh
  const defaultDay = 1;
  return {
    year: defaultYear,
    month: defaultMonth,
    day: defaultDay,
    formatted: formatNepaliDate(defaultYear, defaultMonth, defaultDay),
  };
};
