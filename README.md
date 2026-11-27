# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Contact form (Resend)

The contact form submits to the server-rendered `/api/contact` endpoint. Configure
these server-only variables in `.env` for local development and in the Vercel
project's Environment Variables for deployment:

- `RESEND_API_KEY`: API key from Resend.
- `CONTACT_TO_EMAIL`: inbox that should receive contact messages.
- `RESEND_FROM_EMAIL` (optional): sender using a domain verified with Resend.

Without `RESEND_FROM_EMAIL`, the endpoint uses Resend's
`onboarding@resend.dev` sender, which is intended for testing and is restricted
to the email address associated with the Resend account. For production, verify
a sending domain in Resend and set `RESEND_FROM_EMAIL` to an address on that
domain. See `.env.example` for the variable format. Never commit `.env` or put
the Resend API key in client-side code.
