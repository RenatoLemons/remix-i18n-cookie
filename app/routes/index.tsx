import { Form, LoaderFunction, redirect, useLoaderData } from "remix";
import userPreferences, { UserPreferences } from "~/userPreferences";

export let loader: LoaderFunction = async ({ request }) => {
  await userPreferences.readCookie(request);

  return {
    userPreferences: userPreferences.cookie
  }
};

export async function action({ request }) {
  await userPreferences.readCookie(request);
  const bodyParams = await request.formData();

  const nextCookie: UserPreferences = {
    ...userPreferences.cookie,
    ...{
      lang: bodyParams.get("language")
    }
  };

  return redirect("/", {
    headers: {
      "Set-Cookie": await userPreferences.serialize(nextCookie),
    },
  });
}

export default function Index() {
  var data = useLoaderData();

  return (
    <div>
      <p><span>Your current language is:</span>&nbsp;<b>{data.userPreferences?.lang}</b></p>
      <div>
        <div>
          <p>Choose your language</p>
          <Form method="post">
            <select name="language" id="language">
              <option value="">[None]</option>
              <option value="pt">Portuguese</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
            <button type="submit">Change Language</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
