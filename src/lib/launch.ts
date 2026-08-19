/**
 * Launch gate configuration.
 *
 * Before LAUNCH_AT the site serves ONLY the pre-launch countdown experience.
 * After it, the real website is served. To open the site early (or to disable
 * the gate permanently), change / remove LAUNCH_AT_ISO below.
 */
export const LAUNCH_AT_ISO = "2026-08-25T00:00:00+05:30";
export const LAUNCH_AT = new Date(LAUNCH_AT_ISO).getTime();

/** Human-readable launch date shown on the countdown page. */
export const LAUNCH_DATE_LABEL = "25 August 2026 · 00:00 IST";

/** Secret bypass: append ?preview=nomads2026 to view the real site early. */
export const PREVIEW_PARAM = "preview";
export const PREVIEW_TOKEN = "nomads2026";
export const PREVIEW_STORAGE_KEY = "wn-launch-preview";

export type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
};

export function getRemaining(now: number = Date.now()): Remaining {
  const total = Math.max(0, LAUNCH_AT - now);
  const seconds = Math.floor(total / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    total,
  };
}

export function isPreLaunch(now: number = Date.now()): boolean {
  return now < LAUNCH_AT;
}
