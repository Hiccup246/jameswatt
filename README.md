<h1 align="center">
  jameswatt.io - v2
</h1>
<p align="center">
  The second iteration of <a href="https://jameswatt.io" target="_blank">jameswatt.io</a> built with <a href="https://nextjs.org/" target="_blank">NextJS</a> and hosted with <a href="https://vercel.com/" target="_blank">Vercel</a>
</p>
<p align="center">
  Previous iterations:
  <a href="https://github.com/Hiccup246/jameswatt" target="_blank">v1</a>
</p>
<div align="center">

  ![](https://img.shields.io/github/license/Hiccup246/james-watt-fresh)
  ![](https://img.shields.io/github/languages/code-size/Hiccup246/james-watt-fresh)
</div>
<div align="center">

  ![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=james-watt)
  ![](https://img.shields.io/github/workflow/status/Hiccup246/james-watt-fresh/e2e-tests)
  ![](https://img.shields.io/github/workflow/status/Hiccup246/james-watt-fresh/unit-tests)
  ![](https://img.shields.io/github/workflow/status/Hiccup246/james-watt-fresh/style-check)

</div>

![site-screenshot](https://raw.githubusercontent.com/hiccup246/james-watt-fresh/public/site-screenshot.webp)

## 🍽️ Fair use and forking
Feel free to fork this repository or utilise any code snippets. That being said, please give me proper credit by linking back to [jameswatt.io](https://www.jameswatt.io) much like I have done for the people who inspired this site.

Cheers!

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
## ✅ Running the project tests/checks
1. Run the jest unit tests
    ```sh
    pnpm run test:unit
    ```
2. Run the playwright e2e tests
    ```sh
    pnpm run test:e2e
    ```
3. Run Prettier
    ```sh
    pnpm run fix
    ```
4. Run Eslint
    ```sh
    pnpm run format
    ```
5. Check all types
    ```sh
      pnpm run type-check
    ```

<br>

## 🧠 Understanding the project
A great starting place for understanding this project is the `pages/index.page.tsx` file. This represents the single page of this single page application (SPA) and allows for easy exploration of all the sites components.

This file contains some site metadata and lists out all of the sites 'sections'. These sections are located within `components/sections` and compose components from `components/` to create the functionality of the site. In visual terms the `index.page.tsx` can be represented by:

![project-structure-diagram](https://raw.githubusercontent.com/hiccup246/james-watt-fresh/public/project-structure-diagram.webp)

<br>

## ⛰️ Environment Variables
This project has three environment variables
1. UMAMI_WEBSITE_ID
2. UMAMI_WEBSITE_URL
3. NEXT_PUBLIC_AUTHOR_CONTACT_EMAIL

The first two are related to the projects analytics service [umami](https://umami.is/). These can be removed along with the umami tracking tag in `pages/_document.page.tsx` if you do not plan to utilise the tracking service.

The final environment variable is used to store the email address which is linked to in the `AboutMeSection.tsx`.

<br>

## 🌄 Future Improvements

- Decide on a dark mode theme and implement it
- Update all styles to be mobile first then apply larger styles at bigger breakpoints as per tailwind docs. Make sure to read tailwind docs on responsive design first as this site is desktop first.
- Consider overall site theme perhaps in relation to eventual landing section colors
- SEO Optimisation https://nystudio107.com/blog/modern-seo-snake-oil-vs-substance
- Consider animating theme toggle to be link link where it slides into the text then out of it
- Consider alternative primary color (not blue based)
- Potentially refactor tooltip code, i.e. generic width and height values
- Re-usability for generic tooltip component
- Refactor all tests and look at react unit tests for unit test inspiration
- Deplay and do real world testing on both desktop and mobile devices
- Deploy and check lighthouse score and implement possible optimisations
- Write a beautiful readme with badges for github workflows and maybe code analysis
- Add husky with pre-commit hook to run all tests and linting

### Work Experience Section

- Clean up and carefully check tailwind css classes

### Landing Section

- Completely review wave tank javascript logic
- Inspiration for custom images include
  - https://www.youtube.com/watch?v=v0hhwAMLnzU&ab_channel=DaviesMediaDesign
