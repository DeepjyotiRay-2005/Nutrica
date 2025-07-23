"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Settings,
  Target,
  Bell,
  Shield,
  Camera,
  Save,
  LogOut,
  Activity,
  Calendar,
  Award,
  TrendingUp,
  Heart,
  Zap,
} from "lucide-react"
import Navbar from "@/components/navbar"
import { useAuth } from "@/components/auth-provider"
import { useUserProfile } from "@/hooks/use-user-profile"
import { updateUserProfile } from "@/lib/database/profiles"
import { toast } from "sonner"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { profile, loading: profileLoading, refetch } = useUserProfile()
  
  // Form data for editing
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    gender: 'male',
    activityLevel: '',
    primaryGoal: '',
    dietPreference: '',
    allergies: ''
  })

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        age: profile.age?.toString() || '',
        height: profile.height?.toString() || '',
        weight: profile.weight?.toString() || '',
        gender: profile.gender || 'male',
        activityLevel: profile.activity_level || '',
        primaryGoal: profile.primary_goal || '',
        dietPreference: profile.diet_preference || '',
        allergies: profile.allergies || ''
      })
    }
  }, [profile])

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!user || !profile) return

    setLoading(true)
    try {
      const updateData = {
        age: parseInt(formData.age),
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        gender: formData.gender as 'male' | 'female' | 'other',
        activity_level: formData.activityLevel as any,
        primary_goal: formData.primaryGoal as any,
        diet_preference: formData.dietPreference as any,
        ...(formData.allergies && { allergies: formData.allergies })
      }

      await updateUserProfile(user.id, updateData)
      await refetch()
      setIsEditing(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data to original profile data
    if (profile) {
      setFormData({
        age: profile.age?.toString() || '',
        height: profile.height?.toString() || '',
        weight: profile.weight?.toString() || '',
        gender: profile.gender || 'male',
        activityLevel: profile.activity_level || '',
        primaryGoal: profile.primary_goal || '',
        dietPreference: profile.diet_preference || '',
        allergies: profile.allergies || ''
      })
    }
  }

  const [notifications, setNotifications] = useState({
    mealReminders: true,
    workoutReminders: false,
    progressUpdates: true,
    weeklyReports: true,
  })

  // Helper functions to get display labels
  const getActivityLevelLabel = (level: string) => {
    const labels = {
      'sedentary': 'Sedentary',
      'lightly-active': 'Lightly Active',
      'moderately-active': 'Moderately Active', 
      'very-active': 'Very Active',
      'extremely-active': 'Extremely Active'
    }
    return labels[level as keyof typeof labels] || level
  }

  const getGoalLabel = (goal: string) => {
    const labels = {
      'lose-fat': 'Weight Loss Goal',
      'gain-muscle': 'Muscle Gain Goal',
      'maintain-weight': 'Maintain Weight Goal'
    }
    return labels[goal as keyof typeof labels] || goal
  }

  const getDietLabel = (diet: string) => {
    const labels = {
      'omnivore': 'Omnivore',
      'vegetarian': 'Vegetarian',
      'vegan': 'Vegan',
      'pescatarian': 'Pescatarian',
      'keto': 'Keto',
      'paleo': 'Paleo'
    }
    return labels[diet as keyof typeof labels] || diet
  }

  const achievements = [
    { name: "First Week Complete", icon: Calendar, color: "bg-green-500", earned: true },
    { name: "Meal Streak 7 days", icon: Zap, color: "bg-blue-500", earned: true },
    { name: "Weight Goal Reached", icon: Target, color: "bg-purple-500", earned: false },
    { name: "Consistency Champion", icon: Award, color: "bg-yellow-500", earned: false },
  ]

  const stats = [
    { label: "Days Active", value: "28", icon: Activity, color: "text-green-600" },
    { label: "Meals Logged", value: "156", icon: Heart, color: "text-red-600" },
    { label: "Weight Lost", value: "2.5 kg", icon: TrendingUp, color: "text-blue-600" },
    { label: "Streak", value: "7 days", icon: Zap, color: "text-yellow-600" },
  ]

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="text-center p-8">
            <CardContent>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Profile Not Found</h2>
              <p className="text-slate-600 mb-4">
                It looks like you haven't completed your profile setup yet.
              </p>
              <Button 
                onClick={() => window.location.href = '/onboarding'}
                className="bg-green-500 hover:bg-green-600"
              >
                Complete Setup
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const userDisplayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const userInitials = userDisplayName.split(' ').map((name: string) => name[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500"></div>
            <CardContent className="relative pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                    <AvatarFallback className="text-2xl font-bold bg-green-500 text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0 bg-white text-slate-600 hover:bg-slate-100"
                    variant="outline"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1 md:mb-4">
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">{userDisplayName}</h1>
                  <p className="text-slate-600 mb-4">
                    {profile.age ? `${profile.age} years old` : ''} 
                    {profile.age && profile.height && profile.weight ? ' • ' : ''}
                    {profile.height && profile.weight ? `${profile.height}cm, ${profile.weight}kg` : ''}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {profile.primary_goal && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Target className="w-3 h-3 mr-1" />
                        {getGoalLabel(profile.primary_goal)}
                      </Badge>
                    )}
                    {profile.activity_level && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        <Activity className="w-3 h-3 mr-1" />
                        {getActivityLevelLabel(profile.activity_level)}
                      </Badge>
                    )}
                    {profile.diet_preference && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        <Heart className="w-3 h-3 mr-1" />
                        {getDietLabel(profile.diet_preference)}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600"
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="bg-white"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-4">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-green-500" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>Your personal details and measurements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => updateFormData('age', e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-slate-50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={formData.height}
                        onChange={(e) => updateFormData('height', e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-slate-50" : ""}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Current Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => updateFormData('weight', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-slate-50" : ""}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>Gender</Label>
                    <RadioGroup 
                      value={formData.gender}
                      onValueChange={(value) => updateFormData('gender', value)}
                      disabled={!isEditing}
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    Lifestyle
                  </CardTitle>
                  <CardDescription>Your activity level and dietary preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Daily Activity Level</Label>
                    <Select 
                      value={formData.activityLevel}
                      onValueChange={(value) => updateFormData('activityLevel', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className={!isEditing ? "bg-slate-50" : ""}>
                        <SelectValue placeholder="Select activity level" />
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
                  <div className="space-y-2">
                    <Label>Diet Preference</Label>
                    <Select 
                      value={formData.dietPreference}
                      onValueChange={(value) => updateFormData('dietPreference', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className={!isEditing ? "bg-slate-50" : ""}>
                        <SelectValue placeholder="Select diet preference" />
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
                      value={formData.allergies}
                      onChange={(e) => updateFormData('allergies', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-slate-50" : ""}
                      placeholder="e.g., nuts, dairy, gluten"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-500" />
                    Fitness Goals
                  </CardTitle>
                  <CardDescription>Set and track your fitness objectives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label>Primary Goal</Label>
                    <RadioGroup 
                      value={formData.primaryGoal}
                      onValueChange={(value) => updateFormData('primaryGoal', value)}
                      disabled={!isEditing}
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
                  <div className="space-y-2">
                    <Label htmlFor="target-weight">Target Weight (kg)</Label>
                    <Input
                      id="target-weight"
                      type="number"
                      defaultValue="65"
                      disabled={!isEditing}
                      className={!isEditing ? "bg-slate-50" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-date">Target Date</Label>
                    <Input
                      id="target-date"
                      type="date"
                      defaultValue="2024-06-01"
                      disabled={!isEditing}
                      className={!isEditing ? "bg-slate-50" : ""}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Progress Overview
                  </CardTitle>
                  <CardDescription>Your current progress towards goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Weight Progress</span>
                      <span className="font-medium">2.5 kg lost</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "50%" }}></div>
                    </div>
                    <p className="text-xs text-slate-600">50% to goal weight</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Daily Calorie Goal</span>
                      <span className="font-medium">2000 kcal</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <p className="text-xs text-slate-600">Average: 1700 kcal/day</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Your Achievements
                </CardTitle>
                <CardDescription>Celebrate your fitness milestones and accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          achievement.earned
                            ? "border-green-200 bg-green-50"
                            : "border-slate-200 bg-slate-50 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              achievement.earned ? achievement.color : "bg-slate-300"
                            }`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800">{achievement.name}</h3>
                            <p className="text-sm text-slate-600">
                              {achievement.earned ? "Completed!" : "In Progress"}
                            </p>
                          </div>
                          {achievement.earned && <Badge className="ml-auto bg-green-500 text-white">Earned</Badge>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-500" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="meal-reminders" className="font-medium">
                        Meal Reminders
                      </Label>
                      <p className="text-sm text-slate-600">Get notified when it's time to log your meals</p>
                    </div>
                    <Switch
                      id="meal-reminders"
                      checked={notifications.mealReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, mealReminders: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="workout-reminders" className="font-medium">
                        Workout Reminders
                      </Label>
                      <p className="text-sm text-slate-600">Get reminded about your scheduled workouts</p>
                    </div>
                    <Switch
                      id="workout-reminders"
                      checked={notifications.workoutReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, workoutReminders: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="progress-updates" className="font-medium">
                        Progress Updates
                      </Label>
                      <p className="text-sm text-slate-600">Receive updates about your fitness progress</p>
                    </div>
                    <Switch
                      id="progress-updates"
                      checked={notifications.progressUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, progressUpdates: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-reports" className="font-medium">
                        Weekly Reports
                      </Label>
                      <p className="text-sm text-slate-600">Get weekly summaries of your activity</p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-500" />
                    Account & Privacy
                  </CardTitle>
                  <CardDescription>Manage your account settings and privacy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-white">
                    <Shield className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-white">
                    <User className="w-4 h-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Data Export
                  </Button>

                  <Separator />

                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-white"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
