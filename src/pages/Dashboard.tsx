import { useCallback, useState } from 'react';
import { DashboardGate } from '../components/dashboard/DashboardGate';
import { DashboardShell } from '../components/dashboard/DashboardShell';

const SESSION_KEY = 'catlantic.demo.session';

function readSession(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function writeSession(value: boolean): void {
  try {
    if (value) window.sessionStorage.setItem(SESSION_KEY, '1');
    else window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Storage may be unavailable (private mode, embedded preview); the in-memory state still works.
  }
}

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(readSession);

  const signIn = useCallback(() => {
    writeSession(true);
    setAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    writeSession(false);
    setAuthenticated(false);
  }, []);

  return authenticated ? <DashboardShell onSignOut={signOut} /> : <DashboardGate onAuthenticated={signIn} />;
}
