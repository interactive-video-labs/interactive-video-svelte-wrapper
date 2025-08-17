# @interactive-video-labs/svelte
<p align="center">
  <img src="https://raw.githubusercontent.com/interactive-video-labs/docs/main/logo.svg" width="200px" alt="Interactive Video Labs Logo" />
</p>
<p align="center">
  <img src="https://img.shields.io/npm/v/@interactive-video-labs/svelte" alt="NPM Version" />
  <img src="https://img.shields.io/npm/l/@interactive-video-labs/svelte" alt="NPM License" />
  <img src="https://img.shields.io/npm/d18m/@interactive-video-labs/svelte?style=flat-square" alt="NPM Downloads" />
  <a href="https://github.com/interactive-video-labs/interactive-video-svelte-wrapper/actions">
    <img src="https://github.com/interactive-video-labs/interactive-video-svelte-wrapper/actions/workflows/release.yml/badge.svg" alt="Build Status" />
  </a>
</p>

Welcome to `@interactive-video-labs/svelte` — a lightweight Svelte wrapper around the `@interactive-video-labs/core` engine for cue-driven interactive video experiences.

This wrapper enables seamless integration of interactive video players into Svelte applications using idiomatic props and DOM events, while staying close to the underlying core engine API.

---

## Features

- **Declarative Props**: Control the player via Svelte props.
- **DOM Events**: Listen to player events using `on:analyticsEvent` on the component.
- **Dynamic Content**: Update cue points and translations reactively.
- **Direct Player Access**: Bind to the underlying `@interactive-video-labs/core` player instance.
- **TypeScript Support**: Fully typed for a better DX.

## Installation

Install the package and its peer dependencies:

```bash
# With pnpm
pnpm add @interactive-video-labs/svelte @interactive-video-labs/core svelte

# With npm
npm install @interactive-video-labs/svelte @interactive-video-labs/core svelte

# With yarn
yarn add @interactive-video-labs/svelte @interactive-video-labs/core svelte
```

## Basic Usage

Here’s a simple example of how to use the `<InteractiveVideo />` component in a Svelte app.

```svelte
<script lang="ts">
  import InteractiveVideo from '@interactive-video-labs/svelte';
  import '@interactive-video-labs/core/dist/style.css'; // Import styles

  let videoUrl = 'https://example.com/my-video.mp4';

  type CuePoint = {
    time: number;
    payload: any;
  };

  let cues: CuePoint[] = [
    { time: 10, payload: { type: 'text', content: 'This is a timed message!' } },
    { time: 25, payload: { type: 'quiz', question: 'What is Svelte?' } }
  ];

  function handleAnalyticsEvent(event: CustomEvent<{ event: string; payload?: any }>) {
    console.log('Analytics Event:', event.detail.event, event.detail.payload);
  }
</script>

<InteractiveVideo
  {videoUrl}
  {cues}
  autoplay
  loop
  on:analyticsEvent={handleAnalyticsEvent}
/>
```

## API Reference

### Props

| Prop               | Type                                                           | Required | Default | Description                                                                 |
|--------------------|----------------------------------------------------------------|----------|---------|-----------------------------------------------------------------------------|
| `videoUrl`         | `string`                                                       | `true`   | —       | The URL of the video to be loaded.                                          |
| `cues`             | `CuePoint[]`                                                   | `false`  | `[]`    | An array of cue points for interactive events. Reactive/updated at runtime. |
| `translations`     | `Translations`                                                 | `false`  | `{}`    | Translations for the player UI.                                             |
| `autoplay`         | `boolean`                                                      | `false`  | `false` | Whether the video should start playing automatically.                       |
| `loop`             | `boolean`                                                      | `false`  | `false` | Whether the video should loop.                                              |
| `locale`           | `string`                                                       | `false`  | `'en'`  | The locale to be used for the player (e.g., `'en'`, `'es'`).                |
| `bind:playerRef`   | `Player` (`@interactive-video-labs/core`)                      | `false`  | —       | Two-way bind to access the underlying core player instance.                 |

> Any additional attributes supported by `@interactive-video-labs/core` will be forwarded to the player configuration.

### Events

Player analytics/events are dispatched as a Svelte DOM event named `analyticsEvent`.

**Dispatched `detail` shape:**

```ts
type AnalyticsDetail = {
  event: 'PLAYER_LOADED' | 'VIDEO_STARTED' | 'VIDEO_PAUSED' | 'VIDEO_ENDED' |
          'CUE_TRIGGERED' | 'INTERACTION_COMPLETED' | 'ERROR';
  payload?: any;
};
```

**Available Events:**

- `PLAYER_LOADED`
- `VIDEO_STARTED`
- `VIDEO_PAUSED`
- `VIDEO_ENDED`
- `CUE_TRIGGERED`
- `INTERACTION_COMPLETED`
- `ERROR`

**Example:**

```svelte
<script lang="ts">
  function onAnalytics(e: CustomEvent<{ event: string; payload?: any }>) {
    const { event, payload } = e.detail;
    if (event === 'CUE_TRIGGERED') {
      console.log('Cue at:', payload?.cue?.time);
    } else if (event === 'ERROR') {
      console.error('Player error:', payload?.error);
    }
  }
</script>

<InteractiveVideo on:analyticsEvent={onAnalytics} />
```

### Accessing the Player Instance

If you need to call methods on the underlying core player:

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import InteractiveVideo from '@interactive-video-labs/svelte';
  import type { Player } from '@interactive-video-labs/core';

  let playerRef: Player | null = null;

  onMount(() => {
    // `playerRef` is now bound to the core player instance
    playerRef?.play();
  });
</script>

<InteractiveVideo
  videoUrl="https://example.com/my-video.mp4"
  bind:playerRef
/>
```

---

## 🧑‍💻 For Developers

For detailed development setup, project structure, testing, build, and publishing instructions, please refer to our **Developer Guide** (`DEVELOPER.md`).

---

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

