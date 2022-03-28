# Welcome

This app use cookie to save user preferences as chosen language and remix-i18next to translate the page using JSON resources. So you can see in this app:
- How to [create/read cookie](https://remix.run/docs/en/v1/api/remix#using-cookies) using [Remix](https://remix.run/docs)
- How to use [remix-i18next](https://react.i18next.com/latest/ssr#using-remix) and [override getLocale](./app/i18n/i18n.server.ts#L15) to read the custom cookie.


## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
