export const Currencies = [
  { value: 'USD', label: '$ Dollar', locale: 'en-US' },
  { value: 'EUR', label: '€ Euro', locale: 'en-EU' },
  { value: 'UAH', label: '₴ Hryvna', locale: 'uk-UA' },
  { value: 'GBP', label: '£ Pound Sterling', locale: 'en-GB' },
  { value: 'JPY', label: '¥ Yen', locale: 'ja-JP' },
  { value: 'CNY', label: '¥ Yuan', locale: 'zh-CN' },
];

export type Currency = typeof Currencies[0];
