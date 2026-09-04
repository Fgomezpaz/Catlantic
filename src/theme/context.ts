import { createContext } from 'react';
import type { Theme, ThemePreference } from './types';

export interface ThemeContextValue {
  /** What the user chose: an explicit theme or "auto" (follows the clock). */
  preference: ThemePreference;
  /** The theme currently painted. */
  theme: Theme;
  setPreference: (next: ThemePreference) => void;
  /** Flips to the opposite of the current theme and pins it. */
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
