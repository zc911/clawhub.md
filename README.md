# ClawHub.md

> The ultimate Agent Skill Documentation Platform for the OpenClaw ecosystem.

## 🚀 Features

- **Comprehensive Documentation**: High-quality, well-maintained documentation for every OpenClaw skill
- **One-Click Installation**: Install any skill directly to your OpenClaw instance with a single command
- **Community Driven**: Skills contributed and reviewed by the OpenClaw community
- **Powerful Search**: Find exactly what you need with advanced search and filtering
- **Verified Quality**: All skills go through a rigorous review process
- **Version Control**: Track skill versions and update easily

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: CSS3 + Font Awesome
- **Markdown Rendering**: Marked + Highlight.js
- **Routing**: React Router DOM

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/clawhub.md.git
cd clawhub.md
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 📁 Project Structure

```
clawhub.md/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Skills.jsx
│   │   └── Docs.jsx
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── docs/                # Documentation files
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🎯 Pages

### Home
- Hero section with value proposition
- Features grid highlighting platform benefits
- Popular skills showcase with one-click copy install commands

### Skills Library
- Search functionality to find skills
- Category filtering
- Grid view of all skills with metadata
- Copy-to-clipboard install buttons

### Documentation
- Complete guide for users and developers
- Getting started guide
- Skill publishing instructions
- Skill development documentation
- API reference

## 🎨 Design Features

- Modern gradient design with purple theme
- Fully responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Clean, readable typography using Inter font
- Dark mode support (coming soon)

## 🔧 Customization

### Adding New Skills
Edit `/src/pages/Skills.jsx` and add your skill to the `skills` array:

```javascript
{
  name: 'Your Skill Name',
  category: 'Category',
  description: 'Brief description of what your skill does',
  downloads: '1.2k',
  author: 'your-username',
  stars: 42,
  version: '1.0.0',
  installCommand: 'clawhub install your-skill'
}
```

### Adding Documentation
Edit `/src/pages/Docs.jsx` and add your documentation to the `docs` array.

### Changing Theme Colors
Modify the gradient and color variables in `/src/index.css`.

## 🚀 Deployment

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/clawhub.md)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/clawhub.md)

### GitHub Pages
1. Add `homepage` field to `package.json`:
```json
"homepage": "https://your-username.github.io/clawhub.md"
```

2. Install `gh-pages`:
```bash
npm install --save-dev gh-pages
```

3. Add deploy scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. Deploy:
```bash
npm run deploy
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenClaw](https://github.com/openclaw/openclaw) - The open-source AI assistant framework
- [ClawHub](https://clawhub.com) - The official skill registry for OpenClaw
- All the amazing contributors in the OpenClaw community

---

Built with ❤️ for the OpenClaw community.
