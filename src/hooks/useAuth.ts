import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UseAuthOptions {
  requireAuth?: boolean;
  redirectTo?: string;
}

interface UseAuthReturn {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

/**
 * Custom hook for managing authentication state
 * Centralizes auth logic to avoid duplication across components
 *
 * @param options - Configuration options
 * @param options.requireAuth - If true, redirects to /auth when not logged in
 * @param options.redirectTo - Custom redirect path (default: /auth)
 * @returns Authentication state and helper functions
 */
export function useAuth(options: UseAuthOptions = {}): UseAuthReturn {
  const { requireAuth = false, redirectTo = '/auth' } = options;
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Redirect if auth is required but user is not logged in
        if (requireAuth && !currentSession) {
          navigate(redirectTo);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      // Handle auth state changes
      if (requireAuth && !currentSession) {
        navigate(redirectTo);
      }

      // Auto-navigate to dashboard on login (if not already there)
      if (event === 'SIGNED_IN' && currentSession && window.location.pathname === '/auth') {
        navigate('/dashboard');
      }

      // Auto-navigate to home on logout
      if (event === 'SIGNED_OUT') {
        navigate('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [requireAuth, redirectTo, navigate]);

  /**
   * Sign out the current user
   */
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    user,
    session,
    isLoading,
    signOut,
  };
}
