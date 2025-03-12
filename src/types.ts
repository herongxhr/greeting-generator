// 时间段定义
export interface TimeSlot {
  start: number;
  end: number;
  default: string;
}

// 星期问候定义
export interface DayOfWeek {
  default: string;
}

// 特殊日期问候定义
export interface SpecialDate {
  default: string;
}

// 语言翻译
export interface Language {
  [key: string]: string;
}

// 配置选项
export interface GreetingConfig {
  locale: string;
  timeSlots: Record<string, TimeSlot>;
  dayOfWeek: Record<number, DayOfWeek>;
  specialDates: Record<string, SpecialDate>;
  languages: Record<string, Language>;
}

// 构造函数选项
export interface GreetingOptions {
  locale?: string;
  updateInterval?: number;
}
