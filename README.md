# Biology Lab Website

A modern, multi-page React website for a biology research laboratory featuring animated navigation and responsive design.

## Features

- 🎨 Modern, minimalistic design with dark theme
- 🔄 Smooth GSAP animations and scroll effects
- 📱 Fully responsive design
- 🧭 Circular navigation with symmetric layout
- 📄 Multiple pages: Home, About, Team, Publications, Resources, Contact
- ⚡ Fast performance with Vite
- 🎯 Animated team member tiles
- 🔝 Smart navigation bars with mutual exclusion

## Live Demo

Visit the live website: [https://siva-ratnakar.github.io/lab_website/](https://siva-ratnakar.github.io/lab_website/)

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/lab_website.git
cd lab_website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Build and Deployment

### Manual Deployment to GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Automatic Deployment

This project is configured with GitHub Actions for automatic deployment. Every push to the `main` branch will automatically build and deploy the website to GitHub Pages.

## Project Structure

```
lab_website/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── CircularNavigation.jsx
│   │   ├── CircularNavigation.css
│   │   ├── NavigationBar.jsx
│   │   └── NavigationBar.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Team.jsx
│   │   ├── Publications.jsx
│   │   ├── Resources.jsx
│   │   └── Contact.jsx
│   ├── styles/
│   │   └── global.css
│   ├── assets/
│   │   └── images/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **GSAP** - Animation library
- **CSS3** - Styling with modern features
- **GitHub Pages** - Hosting
- **GitHub Actions** - CI/CD

## Configuration

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. The website will be automatically deployed on every push to main

### Customization

- Update the `base` URL in `vite.config.js` to match your repository name
- Replace `YOUR_USERNAME` in this README with your actual GitHub username
- Customize colors, fonts, and layout in the CSS files
- Add your team member information in `Team.jsx`
- Update content in all page components

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please open an issue on GitHub.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
