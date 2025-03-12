import { LanguageData } from "./types";
export function getLanguages(): Record<string, LanguageData> {
  return {
    "zh-CN": {
      timeslots: {
        morning: "早上好",
        afternoon: "下午好",
        evening: "晚上好",
        night: "晚安",
      },
      dates: {
        "03-11": "今天是3月11日",
      },
      weekdays: {
        "0": "星期日愉快",
        "1": "星期一愉快",
        "2": "星期二愉快",
        "3": "星期三愉快",
        "4": "星期四愉快",
        "5": "星期五愉快",
        "6": "星期六愉快",
      },
    },
    "en-US": {
      timeslots: {
        morning: "Good morning",
        afternoon: "Good afternoon",
        evening: "Good evening",
        night: "Good night",
      },
      dates: {
        "03-11": "Today is March 11",
      },
      weekdays: {
        "0": "Happy Sunday",
        "1": "Happy Monday",
        "2": "Happy Tuesday",
        "3": "Happy Wednesday",
        "4": "Happy Thursday",
        "5": "Happy Friday",
        "6": "Happy Saturday",
      },
    },
  };
}
