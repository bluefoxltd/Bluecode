import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronDown, Check } from 'lucide-react';
import {
  NEPALI_MONTHS,
  NEPALI_YEARS,
  getDaysInNepaliMonth,
  toNepaliDigits,
  formatNepaliDate,
} from '../utils/nepaliCalendar';

interface NepaliDatePickerProps {
  value: string;
  onChange: (dateStr: string) => void;
  label?: string;
  required?: boolean;
}

export const NepaliDatePicker: React.FC<NepaliDatePickerProps> = ({
  value,
  onChange,
  label = 'Preferred Project Starting Date (Nepali BS Calendar)',
  required = false,
}) => {
  // Default values: 2083 BS, Month 1 (Baisakh), Day 1
  const [selectedYear, setSelectedYear] = useState<number>(2083);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial value if present
  useEffect(() => {
    if (!value) {
      const defaultDateStr = formatNepaliDate(2083, 1, 1);
      onChange(defaultDateStr);
    }
  }, [value, onChange]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recalculate max days in current selected year & month
  const daysInMonth = getDaysInNepaliMonth(selectedYear, selectedMonth);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // If selectedDay exceeds new month's days, adjust
  const handleYearChange = (y: number) => {
    setSelectedYear(y);
    const maxDays = getDaysInNepaliMonth(y, selectedMonth);
    const day = selectedDay > maxDays ? maxDays : selectedDay;
    if (day !== selectedDay) setSelectedDay(day);
    onChange(formatNepaliDate(y, selectedMonth, day));
  };

  const handleMonthChange = (m: number) => {
    setSelectedMonth(m);
    const maxDays = getDaysInNepaliMonth(selectedYear, m);
    const day = selectedDay > maxDays ? maxDays : selectedDay;
    if (day !== selectedDay) setSelectedDay(day);
    onChange(formatNepaliDate(selectedYear, m, day));
  };

  const handleDaySelect = (d: number) => {
    setSelectedDay(d);
    onChange(formatNepaliDate(selectedYear, selectedMonth, d));
  };

  const activeMonthObj = NEPALI_MONTHS.find((m) => m.index === selectedMonth) || NEPALI_MONTHS[0];

  return (
    <div className="space-y-1.5" ref={containerRef}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            {label} {required && '*'}
          </label>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#6495ED]/15 text-[#6495ED] font-bold">
            🇳🇵 BIKRAM SAMBAT (BS)
          </span>
        </div>
      )}

      {/* Main trigger button & input display */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-sm transition-all cursor-pointer text-left bg-slate-900 ${
            isOpen
              ? 'border-[#6495ED] ring-1 ring-[#6495ED] text-white shadow-md shadow-[#6495ED]/15'
              : 'border-slate-700/90 hover:border-slate-600 text-slate-200'
          }`}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-7 h-7 rounded-lg bg-[#6495ED]/20 text-[#6495ED] flex items-center justify-center shrink-0">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="font-semibold text-white">
                {value || formatNepaliDate(selectedYear, selectedMonth, selectedDay)}
              </span>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
              isOpen ? 'rotate-180 text-[#6495ED]' : ''
            }`}
          />
        </button>

        {/* Dropdown Calendar Picker Modal/Card */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 z-50 p-4 rounded-2xl bg-[#0B1020] border border-white/15 shadow-2xl shadow-black/80 backdrop-blur-xl animate-fade-in">
            {/* Year & Month selectors */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {/* Year Selector */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  BS Year (साल)
                </label>
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => handleYearChange(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-[#6495ED] cursor-pointer"
                  >
                    {NEPALI_YEARS.map((y) => (
                      <option key={y} value={y} className="bg-slate-900 text-white">
                        {y} BS ({toNepaliDigits(y)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Month Selector */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  BS Month (महिना)
                </label>
                <div className="relative">
                  <select
                    value={selectedMonth}
                    onChange={(e) => handleMonthChange(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-[#6495ED] cursor-pointer"
                  >
                    {NEPALI_MONTHS.map((m) => (
                      <option key={m.index} value={m.index} className="bg-slate-900 text-white">
                        {m.nameEn} ({m.nameNp})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Calendar header label */}
            <div className="flex items-center justify-between px-1 py-1.5 mb-2 border-b border-slate-800 text-xs">
              <span className="font-extrabold text-white text-xs">
                {activeMonthObj.nameEn} <span className="text-slate-400 font-normal">({activeMonthObj.nameNp})</span>, {selectedYear} BS
              </span>
              <span className="text-[11px] text-[#6495ED] font-mono font-semibold">
                {daysInMonth} Days
              </span>
            </div>

            {/* Days Grid in Nepali BS */}
            <div className="grid grid-cols-7 gap-1 max-h-48 overflow-y-auto p-0.5 custom-scrollbar">
              {daysArray.map((dayNum) => {
                const isSelected = dayNum === selectedDay;
                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => {
                      handleDaySelect(dayNum);
                      setIsOpen(false);
                    }}
                    className={`h-8 rounded-lg text-xs font-medium flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#6495ED] text-white font-bold shadow-md shadow-[#6495ED]/30 ring-1 ring-white/50 scale-105'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80'
                    }`}
                  >
                    <span className="leading-tight text-[11px]">{dayNum}</span>
                    <span className="text-[9px] text-slate-400 font-serif leading-none opacity-80">
                      {toNepaliDigits(dayNum)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick action bar */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/80 text-[11px]">
              <span className="text-slate-400">
                Selected: <strong className="text-white font-mono">{selectedDay} {activeMonthObj.nameEn} {selectedYear}</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 rounded-lg bg-[#6495ED]/20 hover:bg-[#6495ED]/30 text-[#6495ED] font-bold text-xs transition cursor-pointer flex items-center gap-1"
              >
                <Check className="w-3 h-3" />
                <span>Confirm</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
