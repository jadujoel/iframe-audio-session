export type AudioSessionType
/**
 * Default behavior, the UA will determine the appropriate behavior based on the context of the audio.
 */
= "auto"
/**
 * Background FX, Games.
 * Mixes with other audio sessions.
 */
| "ambient"
/**
 * Music, Video, Podcasts
 * Pauses other audio sessions.
 * */
| "playback"
/**
 * UI sounds, Notifications
 * Ducks other audio sessions (Lowers their volume).
 */
| "transient"
/**
 * Voice commands, GPS
 * Pauses other audio sessions.
 */
| "transient-solo"
/**
 * Video calls, Recording
 * Interrups other audio sessions with priority,
 */
| "play-and-record";

export interface AudioSession extends EventTarget {
  /** @default "auto" */
  type: AudioSessionType;
}

export interface AudioSessionAble {
  audioSession: AudioSession;
}

export type NavigatorWithAudioSession = Navigator & AudioSessionAble;

export const AudioSessionTypes = {
  /** */
  Auto: "auto",
  /**
   * Background FX, Games.
   * Mixes with other audio sessions.
   */
  Ambient: "ambient",
  /**
   * Music, Video, Podcasts
   * Pauses other audio sessions.
   */
  Playback: "playback",
  /**
   * UI sounds, Notifications
   * Ducks other audio sessions (Lowers their volume).
   * */
  Transient: "transient",
  /**
   * Voice commands, GPS
   * Pauses other audio sessions.
   */
  TransientSolo: "transient-solo",
  /**
   * Video calls, Recording
   * Interrups other audio sessions with priority,
   */
  PlayAndRecord: "play-and-record"
} as const

export function isAudioSessionAble(thing: unknown): thing is AudioSessionAble {
  return (thing as any)?.audioSession?.type !== undefined;
}

export function isNavigatorWithAudioSession(navigator: Navigator): navigator is NavigatorWithAudioSession {
  return "audioSession" in navigator;
}

export function isWindowWithAudioSession(thing: unknown): thing is Window & { navigator: NavigatorWithAudioSession } {
  return typeof thing !== "undefined"
    && isNavigatorWithAudioSession(window.navigator);
}

export function setAudioSessionType(type: AudioSessionType) {
  if (isWindowWithAudioSession(window)) {
    window.navigator.audioSession.type = type;
  }
}

export function getAudioSessionType(): AudioSessionType | undefined {
  if (isWindowWithAudioSession(window)) {
    return window.navigator.audioSession.type;
  }
}

export function getAudioSession(): AudioSession | undefined {
  if (isWindowWithAudioSession(window)) {
    return window.navigator.audioSession;
  }
}
