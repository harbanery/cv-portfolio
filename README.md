<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/harbanery/cv-portfolio">
    <img src="./public/logo.png" alt="Logo" width="80">
  </a>

  <h1 align="center">CV Portfolio</h1>

  <p align="center">
    Personal CV & Portfolio Website — with ATS-friendly PDF download
    <br />
    <br />
  </p>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [The Story](#the-story)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setup Environment Variables](#setup-environment-variables)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
  - [Features](#features)
  - [Customizing CV Data](#customizing-cv-data)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About The Project

My web-based application, **CV Portfolio**, is a personal website that displays a portfolio in CV format and can generate an ATS-friendly PDF version of it on demand. All CV content lives in localized JSON files (`id`/`en`), so the website and the downloaded PDF always stay in sync from a single source of truth — no need to rebuild a CV from scratch ever again.

### Built With

[![Next][Next.js]][Next-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![TailwindCSS][Tailwind]][Tailwind-url]
[![Ant Design][Ant Design]][Ant Design-url]

## The Story

I originally built this website to showcase my portfolio in a CV format and to download and generate an ATS-friendly CV without having to create the CV from scratch.

Instead of maintaining a separate document editor or rewriting my resume for every application, the CV content is stored as structured JSON. The website renders it as a responsive portfolio page, and one click produces a clean, ATS-friendly PDF generated server-side with [react-pdf](https://react-pdf.org/). Update the data once, and both the website and the PDF reflect it immediately.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js (v24+)
- npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone Repo

   ```sh
   git clone https://github.com/harbanery/cv-portfolio.git
   ```

2. Go to folder directory

   ```bash
   cd cv-portfolio
   ```

3. Install NPM packages

   ```sh
   npm install
   ```

### Setup Environment Variables

1. Create a `.env` file in your local root directory.

2. Add the following variables to the `.env` file:

   ```sh
   # App identity (optional, for branding/metadata)
   TITLE_WEB="Your Name's CV"
   APP_WEB="My CV"
   DESCRIPTION_WEB="Welcome to my personal cv website."

   NEXT_PUBLIC_URL="http://localhost:3000"
   ```

### Running the Application

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and locally navigate to:

   ```sh
   http://localhost:3000
   ```

## Usage

This application renders your CV data as a website by default. Use the toolbar at the top to switch between website and CV layout, toggle avatar visibility, change theme/language, and download the PDF version.

### Features

- **Next.js App Router** with React Server Components and a server-side PDF API route.
- **Dual layout modes**: a wide responsive **website mode** (default) and a narrow document-style **CV mode**, switchable from the toolbar.
- **ATS-friendly PDF download** generated server-side via [@react-pdf/renderer](https://react-pdf.org/) — no browser print hacks, selectable text, and consistent typography using Calibri-metric fonts.
- **Single source of truth CV data**: all content lives in [`public/data/me.id.json`](public/data/me.id.json) and [`public/data/me.en.json`](public/data/me.en.json).
- **Multi-language support** (Indonesian & English) covering both UI labels and full CV content, with instant switching.
- **Avatar toggle**: show/hide the profile photo on the page header and in the PDF (hidden by default).
- **Dark/Light mode** with localStorage persistence and system preference detection.
- **Responsive design** for laptop, tablet, and phone — grids collapse gracefully and typography scales per breakpoint.
- **PWA-ready**: web app manifest and installable on mobile home screens.
- **UI components** with **Ant Design** (ConfigProvider theming, locale-aware) and **Tailwind CSS** styling.
- **Vercel Analytics** integration.
- **Linting** with **ESLint** for maintaining code quality.

### Customizing CV Data

All CV content is defined in **two JSON files**: [`public/data/me.id.json`](public/data/me.id.json) (Indonesian) and [`public/data/me.en.json`](public/data/me.en.json) (English). This is the single source of truth — edit these files to update your profile, work experience, education, certifications, skills, projects, awards, and languages. No other files need to be changed.

Both files share the same schema (see [`src/models/types.ts`](src/models/types.ts)):

```json
{
  "basics": { "name": "...", "label": "...", "summary": "...", "location": {} },
  "contact": {
    "email": "mailto:...",
    "phone": "https://wa.me/...",
    "linkedin": "...",
    "github": "..."
  },
  "work": [{ "company": "...", "position": "...", "highlights": [] }],
  "education": [],
  "certifications": [],
  "skills": {
    "languages": [],
    "frameworks": [],
    "libraries": [],
    "databases": [],
    "tools": []
  },
  "projects": [
    {
      "name": "...",
      "techStack": [],
      "images": ["/images/projects/..."],
      "url": {}
    }
  ],
  "awards": [],
  "languages": []
}
```

**To update your profile:**

1. Open `public/data/me.id.json` and `public/data/me.en.json`
2. Edit the fields you want to change (keep both files in sync)

**To change the profile photo:**

1. Replace `public/images/me.png` (35×45mm passport-style ratio works best)

**To add a project screenshot:**

1. Drop the image into `public/images/projects/`
2. Reference it from a project's `images` array as `/images/projects/<filename>`

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. Add a [`LICENSE`](LICENSE) file to the repository root if you plan to open-source it.

## Contact

If you have any questions or inquiries regarding this project, feel free to contact me at [ryusuf05@gmail.com](mailto:ryusuf05@gmail.com)

## Acknowledgements

Feel free to check it out:

- [Next.js Documentation](https://nextjs.org/docs)
- [React PDF](https://react-pdf.org/)
- [Ant Design](https://ant.design/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Ant Design Next.js Registry](https://ant.design/docs/react/use-with-nextjs)
- [Img Shields](https://shields.io)
- [Choose an Open Source License](https://choosealicense.com/)

<!-- MARKDOWN LINKS & IMAGES -->

[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/en
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://reactjs.org/
[Tailwind]: https://img.shields.io/badge/tailwindcss-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Ant Design]: https://img.shields.io/badge/Ant_Design-1677FF?style=for-the-badge&logo=antdesign&logoColor=white
[Ant Design-url]: https://ant.design/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
