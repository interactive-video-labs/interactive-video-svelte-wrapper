import { onMount, onDestroy } from 'svelte';
import {
  IVLabsPlayer,
  PlayerConfig,
  CuePoint,
  Translations,
  AnalyticsEvent,
  AnalyticsPayload,
} from '@interactive-video-labs/core';

/**
 * Props for the InteractiveVideo component.
 */
export interface InteractiveVideoProps
  extends Omit<PlayerConfig, 'videoUrl' | 'cues' | 'translations' | 'targetElementId'> {
  /**
   * The URL of the video to be loaded.
   */
  videoUrl: string;
  /**
   * Callback function for analytics events.
   * @param event The name of the event.
   * @param payload The data associated with the event.
   */
  onAnalyticsEvent?: (event: AnalyticsEvent, payload?: AnalyticsPayload) => void;
  /**
   * An array of cue points for interactive events.
   */
  cues?: CuePoint[];
  /**
   * An object containing translations for the player.
   */
  translations?: Translations;
  /**
   * Whether the video should start playing automatically.
   */
  autoplay?: boolean;
  /**
   * Whether the video should loop.
   */
  loop?: boolean;
  /**
   * The locale to be used for the player.
   */
  locale?: string;
  /**
   * The ID of the target HTML element where the player will be mounted.
   */
  targetElementId?: string;
}

/**
 * A Svelte component that wraps the IVLabsPlayer to provide interactive video capabilities.
 * It handles the lifecycle of the player, including initialization, updates, and destruction.
 */
export default function InteractiveVideo(node: HTMLElement, props: InteractiveVideoProps) {
  let player: IVLabsPlayer | null = null;
  const playerTargetId =
    props.targetElementId || `ivlabs-player-${Math.random().toString(36).substr(2, 9)}`;

  const initializePlayer = () => {
    if (player) {
      return; // Player already initialized
    }

    const targetElement = document.getElementById(playerTargetId);
    if (!targetElement) {
      console.error(`IVLabsPlayer target element with ID '${playerTargetId}' not found.`);
      return;
    }

    // Exclude 'translations' from playerConfig to match PlayerConfig type
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { translations, ...restProps } = props;
    const playerConfig: PlayerConfig = {
      ...restProps,
      videoUrl: props.videoUrl,
      autoplay: props.autoplay ?? false,
      loop: props.loop ?? false,
      locale: props.locale ?? 'en',
    };

    try {
      player = new IVLabsPlayer(playerTargetId, playerConfig);

      if (props.onAnalyticsEvent) {
        const analyticsHandler = props.onAnalyticsEvent;
        const eventsToRegister: AnalyticsEvent[] = [
          'PLAYER_LOADED',
          'VIDEO_STARTED',
          'VIDEO_PAUSED',
          'VIDEO_ENDED',
          'CUE_TRIGGERED',
          'INTERACTION_COMPLETED',
          'ERROR',
        ];

        eventsToRegister.forEach((event) => {
          player!.on(event, (payload?: AnalyticsPayload) => {
            analyticsHandler(event, payload);
          });
        });
      }

      if (props.cues) {
        player.loadCues(props.cues);
      }

      if (props.translations) {
        player.loadTranslations(props.locale ?? 'en', props.translations);
      }
    } catch (error) {
      console.error('Error initializing IVLabsPlayer:', error);
    }
  };

  onMount(() => {
    initializePlayer();
  });

  onDestroy(() => {
    if (player) {
      player.destroy();
      player = null;
    }
  });

  return {
    update(newProps: InteractiveVideoProps) {
      if (player) {
        if (newProps.cues) {
          player.loadCues(newProps.cues);
        }
        if (newProps.translations) {
          player.loadTranslations(newProps.locale ?? 'en', newProps.translations);
        }
      }
    },
    destroy() {
      if (player) {
        player.destroy();
      }
    },
  };
}
