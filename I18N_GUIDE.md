# 🌍 Internationalization Guide

## Overview

Stakelona now supports **4 languages**:
- **English** (en) - Default
- **Kazakh** (kk) - Қазақша  
- **Russian** (ru) - Русский
- **Spanish** (es) - Español

## Technology Stack

- **i18next** (v23.11.5) - Core i18n framework
- **react-i18next** (v14.1.2) - React bindings for i18next

## Project Structure

```
stakelona/
├── i18n/
│   ├── config.ts              # i18next configuration
│   └── locales/
│       ├── en.json            # English translations
│       ├── kk.json            # Kazakh translations
│       ├── ru.json            # Russian translations
│       └── es.json            # Spanish translations
├── components/
│   ├── I18nProvider.tsx       # i18n wrapper component
│   └── LanguageSwitcher.tsx   # Language selector UI
└── app/
    └── layout.tsx             # Wraps app with I18nProvider
```

## How It Works

### 1. Configuration (i18n/config.ts)

```typescript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
```

### 2. Translation Files

All translation keys are organized by sections:

**Example (en.json)**:
```json
{
  "nav": {
    "marketplace": "Marketplace",
    "stakingPools": "Staking Pools"
  },
  "marketplace": {
    "title": "Service Marketplace",
    "description": "Discover and access premium services..."
  }
}
```

### 3. Using Translations in Components

```typescript
import { useTranslation } from "react-i18next";

export default function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t("marketplace.title")}</h1>
      <p>{t("marketplace.description")}</p>
    </div>
  );
}
```

### 4. Translations with Variables

```typescript
// In JSON
{
  "serviceUsedSuccess": "Service used successfully! Cost: {{cost}} SOL"
}

// In Component
alert(t("marketplace.serviceUsedSuccess", { cost: 0.5 }));
```

## Language Switcher

The language switcher is located in the navigation bar (top right).

**Features**:
- Dropdown with flag icons
- Persistent selection (saved to localStorage)
- Instant language switching
- Visual indicator for current language

**Component**: `components/LanguageSwitcher.tsx`

```typescript
const languages = [
  { code: "en", name: "English" },
  { code: "kk", name: "Қазақша" },
  { code: "ru", name: "Русский" },
  { code: "es", name: "Español" },
];
```

## Translation Keys Structure

### Navigation (nav.*)
- `nav.marketplace` - Marketplace link
- `nav.stakingPools` - Staking Pools link
- `nav.serviceProvider` - Service Provider link
- `nav.myDashboard` - My Dashboard link

### Marketplace (marketplace.*)
- `marketplace.title` - Page title
- `marketplace.description` - Page description
- `marketplace.connectWallet` - Connect wallet message
- `marketplace.availableRewards` - Available rewards label
- `marketplace.totalStaked` - Total staked label
- `marketplace.activeServices` - Active services label
- `marketplace.allServices` - All services filter
- `marketplace.aiAgent` - AI Agent service type
- `marketplace.videoContent` - Video Content service type
- ... and more

### Staking (staking.*)
- `staking.title` - Page title
- `staking.description` - Page description
- `staking.apy` - APY label
- `staking.totalStaked` - Total staked label
- ... and more

### Provider (provider.*)
- `provider.title` - Page title
- `provider.description` - Page description
- `provider.registerNewService` - Register button
- ... and more

### Dashboard (dashboard.*)
- `dashboard.title` - Page title
- `dashboard.description` - Page description
- `dashboard.totalStaked` - Total staked label
- ... and more

### Common (common.*)
- `common.sol` - SOL token label
- `common.days` - Days label
- `common.loading` - Loading message
- `common.error` - Error message
- `common.success` - Success message

## Adding a New Language

### 1. Create Translation File

Create `i18n/locales/[lang-code].json`:

```json
{
  "nav": {
    "marketplace": "Your Translation",
    ...
  },
  ...
}
```

### 2. Update Config

Add to `i18n/config.ts`:

```typescript
import newLang from "./locales/new-lang.json";

const resources = {
  en: { translation: en },
  kk: { translation: kk },
  ru: { translation: ru },
  es: { translation: es },
  "new-lang": { translation: newLang }, // Add this
};
```

