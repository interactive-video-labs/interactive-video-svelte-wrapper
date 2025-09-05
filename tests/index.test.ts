import { vi } from 'vitest';
import { onMount, onDestroy } from 'svelte';
import InteractiveVideo from '../src/lib/index';
import { IVLabsPlayer } from '@interactive-video-labs/core';

// Mock svelte lifecycle functions
vi.mock('svelte', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    onMount: vi.fn(),
    onDestroy: vi.fn(),
  };
});

// Mock IVLabsPlayer
vi.mock('@interactive-video-labs/core', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    IVLabsPlayer: vi.fn(() => ({
      destroy: vi.fn(),
      loadCues: vi.fn(),
      loadTranslations: vi.fn(),
      on: vi.fn(),
    })),
  };
});

describe('InteractiveVideo Svelte Action', () => {
  let mockNode: HTMLElement;

  beforeEach(() => {
    mockNode = document.createElement('div');
    mockNode.id = 'test-player-target';
    document.body.appendChild(mockNode);
    vi.clearAllMocks();
    // Reset onMount and onDestroy mocks for each test
    (onMount as vi.Mock).mockImplementationOnce((fn) => fn());
    (onDestroy as vi.Mock).mockImplementationOnce(() => {}); // Do not call immediately
  });

  afterEach(() => {
    document.body.removeChild(mockNode);
  });

  test('should initialize IVLabsPlayer on mount', () => {
    const props = {
      videoUrl: 'https://example.com/video.mp4',
      targetElementId: 'test-player-target',
    };

    InteractiveVideo(mockNode, props);

    expect(onMount).toHaveBeenCalledTimes(1);
    expect(IVLabsPlayer).toHaveBeenCalledTimes(1);
    expect(IVLabsPlayer).toHaveBeenCalledWith('test-player-target', expect.any(Object));
  });

  test('should destroy IVLabsPlayer on destroy', () => {
    const props = {
      videoUrl: 'https://example.com/video.mp4',
      targetElementId: 'test-player-target',
    };

    const { destroy } = InteractiveVideo(mockNode, props);

    // Manually call the destroy function returned by the action
    destroy();

    expect(onDestroy).toHaveBeenCalledTimes(1);
    expect(IVLabsPlayer).toHaveBeenCalledTimes(1); // Still called once for initialization
    expect(IVLabsPlayer.mock.results[0].value.destroy).toHaveBeenCalledTimes(1);
  });

  test('should call loadCues and loadTranslations on update', () => {
    const props = {
      videoUrl: 'https://example.com/video.mp4',
      targetElementId: 'test-player-target',
    };

    const { update } = InteractiveVideo(mockNode, props);

    const newProps = {
      ...props,
      cues: [{ time: 20, id: 'cue2' }],
      translations: { en: { pause: 'Pause' } },
    };

    update(newProps);

    expect(IVLabsPlayer.mock.results[0].value.loadCues).toHaveBeenLastCalledWith(newProps.cues);
    expect(IVLabsPlayer.mock.results[0].value.loadTranslations).toHaveBeenLastCalledWith(
      'en',
      newProps.translations,
    );
  });
});
