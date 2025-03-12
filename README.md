# Greeting Generator

A framework-agnostic TypeScript library to generate dynamic greetings based on time, date, and weekday. Supports multi-language and custom greetings. This is framework-agnostic and can be used with all mainstream frameworks.

## Installation

```bash
npm install greeting-generator
```

## Usage

### Basic Example

```javascript
import { GreetingGenerator } from 'greeting-generator';
import { extendLanguage } from 'greeting-generator';

// Extend or initialize a language (required for default greetings)
extendLanguage('zh', {
  default: {
    morning: '早上好',
    afternoon: '下午好',
    evening: '晚上好',
    night: '晚安'
  },
  dates: {
    '01-01': '新年快乐',
    '12-25': '圣诞快乐'
  },
  weekdays: {
    0: [{ startHour: 6, endHour: 12, greeting: '周日早晨' }]
  }
});

const greeter = new GreetingGenerator({ locale: 'zh' });

greeter.startAutoUpdate((greeting) => {
  console.log(greeting);
});

// Customize greeting for a specific date
greeter.setCustomGreeting('2025-03-11', '特别的一天！');

// Switch language
greeter.setLocale('en');
```

### Features

- Dynamic greetings based on time (e.g., "Good morning"), weekday (e.g., "Happy Monday"), and special dates (e.g., "Happy New Year").
- Multi-language support (default: English and Chinese, extensible by users).
- Customizable greetings with localStorage persistence.
- Framework-agnostic (works with any JavaScript environment).
- Flexible language extension for any date, time slot, or weekday-specific time slots.

## Language Extension

You can easily extend the language pack to add new languages or customize greetings for specific dates, time slots, or weekdays. Default greetings (e.g., morning, afternoon) must be initialized using `extendLanguage` before creating a `GreetingGenerator` instance.

### Adding or Initializing a Language

```javascript
import { extendLanguage } from 'greeting-generator';

extendLanguage('ja', {
  default: {
    morning: 'おはよう',
    afternoon: 'こんにちは',
    evening: 'こんばんは',
    night: 'おやすみ'
  },
  dates: {
    '01-01': '新年おめでとう',
    '12-25': 'メリークリスマス'
  },
  weekdays: {
    0: [{ startHour: 6, endHour: 12, greeting: '日曜日おめでとう' }],
    1: [{ startHour: 9, endHour: 17, greeting: '月曜日頑張って' }]
  }
});
```

### Customizing Specific Dates

You can define greetings for any date (format: `YYYY-MM-DD` or `MM-DD`) with optional time slots:

```javascript
extendLanguage('zh', {
  dates: {
    '2025-03-11': '特别的一天', // Full-day greeting
    '2025-03-12': [
      { startHour: 8, endHour: 12, greeting: '上午学习' },
      { startHour: 13, endHour: 17, greeting: '下午工作' }
    ]
  }
});
```

### Customizing Weekday Time Slots

Define time-specific greetings for any day of the week (0 = Sunday, 6 = Saturday):

```javascript
extendLanguage('zh', {
  weekdays: {
    2: [
      { startHour: 9, endHour: 11, greeting: '周二会议' },
      { startHour: 14, endHour: 18, greeting: '周二加班' }
    ]
  }
});
```

## API

### `GreetingGenerator(options)`

- `options.locale`: Initial language (default: 'zh'). Must be initialized with `extendLanguage` beforehand.
- `options.updateInterval`: Update interval in milliseconds (default: 60000).

### Methods

- `generateGreeting(): string` - Generate the current greeting.
- `setCustomGreeting(key: string, value: string): void` - Set a custom greeting (e.g., key can be `2025-03-11` or `day_1`).
- `startAutoUpdate(callback: (greeting: string) => void): void` - Start auto-updating the greeting.
- `setLocale(locale: string): boolean` - Switch language. The locale must exist in the language pack.
- `stopAutoUpdate(): void` - Stop auto-update.

## License

MIT
