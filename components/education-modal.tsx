"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  MapPin,
  Heart,
  DollarSign,
  Users,
  Baby,
  Truck,
  Bus,
  Store,
  Sprout,
  Building,
  Utensils,
  TrendingUp,
  Target,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react"

interface EducationModalProps {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function EducationModal({ trigger, open, onOpenChange }: EducationModalProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = open !== undefined && onOpenChange !== undefined
  const modalOpen = isControlled ? open : internalOpen
  const setModalOpen = isControlled ? onOpenChange : setInternalOpen

  const defaultTrigger = (
    <Button variant="outline" className="gap-2">
      <BookOpen className="h-4 w-4" />
      Learn About Food Deserts
    </Button>
  )

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Understanding Food Deserts
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* What Are Food Deserts */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold">What Are Food Deserts?</h2>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Food deserts are areas where residents have limited access to affordable, nutritious, and culturally
                  appropriate food. The USDA defines food deserts as census tracts that meet both criteria:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-900">Low Income</h4>
                      <p className="text-sm text-red-700">
                        Poverty rate ≥20% or median family income ≤80% of state/metro median
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-900">Low Access</h4>
                      <p className="text-sm text-orange-700">
                        &ge;33% of population lives &gt;1 mile from supermarket (&gt;10 miles in rural areas)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Why Food Deserts Matter */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Why Food Deserts Matter</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Health Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                      Higher rates of obesity and diabetes
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                      Increased cardiovascular disease
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                      Poor nutrition and food insecurity
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                      Lower life expectancy
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    Economic Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                      Higher healthcare costs
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                      Reduced property values
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                      Limited local economic development
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                      Increased transportation costs
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    Social Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                      Perpetuates health disparities
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                      Affects educational outcomes
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                      Reduces community cohesion
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                      Limits social mobility
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Who Is Affected */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold">Who Is Most Affected?</h2>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Baby className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-medium text-blue-900">Children</h4>
                    <p className="text-sm text-blue-700">Especially vulnerable to poor nutrition impacts</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-medium text-green-900">Elderly</h4>
                    <p className="text-sm text-green-700">Limited mobility and transportation options</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <DollarSign className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <h4 className="font-medium text-yellow-900">Low-Income</h4>
                    <p className="text-sm text-yellow-700">Cannot afford transportation to distant stores</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <Users className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <h4 className="font-medium text-red-900">Minorities</h4>
                    <p className="text-sm text-red-700">Disproportionately affected by food deserts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Intervention Strategies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Intervention Strategies</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-base">Mobile Markets</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Bring fresh produce directly to underserved communities through mobile farmers markets and food
                    trucks.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    78% Success Rate
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                    <Bus className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-base">Transit Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Improve public transportation routes to grocery stores and provide subsidized transit options.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    65% Success Rate
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                    <Store className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-base">Grocery Incentives</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Provide tax incentives and grants to attract full-service grocery stores to underserved areas.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    71% Success Rate
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-2">
                    <Sprout className="h-6 w-6 text-yellow-600" />
                  </div>
                  <CardTitle className="text-base">Community Gardens</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Establish neighborhood gardens where residents can grow their own fresh produce and build community.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    82% Success Rate
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                    <Building className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-base">Corner Store Conversion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Convert existing corner stores to offer fresh produce and healthy food options with SNAP acceptance.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    69% Success Rate
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-2">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-base">Food Assistance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Expand SNAP benefits, WIC programs, and food pantry services with fresh produce options.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    85% Success Rate
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-2">
                    <Utensils className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-base">Nutrition Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Provide community workshops on healthy eating, cooking classes, and nutrition education for
                    families.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    74% Success Rate
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-base">Delivery Co-ops</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Resident-led cooperatives for bulk grocery purchasing and delivery to reduce transportation needs.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    67% Success Rate
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How Interventions Work */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold">How Interventions Create Change</h2>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Targeted Approach</h4>
                    <p className="text-sm text-gray-600">
                      Interventions are tailored to specific community needs, demographics, and existing infrastructure
                      for maximum effectiveness.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Measurable Impact</h4>
                    <p className="text-sm text-gray-600">
                      Success is tracked through improved food access metrics, health outcomes, and community economic
                      indicators.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Community-Led</h4>
                    <p className="text-sm text-gray-600">
                      Most successful interventions involve local residents in planning, implementation, and ongoing
                      management.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Key Statistics */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <Info className="h-5 w-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold">Key Statistics</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">23.5M</div>
                  <div className="text-sm text-gray-600">Americans live in food deserts</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">13.5K</div>
                  <div className="text-sm text-gray-600">Census tracts classified as food deserts</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">2.3M</div>
                  <div className="text-sm text-gray-600">Children affected by food deserts</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-orange-600 mb-2">$1.5B</div>
                  <div className="text-sm text-gray-600">Annual healthcare costs from poor food access</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Ready to Explore Food Desert Data?</h3>
              <p className="text-gray-600 mb-4">
                Use our interactive map to discover food desert areas in your community and learn about effective
                intervention strategies.
              </p>
              <Button onClick={() => setModalOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                Start Exploring
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
