"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Truck, Bus, Sprout, Store, Users, MapPin, DollarSign, Utensils, Building, Heart } from "lucide-react"

interface InterventionStrategy {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  priority: "high" | "medium" | "low"
  estimatedCost: string
  timeframe: string
}

interface TractInfo {
  id: string
  state: string
  county: string
  zipCode: string
  isDesert: boolean
  isLowIncome: boolean
  isLowAccess: boolean
  distanceToGrocery: number
  medianIncome: number
  populationDensity: number
  povertyRate: number
  unemploymentRate: number
  educationBachelor: number
  vehicleAccess: number
  county_name: string
  state_name: string
}

interface InterventionCardsProps {
  selectedTract: TractInfo | null
  onClose: () => void
}

export default function InterventionCards({ selectedTract, onClose }: InterventionCardsProps) {
  const [dismissedCards, setDismissedCards] = useState<Set<string>>(new Set())

  if (!selectedTract || !selectedTract.isDesert) {
    return null
  }

  const dismissCard = (cardId: string) => {
    setDismissedCards((prev) => new Set([...prev, cardId]))
  }

  const resetDismissedCards = () => {
    setDismissedCards(new Set())
  }

  // Generate intervention strategies based on tract characteristics
  const getInterventionStrategies = (tract: TractInfo): InterventionStrategy[] => {
    const strategies: InterventionStrategy[] = []

    // Mobile Farmers Market - good for areas with low vehicle access
    if (tract.vehicleAccess < 80) {
      strategies.push({
        id: "mobile-farmers-market",
        title: "Mobile Farmers Market",
        description:
          "Weekly mobile market bringing fresh produce directly to the community, especially beneficial for areas with limited vehicle access.",
        icon: Truck,
        priority: "high",
        estimatedCost: "$50K-100K annually",
        timeframe: "3-6 months to launch",
      })
    }

    // Subsidized Transit Routes - for areas with low vehicle access and high distance to grocery
    if (tract.vehicleAccess < 70 && tract.distanceToGrocery > 1.5) {
      strategies.push({
        id: "subsidized-transit",
        title: "Subsidized Transit Routes",
        description:
          "Dedicated bus routes or shuttle services connecting residents to major grocery stores and farmers markets.",
        icon: Bus,
        priority: "high",
        estimatedCost: "$200K-500K annually",
        timeframe: "6-12 months to implement",
      })
    }

    // Community Gardens - good for high density areas with education
    if (tract.populationDensity > 3000) {
      strategies.push({
        id: "community-gardens",
        title: "Community Gardens",
        description:
          "Establish neighborhood gardens where residents can grow their own fresh produce and build community connections.",
        icon: Sprout,
        priority: "medium",
        estimatedCost: "$10K-30K initial setup",
        timeframe: "2-4 months to establish",
      })
    }

    // New Grocery Incentives - for areas with very high distance to grocery
    if (tract.distanceToGrocery > 2.0) {
      strategies.push({
        id: "grocery-incentives",
        title: "New Grocery Store Incentives",
        description: "Tax incentives and grants to attract full-service grocery stores to underserved areas.",
        icon: Store,
        priority: "high",
        estimatedCost: "$1M-5M in incentives",
        timeframe: "1-3 years to complete",
      })
    }

    // Corner Store Conversion - for high density, low income areas
    if (tract.populationDensity > 4000 && tract.povertyRate > 20) {
      strategies.push({
        id: "corner-store-conversion",
        title: "Corner Store Conversion",
        description: "Convert existing corner stores to offer fresh produce, healthy foods, and accept SNAP benefits.",
        icon: Building,
        priority: "medium",
        estimatedCost: "$25K-75K per store",
        timeframe: "3-9 months per store",
      })
    }

    // Food Assistance Programs - for very low income areas
    if (tract.povertyRate > 25) {
      strategies.push({
        id: "food-assistance",
        title: "Enhanced Food Assistance",
        description: "Expand SNAP benefits, WIC programs, and food pantry services with fresh produce options.",
        icon: Heart,
        priority: "high",
        estimatedCost: "$100K-300K annually",
        timeframe: "1-3 months to expand",
      })
    }

    // Nutrition Education - for areas with lower education levels
    if (tract.educationBachelor < 25) {
      strategies.push({
        id: "nutrition-education",
        title: "Nutrition Education Programs",
        description: "Community workshops on healthy eating, cooking classes, and nutrition education for families.",
        icon: Utensils,
        priority: "medium",
        estimatedCost: "$30K-80K annually",
        timeframe: "1-2 months to launch",
      })
    }

    // Food Delivery Cooperative - for areas with very low vehicle access
    if (tract.vehicleAccess < 60) {
      strategies.push({
        id: "delivery-cooperative",
        title: "Community Food Delivery",
        description:
          "Resident-led cooperative for bulk grocery purchasing and delivery to reduce individual transportation needs.",
        icon: Users,
        priority: "medium",
        estimatedCost: "$15K-40K startup",
        timeframe: "2-4 months to organize",
      })
    }

    return strategies.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }

  const interventionStrategies = getInterventionStrategies(selectedTract)
  const visibleStrategies = interventionStrategies.filter((strategy) => !dismissedCards.has(strategy.id))

  if (visibleStrategies.length === 0 && dismissedCards.size > 0) {
    return (
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000]">
        <Card className="w-80 shadow-lg">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-3">All intervention cards dismissed</p>
            <Button onClick={resetDismissedCards} size="sm">
              Show All Interventions
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] max-w-4xl w-full px-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-white bg-black bg-opacity-70 px-3 py-1 rounded">
            Intervention Strategies for Census Tract {selectedTract.id}
          </h3>
          <p className="text-sm text-white bg-black bg-opacity-70 px-3 py-1 rounded mt-1">
            {selectedTract.county_name}, {selectedTract.state_name}
          </p>
        </div>
        <Button onClick={onClose} variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
          <X className="h-4 w-4 mr-1" />
          Close All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {visibleStrategies.map((strategy) => {
          const IconComponent = strategy.icon
          return (
            <Card key={strategy.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg ${
                        strategy.priority === "high"
                          ? "bg-red-100 text-red-600"
                          : strategy.priority === "medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{strategy.title}</CardTitle>
                      <Badge
                        variant={
                          strategy.priority === "high"
                            ? "destructive"
                            : strategy.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {strategy.priority} priority
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => dismissCard(strategy.id)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-gray-100"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm mb-3">{strategy.description}</CardDescription>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span>{strategy.estimatedCost}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{strategy.timeframe}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {visibleStrategies.length === 0 && dismissedCards.size === 0 && (
        <Card className="shadow-lg">
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground">No specific intervention strategies identified for this area.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
