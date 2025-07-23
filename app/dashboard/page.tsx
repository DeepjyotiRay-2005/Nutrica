"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, Droplets, Trash2 } from "lucide-react"
import Navbar from "@/components/navbar"
import AddMealDialog from "@/components/add-meal-dialog"

interface LoggedFood {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  quantity: number
  mealType: string
  servingSize: string
}

export default function DashboardPage() {
  const [loggedFoods, setLoggedFoods] = useState<LoggedFood[]>([
    {
      id: "1",
      name: "Greek Yogurt",
      calories: 100,
      protein: 17,
      carbs: 6,
      fats: 0,
      quantity: 1,
      mealType: "breakfast",
      servingSize: "1 cup (170g)",
    },
    {
      id: "2",
      name: "Banana",
      calories: 105,
      protein: 1,
      carbs: 27,
      fats: 0,
      quantity: 1,
      mealType: "breakfast",
      servingSize: "1 medium (118g)",
    },
  ])

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Calculate totals from logged foods
  const totals = loggedFoods.reduce(
    (acc, food) => ({
      calories: acc.calories + food.calories * food.quantity,
      protein: acc.protein + food.protein * food.quantity,
      carbs: acc.carbs + food.carbs * food.quantity,
      fats: acc.fats + food.fats * food.quantity,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 },
  )

  // Daily targets (these could come from user profile)
  const targets = {
    calories: 2500,
    protein: 150,
    carbs: 300,
    fats: 80,
  }

  const macros = [
    {
      name: "Calories",
      current: Math.round(totals.calories * 10) / 10,
      target: targets.calories,
      unit: "kcal",
      color: "bg-green-500",
    },
    { name: "Protein", current: Math.round(totals.protein), target: targets.protein, unit: "g", color: "bg-blue-500" },
    { name: "Carbs", current: Math.round(totals.carbs), target: targets.carbs, unit: "g", color: "bg-orange-500" },
    { name: "Fats", current: Math.round(totals.fats), target: targets.fats, unit: "g", color: "bg-purple-500" },
  ]

  const handleAddMeal = (meal: { food: any; quantity: number; mealType: string }) => {
    const newFood: LoggedFood = {
      id: Date.now().toString(),
      name: meal.food.name,
      calories: meal.food.calories,
      protein: meal.food.protein,
      carbs: meal.food.carbs,
      fats: meal.food.fats,
      quantity: meal.quantity,
      mealType: meal.mealType,
      servingSize: meal.food.servingSize,
    }
    setLoggedFoods([...loggedFoods, newFood])
  }

  const handleRemoveFood = (id: string) => {
    setLoggedFoods(loggedFoods.filter((food) => food.id !== id))
  }

  const getMealFoods = (mealType: string) => {
    return loggedFoods.filter((food) => food.mealType === mealType)
  }

  const getMealCalories = (mealType: string) => {
    return getMealFoods(mealType).reduce((total, food) => total + food.calories * food.quantity, 0)
  }

  const mealTypes = [
    { key: "breakfast", name: "Breakfast" },
    { key: "lunch", name: "Lunch" },
    { key: "dinner", name: "Dinner" },
    { key: "snacks", name: "Snacks" },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back, Alex!</h1>
            <p className="text-slate-600">{today}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Macronutrient Tracking */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Today's Nutrition</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {macros.map((macro) => {
                  const percentage = Math.min((macro.current / macro.target) * 100, 100)
                  return (
                    <Card key={macro.name}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{macro.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold text-slate-800">{macro.current}</span>
                          <span className="text-slate-600">
                            / {macro.target} {macro.unit}
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <div className="text-xs text-slate-500 mt-1">
                          {macro.current > macro.target
                            ? "Over target"
                            : `${macro.target - macro.current} ${macro.unit} remaining`}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Today's Logged Meals */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Today's Meals</h2>
                <AddMealDialog onAddMeal={handleAddMeal} />
              </div>
              <Card>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {mealTypes.map((mealType) => {
                      const mealFoods = getMealFoods(mealType.key)
                      const mealCalories = getMealCalories(mealType.key)

                      return (
                        <AccordionItem key={mealType.key} value={mealType.key}>
                          <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <div className="flex justify-between items-center w-full mr-4">
                              <span className="font-medium">{mealType.name}</span>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">{mealFoods.length} items</Badge>
                                <span className="text-slate-600">{mealCalories} kcal</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="space-y-3">
                              {mealFoods.length === 0 ? (
                                <p className="text-slate-500 text-center py-4">No foods logged for this meal</p>
                              ) : (
                                mealFoods.map((food) => (
                                  <div
                                    key={food.id}
                                    className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
                                  >
                                    <div>
                                      <p className="font-medium">{food.name}</p>
                                      <p className="text-sm text-slate-600">
                                        {food.quantity} × {food.servingSize}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <div className="text-right">
                                        <p className="font-medium">{Math.round(food.calories * food.quantity)} cal</p>
                                        <div className="flex gap-1">
                                          <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                                            P: {Math.round(food.protein * food.quantity)}g
                                          </Badge>
                                          <Badge
                                            variant="outline"
                                            className="text-xs border-orange-200 text-orange-700"
                                          >
                                            C: {Math.round(food.carbs * food.quantity)}g
                                          </Badge>
                                          <Badge
                                            variant="outline"
                                            className="text-xs border-purple-200 text-purple-700"
                                          >
                                            F: {Math.round(food.fats * food.quantity)}g
                                          </Badge>
                                        </div>
                                      </div>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleRemoveFood(food.id)}
                                        className="text-red-600 hover:bg-red-50"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Water Intake Tracker */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  Water Intake
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-slate-800 mb-2">4 / 8</div>
                  <div className="text-slate-600">glasses today</div>
                </div>
                <div className="flex justify-center gap-4">
                  <Button size="sm" variant="outline">
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Progress value={50} className="mt-4 h-2" />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Current Weight</span>
                  <span className="font-semibold">68.5 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Goal Weight</span>
                  <span className="font-semibold">65 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Progress</span>
                  <span className="font-semibold text-green-600">-1.5 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Calories Today</span>
                  <span className="font-semibold">
                    {Math.round(totals.calories * 10) / 10} / {targets.calories}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
