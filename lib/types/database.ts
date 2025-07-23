export interface UserProfile {
  id: string
  user_id: string
  full_name: string | null
  age: number | null
  height: number | null
  weight: number | null
  gender: 'male' | 'female' | 'other' | null
  activity_level: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active' | null
  primary_goal: 'lose-fat' | 'gain-muscle' | 'maintain-weight' | null
  diet_preference: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo' | null
  allergies: string | null
  created_at: string
  updated_at: string
}

export interface UserProfileInput {
  age: number
  height: number
  weight: number
  gender: 'male' | 'female' | 'other'
  activity_level: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active'
  primary_goal: 'lose-fat' | 'gain-muscle' | 'maintain-weight'
  diet_preference: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo'
  allergies?: string
}
