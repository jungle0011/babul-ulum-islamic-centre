# 🕌 Babul Ulum Islamic Learning Centre

A premium, modern website for the Babul Ulum Islamic Learning Centre, founded by Alfa Baba. This website showcases Islamic education services, spiritual guidance, and provides a beautiful platform for connecting with students and seekers of knowledge.

## ✨ Features

### 🌐 Multi-Language Support
- **Full Arabic & English** language toggle
- **RTL/LTR** layout switching
- **Professional fonts**: Noto Naskh Arabic for Arabic, Inter/Nunito for English
- **Instant content switching** across the entire site

### 🎨 Premium Design
- **Rich deep blue & gold** color scheme
- **Islamic geometric patterns** and elegant backgrounds
- **Modern card-based layout** with soft shadows and rounded corners
- **Responsive design** - mobile-first, tablet and desktop friendly
- **Smooth animations** using Framer Motion

### 📱 Responsive & Accessible
- **Mobile-first design** approach
- **Touch-friendly** interface
- **Accessible color contrast**
- **Smooth scrolling** navigation
- **SEO optimized** with proper meta tags

### 🚀 Performance & SEO
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Optimized images** with Next.js Image component
- **Fast loading** and excellent Lighthouse scores

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom SCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Internationalization**: react-i18next
- **Deployment**: Vercel (recommended)

## 📋 Sections

### 🏠 Homepage
- **Hero Section**: Logo, Arabic dua, brand name, tagline
- **About Us**: Mission, vision, and core values
- **Services**: 7 key services with icons and descriptions
- **Founder**: Alfa Baba highlight section
- **Contact**: Contact form and information

### 📖 About Page
- Detailed mission and vision
- Story behind the centre
- Founder's background and achievements

### 📜 Services
- Mastery of Asrar (spiritual secrets)
- Guidance on prayers
- Astrology & ancient sciences
- Human nature study
- Personalized consultations
- Illumination of personal signs
- Adult education in Arabic & Islam

### ✉️ Contact
- **Phone**: +2348063237436
- **Email**: Babululumimam@gmail.com
- **WhatsApp**: +2348063237436
- Contact form for inquiries

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd babul-ulum-islamic-centre
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📁 Project Structure

```
babul-ulum-islamic-centre/
├── app/
│   ├── globals.css          # Global styles and Tailwind
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── LanguageProvider.tsx # i18n context provider
│   ├── LanguageToggle.tsx   # Language switcher
│   ├── Navigation.tsx       # Main navigation
│   ├── HeroSection.tsx      # Hero section
│   ├── AboutSection.tsx     # About section
│   ├── ServicesSection.tsx  # Services showcase
│   ├── FounderSection.tsx   # Founder highlight
│   ├── ContactSection.tsx   # Contact form & info
│   └── Footer.tsx           # Footer component
├── lib/
│   └── i18n.ts             # Internationalization config
├── public/
│   └── babul-logo.jpg      # Logo image
├── package.json
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── README.md
```

## 🎨 Customization

### Colors
The color scheme is defined in `tailwind.config.js`:
- **Deep Navy**: `#0f172a`
- **Islamic Blue**: Various shades from `#f0f4ff` to `#0a1bff`
- **Rich Gold**: `#d4af37`
- **Islamic Gold**: Various shades from `#fffbf0` to `#ff800a`

### Content
- **Translations**: Edit `lib/i18n.ts` for text content
- **Services**: Modify the services array in `components/ServicesSection.tsx`
- **Contact Info**: Update contact details in `components/ContactSection.tsx`

### Styling
- **Global styles**: Edit `app/globals.css`
- **Component styles**: Use Tailwind classes or add custom CSS
- **Animations**: Modify Framer Motion animations in components

## 📞 Contact Information

- **Phone**: +2348063237436
- **Email**: Babululumimam@gmail.com
- **WhatsApp**: +2348063237436

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for Babul Ulum Islamic Learning Centre. All rights reserved.

## 🙏 Acknowledgments

- **Founder**: Alfa Baba
- **Design**: Premium Islamic aesthetic with modern web standards
- **Technology**: Built with Next.js and modern web technologies

---

**Babul Ulum Islamic Learning Centre** - Premium Islamic Learning & Spiritual Enlightenment Centre 