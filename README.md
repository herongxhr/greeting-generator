# Greeting Generator

A lightweight, framework-agnostic TypeScript library to generate dynamic greetings based on time, date, and weekday. Supports multi-language configurations and customizable time slots.

## Installation

```bash
npm install greeting-generator
```

## Usage

### Basic Example

```javascript
import { GreetingGenerator } from "greeting-generator";

// Initialize with default settings (Chinese, 'zh-CN')
const greeter = new GreetingGenerator();

// Generate a greeting based on the current time, date, and weekday
console.log(greeter.generateGreeting()); // e.g., "早上好" (if morning)

// Switch language to English
greeter.setLocale("en-US");
console.log(greeter.generateGreeting()); // e.g., "Good morning" (if morning)
```

### Custom Configuration

You can customize the language and time slots when creating an instance:

```javascript
import { GreetingGenerator } from 'greeting-generator';
import { type Composer } from 'vue-i18n'
import i18n from '@/locales'

const greeter = new GreetingGenerator({
  locale: 'zh-CN',
  languages: {
       'ja-JP': {
        timeslots: {
          morning: 'おはよう',
          afternoon: 'こんにちは',
          evening: 'こんばんは',
          night: 'おやすみ',
        },
        dates: {
          '01-01': '新年おめでとう',
        },
        weekdays: {
          0: '日曜日',
        },
      },
    'zh-CN': {
      weekdays: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' },
    },
  },
})

const greeting = computed(() => {
  const locale = (i18n.global as Composer).locale.value
  greeter.setLocale(locale) // 切换语言
  return greeter.generateGreeting()
})

```

### Features

- **Dynamic Greetings**: Generates greetings based on time of day (e.g., "Good morning"), special dates (e.g., "Happy New Year"), and weekdays (e.g., "Happy Monday").
- **Multi-Language Support**: Comes with default languages (e.g., 'zh-CN', 'en-US') and allows custom language definitions.
- **Customizable Time Slots**: Define your own time ranges for morning, afternoon, evening, and night.
- **Framework-Agnostic**: Works in any JavaScript environment (Node.js, browsers, etc.).

## Configuration

### `GreetingGenerator(options)`

Constructor options:

- `options.locale`: Initial language code (default: `'zh-CN'`). Must match a key in `languages`.
- `options.timeSlots`: Custom time slot definitions (default: morning 6-12, afternoon 12-18, evening 18-22, night 22-6).
  - Format: `{ [key: string]: { start: number; end: number } }`.
- `options.languages`: Custom language data to override or extend defaults.
  - Format: `{ [locale: string]: { timeslots: Record<string, string>, dates?: Record<string, string>, weekdays?: Record<number, string> } }`.

### Default Language Pack

The library includes default greetings for `zh-CN` and `en-US`. You can extend or override them via the `languages` option. Example structure from `languages.ts`:

```javascript
{
  'zh-CN': {
    timeslots: {
      morning: '早上好',
      afternoon: '下午好',
      evening: '晚上好',
      night: '晚安'
    },
    dates: {
      '01-01': '新年快乐'
    },
    weekdays: {
      0: '星期日'
    }
  },
  'en-US': {
    timeslots: {
      morning: 'Good morning',
      afternoon: 'Good afternoon',
      evening: 'Good evening',
      night: 'Good night'
    },
    dates: {
      '01-01': 'Happy New Year'
    },
    weekdays: {
      0: 'Sunday'
    }
  }
}
```

## API

### Methods

- **`generateGreeting(): string`**  
  Generates a greeting based on the current date, weekday, and time. Combines date, weekday, and time slot parts (if defined), joined by spaces.

  - Example: `"新年快乐 星期日 早上好"` (if it's January 1st, Sunday, morning).

- **`setLocale(locale: string): void`**  
  Switches to a different language. Throws an error if the locale is not found in the language pack.
  - Example: `greeter.setLocale('en-US')`.

## Notes

- The greeting consists of three parts: date (e.g., "Happy New Year"), weekday (e.g., "Sunday"), and time slot (e.g., "Good morning"). Empty parts are omitted.
- Time slots are evaluated based on a 24-hour clock, with special handling for the "night" slot (spanning midnight).

## License

MIT
