import { createCookie } from "remix";

export interface UserPreferences {
    lang: 'pt' | 'en' | 'es'
}

let cookie: UserPreferences;

/** Reads cookie from request and steore into user preferences. */
const readCookie = async (request: Request) => {
    const cookieHeader = request.headers.get("Cookie");
    cookie = (await userPreferencesCookie.parse(cookieHeader)) || {};
}

/** Serializes the given user preferences to a string and returns the Set-Cookie header. */
const serialize = async (value: Partial<UserPreferences>) => {
    const nextCookie: UserPreferences = {
        ...userPreferences.cookie,
        ...value
    };

    return await userPreferencesCookie.serialize(nextCookie);
}

const userPreferencesCookie = createCookie("user-preferences", {
    maxAge: 604_800, // one week
});

const userPreferences = {
    get cookie() { return cookie },
    readCookie,
    serialize
}

export default userPreferences;