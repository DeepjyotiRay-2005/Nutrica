import { createClient } from '@/lib/supabase/client'
import { UserProfile, UserProfileInput } from '@/lib/types/database'

export async function createUserProfile(userId: string, profileData: UserProfileInput): Promise<UserProfile | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      user_id: userId,
      ...profileData
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating user profile:', error)
    throw error
  }

  return data
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No profile found
      return null
    }
    console.error('Error fetching user profile:', error)
    throw error
  }

  return data
}

export async function updateUserProfile(userId: string, profileData: Partial<UserProfileInput>): Promise<UserProfile | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      ...profileData,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating user profile:', error)
    throw error
  }

  return data
}

export async function upsertUserProfile(userId: string, profileData: UserProfileInput): Promise<UserProfile | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert({
      user_id: userId,
      ...profileData,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) {
    console.error('Error upserting user profile:', error)
    throw error
  }

  return data
}
