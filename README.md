# Palxi Movie Database

A modern movie and TV show database built with Next.js, React, and TypeScript, using the TMDB API.

## Features

- Browse popular/trending movies
- Browse top-rated movies
- Browse popular/trending TV shows
- Browse top-rated TV shows
- Search for movies and TV shows
- View detailed information about movies and TV shows
- Responsive design for all devices
- Dark/light mode support

## Tech Stack

- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/palxi-movie-database.git
cd palxi-movie-database
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. The application is pre-configured with a TMDB API key for demonstration purposes. For your own projects, you should create a `.env.local` file in the root directory and add your own TMDB API key:

\`\`\`
TMDB_API_KEY=your_tmdb_api_key
\`\`\`

> **Note:** For production applications, you should never hardcode API keys in your source code. Always use environment variables.

### Development

Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Build the application for production:

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

### Deployment

Deploy the application to Vercel:

\`\`\`bash
npm run deploy
# or
yarn deploy
\`\`\`

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components
- `lib/` - Utility functions and API clients
- `public/` - Static assets

## API Reference

This project uses the TMDB API. You can find the API documentation at [https://developers.themoviedb.org/3/getting-started/introduction](https://developers.themoviedb.org/3/getting-started/introduction).

## License

This project is licensed under the MIT License.

## Acknowledgements

- [TMDB](https://www.themoviedb.org/) for providing the API
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
