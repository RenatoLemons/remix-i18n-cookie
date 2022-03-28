
// Based on: https://react.i18next.com/latest/ssr#using-remix
const i18nextOptions = {
    fallbackLng: "pt",
    supportedLngs: ["pt", "en", "es"],
    defaultNS: "common",
    // I recommend you to always disable react.useSuspense for i18next
    react: { useSuspense: false },
}

export default i18nextOptions;