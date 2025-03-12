import { TimeSlot, LanguageData, GreetingOptions } from "./types";
import { getLanguages } from "./languages";

export class GreetingGenerator {
  private locale: string;
  private languages: Record<string, LanguageData>;
  private language: LanguageData;
  private timeSlots: Record<string, TimeSlot>;
  constructor(options?: GreetingOptions) {
    this.locale = options?.locale ?? "zh-CN";
    this.timeSlots = options?.timeSlots ?? {
      morning: { start: 6, end: 12 },
      afternoon: { start: 12, end: 18 },
      evening: { start: 18, end: 22 },
      night: { start: 22, end: 6 },
    };

    const defaultLanguages = getLanguages();
    if (options?.languages) {
      const newLanguages = Object.fromEntries(
        Object.entries(options.languages).map(([locale, language]) => {
          const defaultLanguage = defaultLanguages[locale];
          return [
            locale,
            {
              timeslots: {
                ...defaultLanguage.timeslots,
                ...(language?.timeslots ?? {}),
              },
              dates: {
                ...defaultLanguage.dates,
                ...(language?.dates ?? {}),
              },
              weekdays: {
                ...defaultLanguage.weekdays,
                ...(language?.weekdays ?? {}),
              },
            },
          ];
        })
      );
      this.languages = { ...defaultLanguages, ...newLanguages };
    } else {
      this.languages = defaultLanguages;
    }

    this.language = this.languages[this.locale];
    if (!this.language) throw new Error(`Language '${this.locale}' not found.`);
  }

  private getCurrentDate(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}-${day}`;
  }

  private getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  private getCurrentTimeSlot(date: Date): string {
    const hour = date.getHours();
    for (const [slot, { start, end }] of Object.entries(this.timeSlots)) {
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

  public generateGreeting(): string {
    const currentDate = new Date();
    const date = this.getCurrentDate(currentDate);
    const day = this.getDayOfWeek(currentDate);
    const timeSlot = this.getCurrentTimeSlot(currentDate);

    const datePart = this.language.dates?.[date] || "";
    const dayPart = this.language.weekdays?.[day] || "";
    const timePart = this.language.timeslots?.[timeSlot];

    return [datePart, dayPart, timePart].filter(Boolean).join(" ");
  }

  public setLocale(locale: string) {
    const language = this.languages[locale];
    if (language) {
      this.language = language;
    } else {
      throw new Error(`Language '${locale}' not found.`);
    }
  }
}
