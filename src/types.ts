export interface TimeSlot {
  start: number;
  end: number;
  default?: string;
}

export type TimeSlots = Record<string, TimeSlot>;

export interface GreetingConfig {
  locale: string;
  timeSlots: TimeSlots;
}

export interface TimeRange {
  startHour: number;
  endHour: number;
  greeting: string;
}

export interface LanguageData {
  dates?: Record<string, string>; // 如 "01-01": "新年快乐"
  weekdays?: Record<number, string>; // 如 6: "好好休息"
  timeslots: Record<string, string>; // 如 "morning": "上午好"
}

export interface GreetingOptions {
  locale?: string;
  timeSlots?: TimeSlots;
  languages?: Record<string, LanguageData>;
}
