<h1 align="center">
  jameswatt.io - v2
</h1>

<p align="center">
  The second iteration of <a href="https://jameswatt.io" target="_blank">jameswatt.io</a> built with <a href="https://nextjs.org/" target="_blank">NextJS</a>, styled using <a href="https://tailwindcss.com/" target="_blank">Tailwind</a> and hosted with <a href="https://vercel.com/" target="_blank">Vercel</a>
</p>

<p align="center">
  Previous iterations:
  <a href="https://github.com/Hiccup246/jameswatt-v1" target="_blank">v1</a>
</p>

<div align="center">

![](https://img.shields.io/github/license/Hiccup246/jameswatt)
![](https://img.shields.io/github/languages/code-size/Hiccup246/jameswatt)

</div>
<div align="center">

![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=jameswatt)
![](https://img.shields.io/github/actions/workflow/status/hiccup246/jameswatt/unit-tests.yml?branch=main&label=Unit%20Tests)
![](https://img.shields.io/github/actions/workflow/status/hiccup246/jameswatt/e2e-tests.yml?branch=main&label=E2E%20Tests)
![](https://img.shields.io/github/actions/workflow/status/hiccup246/jameswatt/style-check.yml?branch=main&label=Style%20Check)

</div>

![site-screenshot](https://raw.githubusercontent.com/Hiccup246/jameswatt/main/public/site-screenshot.webp)

<br>

## 🧱 Installation and development setup

1. Install [pnpm](https://pnpm.io/)
   ```sh
   npm install -g pnpm
   ```
2. Install the correct [node version](https://nextjs.org/docs/getting-started) using [NVM](https://github.com/nvm-sh/nvm)
   ```sh
   nvm install
   ```
3. Install dependancies
   ```sh
   pnpm install
   ```
4. Run the development server
   ```sh
   pnpm run dev
   ```

## 🏁 Production setup

1. Create an optimized production build
   ```sh
   pnpm run build
   ```
2. Start the application in production mode
   ```sh
   pnpm run start
   ```

<br>

## 🧠 Understanding the project

A great starting place for understanding this project is the `pages/index.page.tsx` file. This represents the single page of this single page application (SPA) and allows for easy exploration of all the sites components.

This file contains some site metadata and lists out all of the sites 'sections'. These sections are located within `components/sections` and compose components from `components/` to create the functionality of the site. In visual terms the `index.page.tsx` can be represented by:

![project-structure-diagram](https://raw.githubusercontent.com/Hiccup246/jameswatt/main/public/project-structure-diagram.webp)

<br>

## ⛰️ Environment Variables

This project has three environment variables

1. UMAMI_WEBSITE_ID
2. UMAMI_WEBSITE_URL
3. NEXT_PUBLIC_AUTHOR_CONTACT_EMAIL

The first two are related to the projects analytics service [umami](https://umami.is/). These can be removed along with the umami tracking tag in `pages/_document.page.tsx` if you do not plan to utilise the tracking service.

The final environment variable is used to store the email address which is linked to in the `AboutMeSection.tsx`.

<br>

## 🍽️ Fair use and forking

_*Plagarism*_ is **not good**

_*Claiming*_ others work as your own is **not good**

Fair usage of others work with proper attribution is **awesome!**

So feel free to fork this repository or utilise any code snippets but please make an effort to give me proper credit by linking back to [jameswatt.io](https://www.jameswatt.io). If you need some ideas on how to do this check out the credits section of this website :)

Cheers!

<br>

## 🌄 Future Improvements

- Update Jest to inject mock environment variables
- Attempt to improve mobile performance perhaps by web worker usage or
  by refactoring components to be more efficient
  - Use chrome plugn to evaluate performance in more detail
  - Think about useEffect usage and if my usage is appropriate
- Integrate reading statistics into the bookshelf component. These could include:
  - Reading challenge data
  - Books completed in each year/month
- Design and implement a book review system with the ability to write reviews in a text editor
  - The reviews should be stored in a database
  - The reviews should be created in a rich text editor available at a URL
  - No need for advanced functionality like draft posts
  - The reviews should then be accessable via a API so this website can use them
