module.exports = {
  useTranslations: jest.fn(() => (key, values) => {
    if (values && typeof values === "object") {
      return key.replace(/\{(\w+)\}/g, (match, placeholder) => {
        return values[placeholder] || match;
      });
    }
    return key;
  }),
  useFormatter: jest.fn(() => ({
    dateTime: jest.fn((value) => value),
    number: jest.fn((value) => value),
    relativeTime: jest.fn((value) => value),
  })),
  NextIntlClientProvider: ({ children }) => children,
};
