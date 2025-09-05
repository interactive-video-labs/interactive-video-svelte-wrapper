# CONTRIBUTING.md

We welcome contributions to `@interactive-video-labs/svelte`! Your help is greatly appreciated in making this project better.

Before contributing, please take a moment to review this document. It outlines the guidelines for contributing to this repository.

## Table of Contents

- [CONTRIBUTING.md](#contributingmd)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [How Can I Contribute?](#how-can-i-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Your First Code Contribution](#your-first-code-contribution)
    - [Pull Requests](#pull-requests)
  - [Development Setup](#development-setup)
  - [Styleguides](#styleguides)
    - [Git Commit Messages](#git-commit-messages)
    - [TypeScript Styleguide](#typescript-styleguide)
  - [License](#license)

## Code of Conduct

This project adheres to the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [insert contact email or method here, e.g., `support@example.com`].

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please open an issue on our [GitHub Issues page](https://github.com/interactive-video-labs/interactive-video-svelte-wrapper/issues). When reporting a bug, please include:

- A clear and concise description of the bug.
- Steps to reproduce the behavior.
- Expected behavior.
- Actual behavior.
- Screenshots or videos if applicable.
- Your environment (Svelte version, browser, OS, etc.).

### Suggesting Enhancements

If you have an idea for a new feature or an improvement, please open an issue on our [GitHub Issues page](https://github.com/interactive-video-labs/interactive-video-svelte-wrapper/issues). When suggesting an enhancement, please include:

- A clear and concise description of the proposed enhancement.
- The problem it solves or the benefit it provides.
- Any alternative solutions you've considered.

### Your First Code Contribution

If you're looking to make your first code contribution, look for issues labeled `good first issue` on our [GitHub Issues page](https://github.com/interactive-video-labs/interactive-video-svelte-wrapper/issues).

### Pull Requests

1. **Fork the repository** and clone it to your local machine.
2. **Create a new branch** from `main` for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/your-bug-fix-name
   ```
3. **Make your changes** and ensure they adhere to the project's [Styleguides](#styleguides).
4. **Write tests** for your changes, if applicable. Ensure all existing tests pass.
5. **Run the build** to ensure everything compiles correctly:
   ```bash
   pnpm build
   ```
6. **Commit your changes** using a descriptive commit message (see [Git Commit Messages](#git-commit-messages)).
7. **Push your branch** to your forked repository.
8. **Open a Pull Request** to the `main` branch of the original repository.

In your pull request description, please:

- Reference any related issues (e.g., `Fixes #123`, `Closes #456`).
- Provide a clear explanation of your changes.
- Include screenshots or GIFs if your changes affect the UI.

## Development Setup

For detailed instructions on setting up your development environment, installing dependencies, and running tests, please refer to the [DEVELOPER.md](DEVELOPER.md) file.

## Styleguides

### Git Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for our commit messages. This helps with automated changelog generation and semantic versioning. Examples:

- `feat: add new video playback controls`
- `fix: resolve autoplay issue on iOS`
- `docs: update installation instructions`
- `refactor: improve player initialization logic`
- `test: add unit tests for cue points`

### TypeScript Styleguide

- Follow existing code style and formatting.
- Use clear and descriptive variable and function names.
- Ensure proper type annotations for all functions, variables, and parameters.
- Avoid `any` type unless absolutely necessary.

## License

By contributing to `@interactive-video-labs/svelte`, you agree that your contributions will be licensed under its MIT License. See the [LICENSE](LICENSE) file for details.
