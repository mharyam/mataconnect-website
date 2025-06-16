# MataConnect

![MataConnect Logo](public/mata-connect-logo.svg)

> Where Women Connect, Learn, And Thrive.

## About

MataConnect is a bridge connecting women with life-changing communities they never knew existed. Born from a simple realization: the problem isn't that supportive spaces don't exist — it's discovery.

## Features

- **AI Search**: Semantic communities search using MongoDB Atlas Vector Search and Vertex AI embeddings
- **Community Discovery**: Browse and search through a curated archive of women-focused communities
- **Community Submission**: Submit new communities to be featured on the platform
- **Responsive Design**: Fully responsive interface that works seamlessly on both desktop and mobile devices

## Tech Stack

- **Frontend Framework**: Next.js with TypeScript
- **Styling**:
  - Tailwind CSS
  - CSS-in-JS with styled-components
  - Framer Motion for animations

## Project Structure

```
mataconnect-website/
├── app/                  # Next.js app directory
│   ├── about/           # About page
│   ├── archive/         # Communities archive
│   ├── submit/          # Community submission
│   └── page.tsx         # Home page
├── components/          # Reusable components
├── data/               # Static data
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets
└── styles/             # Global styles
```

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

## License

© MATA CONNECT 2025. ALL RIGHTS RESERVED
