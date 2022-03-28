import { RemixI18Next } from "remix-i18next";
import { FileSystemBackend } from "remix-i18next";
import userPreferences from "~/userPreferences";
import i18nextOptions from "./i18nextOptions";

// You will need to provide a backend to load your translations, here we use the file system one and tell it where to find the translations.
let backend = new FileSystemBackend("./public/locales");

const i18n = new RemixI18Next(backend, {
    fallbackLng: i18nextOptions.fallbackLng,
    supportedLanguages: i18nextOptions.supportedLngs
});

// override to read custom cookie
i18n.getLocale = async (request: Request): Promise<string> => {
    await userPreferences.readCookie(request);

    if (userPreferences.cookie.lang && i18nextOptions.supportedLngs.indexOf(userPreferences.cookie.lang) > -1) {
        return userPreferences.cookie.lang;
    }

    return i18nextOptions.fallbackLng;
}

export { i18n };