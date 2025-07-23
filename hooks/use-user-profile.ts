'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { getUserProfile } from '@/lib/database/profiles'
import { UserProfile } from '@/lib/types/database'

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const profileData = await getUserProfile(user.id)
      setProfile(profileData)
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError('Failed to load profile data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [user])

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    setProfile
  }
}
