// src/GreetingGenerator.ts
import { GreetingConfig, GreetingOptions, Language } from "./types";

export class GreetingGenerator {
  private config: GreetingConfig;
  private customGreetings: Record<string, string>;
  private updateInterval: number;
  private intervalId: NodeJS.Timeout | null;

  constructor(options: GreetingOptions = {}) {
    this.config = {
      locale: options.locale || "zh",
      timeSlots: {
        morning: { start: 6, end: 12, default: "早上好" },
        afternoon: { start: 12, end: 18, default: "下午好" },
        evening: { start: 18, end: 22, default: "晚上好" },
        night: { start: 22, end: 6, default: "晚安" },
      },
      dayOfWeek: {
        0: { default: "周日快乐" },
        1: { default: "周一快乐" },
        2: { default: "周二快乐" },
        3: { default: "周三愉快" },
        4: { default: "周四加油" },
        5: { default: "周五好心情" },
        6: { default: "周六放松" },
      },
      specialDates: {
        "01-01": { default: "新年快乐" },
        "12-25": { default: "圣诞快乐" },
      },
      languages: {
        zh: {
          morning: "早上好",
          afternoon: "下午好",
          evening: "晚上好",
          night: "晚安",
          day_0: "周日快乐",
          day_1: "周一快乐",
          day_2: "周二快乐",
          day_3: "周三愉快",
          day_4: "周四加油",
          day_5: "周五好心情",
          day_6: "周六放松",
          "01-01": "新年快乐",
          "12-25": "圣诞快乐",
        },
        en: {
          morning: "Good morning",
          afternoon: "Good afternoon",
          evening: "Good evening",
          night: "Good night",
          day_0: "Happy Sunday",
          day_1: "Happy Monday",
          day_2: "Happy Tuesday",
          day_3: "Happy Wednesday",
          day_4: "Happy Thursday",
          day_5: "Happy Friday",
          day_6: "Happy Saturday",
          "01-01": "Happy New Year",
          "12-25": "Merry Christmas",
        },
      },
    };

    this.customGreetings = this.loadCustomGreetings() || {};
    this.updateInterval = options.updateInterval || 60000;
    this.intervalId = null;
  }

  // 获取当前时间段
  private getCurrentTimeSlot(): string {
    const hour = new Date().getHours();
    const slots = this.config.timeSlots;
    for (const [slot, { start, end }] of Object.entries(slots)) {
      const isNight = slot === "night";
      if (
        (isNight && (hour >= start || hour < end)) ||
        (!isNight && hour >= start && hour < end)
      ) {
        return slot;
      }
    }
    return "night";
  }

  // 获取当前星期
  private getDayOfWeek(): number {
    return new Date().getDay();
  }

  // 获取当前日期 (MM-DD 格式)
  private getCurrentDate(): string {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}-${day}`;
  }

  // 生成问候语
  public generateGreeting(): string {
    const locale = this.config.locale;
    const timeSlot = this.getCurrentTimeSlot();
    const dayOfWeek = this.getDayOfWeek();
    const currentDate = this.getCurrentDate();

    // 优先级: 自定义 > 特殊日期 > 星期 > 时间段
    const custom =
      this.customGreetings[`${locale}_${currentDate}`] ||
      this.customGreetings[`${locale}_day_${dayOfWeek}`] ||
      this.customGreetings[`${locale}_${timeSlot}`];
    if (custom) return custom;

    const lang: Language = this.config.languages[locale];
    const specialDateGreeting = lang[currentDate];
    if (specialDateGreeting) return specialDateGreeting;

    const dayGreeting = lang[`day_${dayOfWeek}`];
    if (dayGreeting) return dayGreeting;

    const timeGreeting =
      lang[timeSlot] || this.config.timeSlots[timeSlot].default;
    return timeGreeting;
  }

  // 允许用户自定义问候语
  public setCustomGreeting(key: string, value: string): void {
    this.customGreetings[`${this.config.locale}_${key}`] = value;
    this.saveCustomGreetings();
  }

  // 加载自定义问候语
  private loadCustomGreetings(): Record<string, string> | null {
    if (typeof localStorage === "undefined") return null; // 兼容非浏览器环境
    const stored = localStorage.getItem("customGreetings");
    return stored ? JSON.parse(stored) : null;
  }

  // 保存自定义问候语
  private saveCustomGreetings(): void {
    if (typeof localStorage === "undefined") return; // 兼容非浏览器环境
    localStorage.setItem(
      "customGreetings",
      JSON.stringify(this.customGreetings)
    );
  }

  // 开始自动更新
  public startAutoUpdate(callback: (greeting: string) => void): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      const greeting = this.generateGreeting();
      callback(greeting);
    }, this.updateInterval);
    // 立即调用一次
    callback(this.generateGreeting());
  }

  // 切换语言
  public setLocale(locale: string): boolean {
    if (this.config.languages[locale]) {
      this.config.locale = locale;
      this.customGreetings = this.loadCustomGreetings() || {};
      return true;
    }
    return false;
  }

  // 停止自动更新
  public stopAutoUpdate(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
