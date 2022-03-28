import {
  json,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import { i18n } from "~/i18n/i18n.server";
import { useSetupTranslations } from "remix-i18next";

export const meta: MetaFunction = ({ data }) => ({
  charset: "utf-8",
  title: data.title,
  viewport: "width=device-width,initial-scale=1",
});

export let loader: LoaderFunction = async ({ request }) => {
  let locale = await i18n.getLocale(request);

  let t = await i18n.getFixedT(request);
  let title = t("masterPage.title");

  return json({ locale, title });
};

export default function App() {
  let { locale } = useLoaderData<{ locale: string }>();
  useSetupTranslations(locale);

  return (
    <html lang={locale}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
