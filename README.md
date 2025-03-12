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

const greeter = new GreetingGenerator({ locale: 'zh' });

greeter.startAutoUpdate((greeting) => {
  console.log(greeting);
});

// Customize greeting
greeter.setCustomGreeting('morning', '超棒的早晨！');

// Switch language
greeter.setLocale('en');
```

### Features

- Dynamic greetings based on time (e.g., "Good morning"), weekday (e.g., "Happy Monday"), and special dates (e.g., "Happy New Year").
- Multi-language support (default: English and Chinese).
- Customizable greetings with localStorage persistence.
- Framework-agnostic (works with any JavaScript environment).

## API

### `GreetingGenerator(options)`

- `options.locale`: Initial language (default: 'zh').
- `options.updateInterval`: Update interval in milliseconds (default: 60000).

### Methods

- `generateGreeting(): string` - Generate the current greeting.
- `setCustomGreeting(key: string, value: string): void` - Set a custom greeting.
- `startAutoUpdate(callback: (greeting: string) => void): void` - Start auto-updating the greeting.
- `setLocale(locale: string): boolean` - Switch language.
- `stopAutoUpdate(): void` - Stop auto-update.

## License

MIT
