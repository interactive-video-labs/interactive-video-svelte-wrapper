# DEVELOPER.md

This document provides essential information for developers looking to contribute to or work on the `@interactive-video-labs/svelte` project.

## Project Setup

To get started with local development, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/interactive-video-labs/interactive-video-svelte-wrapper.git
    cd interactive-video-svelte-wrapper
    ```

2.  **Install dependencies:**
    This project uses `pnpm` as its package manager. If you don't have `pnpm` installed, you can install it globally:
    ```bash
    npm install -g pnpm
    ```
    Then, install the project dependencies:
    ```bash
    pnpm install
    ```

## Available Scripts

Here are the common development scripts available:

-   **`pnpm build`**: Compiles the TypeScript + Svelte source code into JavaScript (ESM and CommonJS formats) and generates declaration files (`.d.ts`). This command is run before publishing.

    ```bash
    pnpm build
    ```

-   **`pnpm dev`**: Starts the TypeScript compiler and Svelte build in watch mode, recompiling files on changes. Useful for active development.

    ```bash
    pnpm dev
    ```

-   **`pnpm test`**: Runs the unit tests using Vitest.

    ```bash
    pnpm test
    ```

-   **`pnpm clean`**: Removes the `dist` directory, clearing all compiled output.

    ```bash
    pnpm clean
    ```

-   **`pnpm prepare`**: This script is typically run after `pnpm install` and before `pnpm publish`. In this project, it simply runs `pnpm build`.

    ```bash
    pnpm prepare
    ```

## Testing

Tests are written using [Vitest](https://vitest.dev/). You can run all tests with:

```bash
pnpm test
```

Test files are located in the `test/` directory and follow the naming convention `*.test.ts`.

## Code Style and Linting

This project uses Svelte + TypeScript. Ensure your code adheres to the existing style and type conventions. While there isn't an explicit linting script defined in `package.json`, it's good practice to follow consistent formatting and coding standards (we recommend using Prettier and ESLint).

## Release Process

This project uses an automated release workflow via GitHub Actions (`.github/workflows/release.yml`). Releases are typically triggered by pushing tags or by manual dispatch. Refer to the workflow file for details on how new versions are published.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) file for detailed guidelines on how to submit issues, propose features, and make pull requests.

