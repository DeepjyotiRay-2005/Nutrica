"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Clock, Target, ChefHat } from "lucide-react"

interface GenerateMealPlanDialogProps {
  onGeneratePlan: (preferences: any) => void
}

export default function GenerateMealPlanDialog({ onGeneratePlan }: GenerateMealPlanDialogProps) {
  const [open, setOpen] = useState(false)
  const [preferences, setPreferences] = useState({
    goal: "balanced",
    calorieTarget: "2000",
    dietType: "omnivore",
    cookingTime: "30",
    mealsPerDay: "3",
    excludeIngredients: "",
    includeSnacks: false,
    mealComplexity: "medium",
    cuisinePreference: "any",
  })

  const handleGenerate = () => {
    onGeneratePlan(preferences)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600">
          <Zap className="w-4 h-4 mr-2" />
          Generate New Meal Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-green-500" />
            Generate AI Meal Plan
          </DialogTitle>
          <DialogDescription>
            Customize your meal plan preferences to get personalized recommendations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Goals */}
          <div className="grid grid-cols-3 gap-3">
            <Card
              className={`cursor-pointer transition-colors ${
                preferences.goal === "weight-loss" ? "ring-2 ring-green-500 bg-green-50" : "hover:bg-slate-50"
              }`}
              onClick={() => setPreferences({ ...preferences, goal: "weight-loss" })}
            >
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <p className="font-medium text-sm">Weight Loss</p>
              </CardContent>
            </Card>
            <Card
              className={`cursor-pointer transition-colors ${
                preferences.goal === "muscle-gain" ? "ring-2 ring-green-500 bg-green-50" : "hover:bg-slate-50"
              }`}
              onClick={() => setPreferences({ ...preferences, goal: "muscle-gain" })}
            >
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <p className="font-medium text-sm">Muscle Gain</p>
              </CardContent>
            </Card>
            <Card
              className={`cursor-pointer transition-colors ${
                preferences.goal === "balanced" ? "ring-2 ring-green-500 bg-green-50" : "hover:bg-slate-50"
              }`}
              onClick={() => setPreferences({ ...preferences, goal: "balanced" })}
            >
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <p className="font-medium text-sm">Balanced</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Calorie Target */}
            <div className="space-y-2">
              <Label>Daily Calorie Target</Label>
              <Input
                type="number"
                value={preferences.calorieTarget}
                onChange={(e) => setPreferences({ ...preferences, calorieTarget: e.target.value })}
                placeholder="2000"
              />
            </div>

            {/* Meals Per Day */}
            <div className="space-y-2">
              <Label>Meals Per Day</Label>
              <Select
                value={preferences.mealsPerDay}
                onValueChange={(value) => setPreferences({ ...preferences, mealsPerDay: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Meals</SelectItem>
                  <SelectItem value="4">3 Meals + 1 Snack</SelectItem>
                  <SelectItem value="5">3 Meals + 2 Snacks</SelectItem>
                  <SelectItem value="6">6 Small Meals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Diet Type */}
            <div className="space-y-2">
              <Label>Diet Preference</Label>
              <Select
                value={preferences.dietType}
                onValueChange={(value) => setPreferences({ ...preferences, dietType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="omnivore">Omnivore</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="pescatarian">Pescatarian</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="paleo">Paleo</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cooking Time */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Max Cooking Time (minutes)
              </Label>
              <Select
                value={preferences.cookingTime}
                onValueChange={(value) => setPreferences({ ...preferences, cookingTime: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Meal Complexity */}
            <div className="space-y-2">
              <Label>Meal Complexity</Label>
              <Select
                value={preferences.mealComplexity}
                onValueChange={(value) => setPreferences({ ...preferences, mealComplexity: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple (5 ingredients or less)</SelectItem>
                  <SelectItem value="medium">Medium (6-10 ingredients)</SelectItem>
                  <SelectItem value="complex">Complex (10+ ingredients)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cuisine Preference */}
            <div className="space-y-2">
              <Label>Cuisine Preference</Label>
              <Select
                value={preferences.cuisinePreference}
                onValueChange={(value) => setPreferences({ ...preferences, cuisinePreference: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Cuisine</SelectItem>
                  <SelectItem value="american">American</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="asian">Asian</SelectItem>
                  <SelectItem value="mexican">Mexican</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="indian">Indian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Exclude Ingredients */}
          <div className="space-y-2">
            <Label>Exclude Ingredients (optional)</Label>
            <Textarea
              placeholder="e.g., nuts, dairy, shellfish, mushrooms..."
              value={preferences.excludeIngredients}
              onChange={(e) => setPreferences({ ...preferences, excludeIngredients: e.target.value })}
              rows={2}
            />
          </div>

          {/* Include Snacks Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeSnacks"
              checked={preferences.includeSnacks}
              onCheckedChange={(checked) => setPreferences({ ...preferences, includeSnacks: checked as boolean })}
            />
            <Label htmlFor="includeSnacks">Include healthy snack suggestions</Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleGenerate} className="flex-1 bg-green-500 hover:bg-green-600">
              <Zap className="w-4 h-4 mr-2" />
              Generate Meal Plan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