### 3. Update Language Switcher

Add to `components/LanguageSwitcher.tsx`:

```typescript
const languages = [
  { code: "en", name: "English"},
  { code: "kk", name: "Қазақша"},
  { code: "ru", name: "Русский"},
  { code: "es", name: "Español"},
  { code: "new-lang", name: "New Language"}, // Add this
];
```

## Adding New Translation Keys

### 1. Add to All Language Files

Add the same key to **all** translation files:

**en.json**:
```json
{
  "marketplace": {
    "newKey": "English text"
  }
}
```

**kk.json**:
```json
{
  "marketplace": {
    "newKey": "Kazakh text"
  }
}
```

... (repeat for all languages)

### 2. Use in Components

```typescript
const { t } = useTranslation();

<p>{t("marketplace.newKey")}</p>
```

## Best Practices

### 1. Organize Keys Logically

Group related translations:
```json
{
  "marketplace": { ... },
  "staking": { ... },
  "provider": { ... }
}
```

### 2. Use Descriptive Key Names

❌ Bad:
```json
{ "text1": "Service" }
```

✅ Good:
```json
{ "marketplace.serviceName": "Service" }
```

### 3. Keep Translations Consistent

Use the same terminology across all translations.

### 4. Test All Languages

Always test your changes in all supported languages to ensure:
- No missing translations
- Text fits in the UI
- No layout breaking

### 5. Handle Plurals

Use i18next pluralization:

```json
{
  "itemCount": "{{count}} item",
  "itemCount_other": "{{count}} items"
}
```

```typescript
t("itemCount", { count: 1 }); // "1 item"
t("itemCount", { count: 5 }); // "5 items"
```

## Common Issues & Solutions

### Issue: Translations not appearing

**Solution**:
1. Check browser console for errors
2. Verify translation key exists in all language files
3. Ensure `useTranslation()` hook is used in component
4. Check that component is wrapped by `I18nProvider`

### Issue: Language not persisting after refresh

**Solution**:
- Check that localStorage is enabled in browser
- Verify `changeLanguage` function saves to localStorage

### Issue: Missing translations show as keys

**Solution**:
- Add the translation to all language JSON files
- Restart dev server: `npm run dev`

## Development Workflow

### 1. Add New Feature

1. Write code with hardcoded English text
2. Extract text to translation keys
3. Add keys to `en.json`
4. Translate to other languages (kk, ru, es)
5. Replace hardcoded text with `t()` calls

### 2. Update Existing Text

1. Find translation key in JSON files
2. Update text in all language files
3. Test in all languages

### 3. Test

```bash
# Start dev server
npm run dev

# Open app
# Click language switcher
# Test each language
# Verify all text translates correctly
```

## Translation Guidelines

### Kazakh (kk)
- Use Cyrillic script
- Formal tone for professional context
- Technical terms often borrowed from Russian/English

### Russian (ru)
- Use Cyrillic script
- Formal "вы" form for user interface
- Standard Russian terminology for tech terms

### Spanish (es)
- Use standard Spanish (not regional variants)
- Formal "usted" form for interface
- Include accents and special characters (á, é, í, ó, ú, ñ)

## Performance

- Translations loaded at app initialization
- No runtime fetch/loading delay
- Minimal bundle size impact (~50KB total for all languages)
- Language switching is instant (no page reload)

## Future Enhancements

Potential improvements:
1. **RTL Support** - Add right-to-left languages (Arabic, Hebrew)
2. **Lazy Loading** - Load translations on-demand
3. **Translation Management** - Use services like Lokalise or Crowdin
4. **Number/Date Formatting** - Locale-specific formatting
5. **Currency Formatting** - Show prices in local currencies
6. **More Languages** - Add German, French, Chinese, etc.

## Resources

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Best Practices](https://www.i18next.com/principles/best-practices)

## Support

If you encounter issues with translations:
1. Check this guide
2. Review console errors
3. Verify all language files have matching keys
4. Test language switching functionality

---

**Need help?** Open an issue with:
- Current language selected
- Translation key that's not working
- Browser and OS information
- Console error messages (if any)



