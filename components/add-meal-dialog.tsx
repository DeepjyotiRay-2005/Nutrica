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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"

interface Food {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  servingSize: string
}

interface AddMealDialogProps {
  onAddMeal: (meal: { food: Food; quantity: number; mealType: string }) => void
}

export default function AddMealDialog({ onAddMeal }: AddMealDialogProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [mealType, setMealType] = useState("breakfast")

  // Sample food database
  const foodDatabase: Food[] = [
    {
      id: "1",
      name: "Greek Yogurt",
      calories: 100,
      protein: 17,
      carbs: 6,
      fats: 0,
      servingSize: "1 cup (170g)",
    },
    {
      id: "2",
      name: "Banana",
      calories: 105,
      protein: 1,
      carbs: 27,
      fats: 0,
      servingSize: "1 medium (118g)",
    },
    {
      id: "3",
      name: "Chicken Breast",
      calories: 165,
      protein: 31,
      carbs: 0,
      fats: 4,
      servingSize: "100g",
    },
    {
      id: "4",
      name: "Brown Rice",
      calories: 112,
      protein: 3,
      carbs: 23,
      fats: 1,
      servingSize: "1/2 cup cooked (98g)",
    },
    {
      id: "5",
      name: "Almonds",
      calories: 164,
      protein: 6,
      carbs: 6,
      fats: 14,
      servingSize: "1 oz (28g)",
    },
    {
      id: "6",
      name: "Salmon Fillet",
      calories: 206,
      protein: 22,
      carbs: 0,
      fats: 12,
      servingSize: "100g",
    },
    {
      id: "7",
      name: "Avocado",
      calories: 160,
      protein: 2,
      carbs: 9,
      fats: 15,
      servingSize: "1/2 medium (100g)",
    },
    {
      id: "8",
      name: "Oats",
      calories: 154,
      protein: 5,
      carbs: 28,
      fats: 3,
      servingSize: "1/2 cup dry (40g)",
    },
  ]

  const filteredFoods = foodDatabase.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddMeal = () => {
    if (selectedFood) {
      onAddMeal({
        food: selectedFood,
        quantity,
        mealType,
      })
      setOpen(false)
      setSelectedFood(null)
      setQuantity(1)
      setSearchTerm("")
    }
  }

  const calculateNutrition = (food: Food, qty: number) => ({
    calories: Math.round(food.calories * qty * 10) / 10,
    protein: Math.round(food.protein * qty),
    carbs: Math.round(food.carbs * qty),
    fats: Math.round(food.fats * qty),
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Meal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Food to Your Day</DialogTitle>
          <DialogDescription>Search for foods and add them to track your nutrition</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Meal Type Selection */}
          <div className="space-y-2">
            <Label>Meal Type</Label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snacks">Snacks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Food Search */}
          <div className="space-y-2">
            <Label>Search Foods</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search for foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Food Results */}
          {searchTerm && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <Label>Search Results</Label>
              <div className="grid gap-2">
                {filteredFoods.map((food) => (
                  <Card
                    key={food.id}
                    className={`cursor-pointer transition-colors ${
                      selectedFood?.id === food.id ? "ring-2 ring-green-500 bg-green-50" : "hover:bg-slate-50"
                    }`}
                    onClick={() => setSelectedFood(food)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{food.name}</h4>
                          <p className="text-sm text-slate-600">{food.servingSize}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{food.calories} cal</p>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              P: {food.protein}g
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              C: {food.carbs}g
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              F: {food.fats}g
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Selected Food Details */}
          {selectedFood && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Quantity</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseFloat(e.target.value) || 1)}
                    className="w-20"
                  />
                  <span className="text-sm text-slate-600">× {selectedFood.servingSize}</span>
                </div>
              </div>

              {/* Nutrition Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Nutrition Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-slate-800">
                        {calculateNutrition(selectedFood, quantity).calories}
                      </p>
                      <p className="text-sm text-slate-600">Calories</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {calculateNutrition(selectedFood, quantity).protein}g
                      </p>
                      <p className="text-sm text-slate-600">Protein</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">
                        {calculateNutrition(selectedFood, quantity).carbs}g
                      </p>
                      <p className="text-sm text-slate-600">Carbs</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">
                        {calculateNutrition(selectedFood, quantity).fats}g
                      </p>
                      <p className="text-sm text-slate-600">Fats</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleAddMeal} className="w-full bg-green-500 hover:bg-green-600">
                Add to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
