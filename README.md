# Avatar Generator

This is a avatar generator using Procedural Content Generation (PCG).

[Click here](https://pomodorozhong.github.io/avatar-generator/) to see the live demo.

## Installation

```sh
git clone https://github.com/pomodorozhong/avatar-generator.git
cd avatar-generator
npm install
```

## Development

Start the Vite development server:

```sh
npm run dev
```

This opens the app at `http://localhost:5173/avatar-generator/`.

Create a production build in `dist`:

```sh
npm run build
```

The build command only creates the files in `dist`; it does not start a server.
Preview the production build locally with:

```sh
npm run preview
```

This opens the app at `http://localhost:4173/avatar-generator/`.

Do not open `src/index.html` or `dist/index.html` with a `file://` URL. Vite
applications use browser modules and must be loaded through an HTTP server.
