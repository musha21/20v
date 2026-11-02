import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { mobileToAuthEmail, normalizeMobile, isValidMobile } from '../utils/authEmail'

const AuthContext = createContext(null)

async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
  if (error) throw error
  return data
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refreshProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null)
      return null
    }
    const data = await fetchProfile(userId)
    setProfile(data)
    return data
  }, [])

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return
      setSession(data.session)
      if (data.session?.user) {
        try {
          await refreshProfile(data.session.user.id)
        } catch (err) {
          setError(err.message)
        }
      }
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession)
      if (nextSession?.user) {
        try {
          await refreshProfile(nextSession.user.id)
        } catch (err) {
          setError(err.message)
        }
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [refreshProfile])

  const register = useCallback(async ({ fullName, mobile, password }) => {
    setError(null)
    if (!isValidMobile(mobile)) {
      throw new Error('Enter a valid mobile number')
    }
    const normalized = normalizeMobile(mobile)
    const email = mobileToAuthEmail(normalized)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          mobile_number: normalized,
        },
      },
    })
    if (signUpError) throw signUpError
    return data
  }, [])

  const login = useCallback(async ({ mobile, password }) => {
    setError(null)
    if (!isValidMobile(mobile)) {
      throw new Error('Enter a valid mobile number')
    }
    const email = mobileToAuthEmail(mobile)
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (signInError) throw signInError

    const nextProfile = await refreshProfile(data.user.id)
    return { session: data.session, profile: nextProfile }
  }, [refreshProfile])

  const logout = useCallback(async () => {
    setError(null)
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) throw signOutError
    setProfile(null)
    setSession(null)
  }, [])

  const bootstrapAdmin = useCallback(async (mobile) => {
    const normalized = normalizeMobile(mobile)
    const { data, error: rpcError } = await supabase.rpc('bootstrap_admin', {
      p_mobile_number: normalized,
    })
    if (rpcError) throw rpcError
    setProfile(data)
    return data
  }, [])

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      loading,
      error,
      isAdmin: profile?.role === 'ADMIN' && profile?.status === 'APPROVED',
      isApprovedPlayer: profile?.role === 'PLAYER' && profile?.status === 'APPROVED',
      isPending: profile?.status === 'PENDING',
      isRejected: profile?.status === 'REJECTED',
      register,
      login,
      logout,
      bootstrapAdmin,
      refreshProfile,
    }),
    [session, profile, loading, error, register, login, logout, bootstrapAdmin, refreshProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
