import { useTranslation } from "react-i18next";
import { Form, json, LoaderFunction, redirect, useLoaderData } from "remix";
import { i18n } from "~/i18n/i18n.server";
import userPreferences, { UserPreferences } from "~/userPreferences";

export let loader: LoaderFunction = async ({ request }) => {
  await userPreferences.readCookie(request);

  return json({
    userPreferences: userPreferences.cookie,
    i18n: await i18n.getTranslations(request, ["common", "home"]),
  });
};

export async function action({ request }) {
  await userPreferences.readCookie(request);
  const bodyParams = await request.formData();

  const nextLanguage: Partial<UserPreferences> = {
    lang: bodyParams.get("language")
  };

  return redirect("/", {
    headers: {
      "Set-Cookie": await userPreferences.serialize(nextLanguage),
    },
  });
}

export default function Index() {
  const { t } = useTranslation(["home", "common"]);
  var data = useLoaderData();

  return (
    <div>
      <p><span>{t("Seu idioma atual é")}:</span>&nbsp;<b>{data.userPreferences?.lang}</b></p>
      <div>
        <div>
          <p>{t("Escolha seu idioma")}</p>
          <Form method="post">
            <select name="language" id="language">
              <option value="">[None]</option>
              <option value="pt">{t("português", { ns: 'common' })}</option>
              <option value="en">{t("inglês", { ns: 'common' })}</option>
              <option value="es">{t("espanhol", { ns: 'common' })}</option>
            </select>
            <button type="submit">{t('Mudar idioma')}</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
