"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/components/auth-provider"
import { toast } from "sonner"
import { upsertUserProfile } from "@/lib/database/profiles"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const totalSteps = 4
  const router = useRouter()
  const supabase = createClient()
  const { user } = useAuth()

  // Form data
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    gender: 'male',
    activityLevel: '',
    primaryGoal: 'lose-fat',
    dietPreference: '',
    allergies: ''
  })

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    // Basic validation for each step
    if (currentStep === 1) {
      if (!formData.age || !formData.height || !formData.weight) {
        toast.error('Please fill in all personal details')
        return
      }
    }
    if (currentStep === 2) {
      if (!formData.activityLevel) {
        toast.error('Please select your activity level')
        return
      }
    }
    if (currentStep === 4) {
      if (!formData.dietPreference) {
        toast.error('Please select your diet preference')
        return
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = async () => {
    if (!user) {
      toast.error('Please log in to continue')
      router.push('/login')
      return
    }

    // Validate required fields
    if (!formData.age || !formData.height || !formData.weight || !formData.activityLevel || !formData.dietPreference) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      // Save the onboarding data to the database
      const profileData = {
        age: parseInt(formData.age),
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        gender: formData.gender as 'male' | 'female' | 'other',
        activity_level: formData.activityLevel as 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active',
        primary_goal: formData.primaryGoal as 'lose-fat' | 'gain-muscle' | 'maintain-weight',
        diet_preference: formData.dietPreference as 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo',
        ...(formData.allergies && { allergies: formData.allergies })
      }

      await upsertUserProfile(user.id, profileData)
      
      toast.success('Onboarding completed! Welcome to FitAI!')
      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error('Error completing onboarding. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-600">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <CardTitle className="text-2xl text-slate-800">
            {currentStep === 1 && "Personal Details"}
            {currentStep === 2 && "Lifestyle"}
            {currentStep === 3 && "Goals"}
            {currentStep === 4 && "Preferences"}
          </CardTitle>
          <CardDescription className="text-slate-600">
            {currentStep === 1 && "Tell us about yourself"}
            {currentStep === 2 && "How active are you?"}
            {currentStep === 3 && "What's your primary goal?"}
            {currentStep === 4 && "Any dietary preferences?"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    placeholder="25" 
                    value={formData.age}
                    onChange={(e) => updateFormData('age', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    placeholder="170" 
                    value={formData.height}
                    onChange={(e) => updateFormData('height', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  type="number" 
                  placeholder="70" 
                  value={formData.weight}
                  onChange={(e) => updateFormData('weight', e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <Label>Gender</Label>
                <RadioGroup 
                  value={formData.gender}
                  onValueChange={(value) => updateFormData('gender', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Daily Activity Level</Label>
                <Select 
                  value={formData.activityLevel}
                  onValueChange={(value) => updateFormData('activityLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="lightly-active">Lightly Active (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderately-active">
                      Moderately Active (moderate exercise 3-5 days/week)
                    </SelectItem>
                    <SelectItem value="very-active">Very Active (hard exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="extremely-active">
                      Extremely Active (very hard exercise, physical job)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Primary Goal</Label>
                <RadioGroup 
                  value={formData.primaryGoal}
                  onValueChange={(value) => updateFormData('primaryGoal', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lose-fat" id="lose-fat" />
                    <Label htmlFor="lose-fat">Lose Fat</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gain-muscle" id="gain-muscle" />
                    <Label htmlFor="gain-muscle">Gain Muscle</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maintain-weight" id="maintain-weight" />
                    <Label htmlFor="maintain-weight">Maintain Weight</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Diet Preference</Label>
                <Select 
                  value={formData.dietPreference}
                  onValueChange={(value) => updateFormData('dietPreference', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your diet preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="omnivore">Omnivore</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="pescatarian">Pescatarian</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="paleo">Paleo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies or foods to exclude</Label>
                <Input 
                  id="allergies" 
                  placeholder="e.g., nuts, dairy, gluten" 
                  value={formData.allergies}
                  onChange={(e) => updateFormData('allergies', e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Back
            </Button>
            {currentStep < totalSteps ? (
              <Button onClick={nextStep} className="bg-green-500 hover:bg-green-600">
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleFinish} 
                className="bg-green-500 hover:bg-green-600"
                disabled={loading}
              >
                {loading ? 'Finishing...' : 'Finish'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
