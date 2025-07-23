"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Pencil, Clock, Users, ChefHat, Calendar, Star } from "lucide-react"
import Navbar from "@/components/navbar"
import GenerateMealPlanDialog from "@/components/generate-meal-plan-dialog"

export default function MealPlannerPage() {
  const [isGenerating, setIsGenerating] = useState(false)

  const days = [
    { key: "Monday", label: "Mon" },
    { key: "Tuesday", label: "Tue" },
    { key: "Wednesday", label: "Wed" },
    { key: "Thursday", label: "Thu" },
    { key: "Friday", label: "Fri" },
    { key: "Saturday", label: "Sat" },
    { key: "Sunday", label: "Sun" },
  ]

  const sampleMeals = {
    breakfast: [
      {
        name: "Greek Yogurt Berry Bowl",
        macros: "P: 20g, C: 30g, F: 8g",
        calories: 280,
        cookTime: "5 min",
        difficulty: "Easy",
        rating: 4.8,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Overnight Oats with Banana",
        macros: "P: 12g, C: 45g, F: 6g",
        calories: 320,
        cookTime: "5 min prep",
        difficulty: "Easy",
        rating: 4.6,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Protein Smoothie Bowl",
        macros: "P: 25g, C: 35g, F: 10g",
        calories: 350,
        cookTime: "10 min",
        difficulty: "Easy",
        rating: 4.7,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    lunch: [
      {
        name: "Grilled Chicken Caesar Salad",
        macros: "P: 35g, C: 15g, F: 12g",
        calories: 420,
        cookTime: "20 min",
        difficulty: "Medium",
        rating: 4.5,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Quinoa Buddha Bowl",
        macros: "P: 18g, C: 40g, F: 14g",
        calories: 380,
        cookTime: "25 min",
        difficulty: "Medium",
        rating: 4.4,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Turkey Avocado Wrap",
        macros: "P: 28g, C: 32g, F: 11g",
        calories: 360,
        cookTime: "10 min",
        difficulty: "Easy",
        rating: 4.3,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    dinner: [
      {
        name: "Herb-Crusted Salmon",
        macros: "P: 40g, C: 20g, F: 18g",
        calories: 480,
        cookTime: "30 min",
        difficulty: "Medium",
        rating: 4.9,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Lean Beef Stir Fry",
        macros: "P: 38g, C: 25g, F: 15g",
        calories: 450,
        cookTime: "25 min",
        difficulty: "Medium",
        rating: 4.6,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Coconut Curry Tofu",
        macros: "P: 22g, C: 35g, F: 16g",
        calories: 420,
        cookTime: "35 min",
        difficulty: "Medium",
        rating: 4.4,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  }

  const handleGeneratePlan = async (preferences: any) => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    // Here you would typically update the meal plan with new data
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "Hard":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">AI Meal Planner</h1>
            <p className="text-slate-600">Personalized meal plans tailored to your goals and preferences</p>
          </div>
          <div className="flex gap-3">
            <GenerateMealPlanDialog onGeneratePlan={handleGeneratePlan} />
            <Button variant="outline" className="bg-white">
              <Calendar className="w-4 h-4 mr-2" />
              Export Plan
            </Button>
          </div>
        </div>

        {/* Weekly Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-slate-600">Avg Calories</p>
                  <p className="text-xl font-bold">2,180</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-slate-600">Prep Time</p>
                  <p className="text-xl font-bold">25 min</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm text-slate-600">Servings</p>
                  <p className="text-xl font-bold">21</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-slate-600">Avg Rating</p>
                  <p className="text-xl font-bold">4.6</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loading State */}
        {isGenerating && (
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Generating Your Personalized Meal Plan</h3>
              <p className="text-slate-600">Our AI is creating the perfect meals based on your preferences...</p>
            </CardContent>
          </Card>
        )}

        {/* Daily Meal Plans */}
        <Tabs defaultValue="Monday" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8 bg-white p-1 rounded-lg shadow-sm">
            {days.map((day) => (
              <TabsTrigger
                key={day.key}
                value={day.key}
                className="text-sm font-medium data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                {day.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {days.map((day, dayIndex) => (
            <TabsContent key={day.key} value={day.key}>
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Breakfast */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={sampleMeals.breakfast[dayIndex % 3].image || "/placeholder.svg"}
                      alt="Breakfast"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-orange-500 text-white">Breakfast</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg leading-tight">
                        {sampleMeals.breakfast[dayIndex % 3].name}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{sampleMeals.breakfast[dayIndex % 3].rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">
                          {sampleMeals.breakfast[dayIndex % 3].calories} cal
                        </span>
                        <div className="flex gap-1">
                          <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                            P: {sampleMeals.breakfast[dayIndex % 3].macros.split(", ")[0].split(": ")[1]}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                            C: {sampleMeals.breakfast[dayIndex % 3].macros.split(", ")[1].split(": ")[1]}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                            F: {sampleMeals.breakfast[dayIndex % 3].macros.split(", ")[2].split(": ")[1]}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {sampleMeals.breakfast[dayIndex % 3].cookTime}
                        </div>
                        <Badge className={getDifficultyColor(sampleMeals.breakfast[dayIndex % 3].difficulty)}>
                          {sampleMeals.breakfast[dayIndex % 3].difficulty}
                        </Badge>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Replace
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Pencil className="w-3 h-3 mr-1" />
                          Customize
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Lunch */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={sampleMeals.lunch[dayIndex % 3].image || "/placeholder.svg"}
                      alt="Lunch"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-blue-500 text-white">Lunch</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg leading-tight">{sampleMeals.lunch[dayIndex % 3].name}</CardTitle>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{sampleMeals.lunch[dayIndex % 3].rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">{sampleMeals.lunch[dayIndex % 3].calories} cal</span>
                        <div className="flex gap-1">
                          <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                            P: {sampleMeals.lunch[dayIndex % 3].macros.split(", ")[0].split(": ")[1]}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                            C: {sampleMeals.lunch[dayIndex % 3].macros.split(", ")[1].split(": ")[1]}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                            F: {sampleMeals.lunch[dayIndex % 3].macros.split(", ")[2].split(": ")[1]}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {sampleMeals.lunch[dayIndex % 3].cookTime}
                        </div>
                        <Badge className={getDifficultyColor(sampleMeals.lunch[dayIndex % 3].difficulty)}>
                          {sampleMeals.lunch[dayIndex % 3].difficulty}
                        </Badge>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Replace
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Pencil className="w-3 h-3 mr-1" />
                          Customize
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dinner */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={sampleMeals.dinner[dayIndex % 3].image || "/placeholder.svg"}
                      alt="Dinner"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-purple-500 text-white">Dinner</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg leading-tight">{sampleMeals.dinner[dayIndex % 3].name}</CardTitle>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{sampleMeals.dinner[dayIndex % 3].rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">{sampleMeals.dinner[dayIndex % 3].calories} cal</span>
                        <div className="flex gap-1">
                          <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                            P: {sampleMeals.dinner[dayIndex % 3].macros.split(", ")[0].split(": ")[1]}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                            C: {sampleMeals.dinner[dayIndex % 3].macros.split(", ")[1].split(": ")[1]}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                            F: {sampleMeals.dinner[dayIndex % 3].macros.split(", ")[2].split(": ")[1]}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {sampleMeals.dinner[dayIndex % 3].cookTime}
                        </div>
                        <Badge className={getDifficultyColor(sampleMeals.dinner[dayIndex % 3].difficulty)}>
                          {sampleMeals.dinner[dayIndex % 3].difficulty}
                        </Badge>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Replace
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Pencil className="w-3 h-3 mr-1" />
                          Customize
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
