"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Map, BarChart3, Target, Users, MapPin, TrendingDown, BookOpen } from "lucide-react"
import EducationModal from "./education-modal"

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              Mapping Food Access Across America
            </Badge>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
              Food Desert
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                Navigator
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore interactive maps of food desert areas across the United States. Discover data-driven insights,
              track intervention strategies, and help build healthier communities with better food access.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
                <Link href="/map">
                  <Map className="mr-2 h-5 w-5" />
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/dashboard">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Dashboard
                </Link>
              </Button>
            </div>

            {/* Educational Link */}
            <div className="mb-8">
              <EducationModal
                trigger={
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700 gap-2">
                    <BookOpen className="h-4 w-4" />
                    Learn About Food Deserts
                  </Button>
                }
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">13.5K+</div>
                <div className="text-sm text-gray-600">Food Desert Tracts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">23.5%</div>
                <div className="text-sm text-gray-600">Population Affected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">1.7K+</div>
                <div className="text-sm text-gray-600">Active Interventions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Comprehensive Food Access Analysis</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines census data, USDA classifications, and intervention tracking to provide actionable
              insights for policymakers and community leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Interactive Mapping */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Map className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Interactive Mapping</h3>
                <p className="text-gray-600 leading-relaxed">
                  Explore detailed census tract data with zoom, filter, and click functionality. Visualize food desert
                  areas and demographic patterns across the United States.
                </p>
              </CardContent>
            </Card>

            {/* Data Analytics */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Analytics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track trends over time, analyze intervention effectiveness, and access comprehensive dashboards with
                  key metrics and performance indicators.
                </p>
              </CardContent>
            </Card>

            {/* Intervention Strategies */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Interventions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get tailored intervention recommendations based on local demographics, infrastructure, and community
                  characteristics for maximum impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Making a Real Impact</h2>
            <p className="text-xl mb-12 opacity-90">
              Our data-driven approach helps communities identify the most effective strategies for improving food
              access and building healthier neighborhoods.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-8 text-center">
                  <TrendingDown className="w-12 h-12 mx-auto mb-4 text-green-300" />
                  <div className="text-3xl font-bold mb-2">-2.3%</div>
                  <div className="text-lg opacity-90">Reduction in Food Desert Areas</div>
                  <div className="text-sm opacity-75 mt-2">Year-over-year improvement</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                  <div className="text-3xl font-bold mb-2">12.7M</div>
                  <div className="text-lg opacity-90">People in Tracked Areas</div>
                  <div className="text-sm opacity-75 mt-2">Comprehensive coverage</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Ready to Explore Food Access Data?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start mapping food desert areas in your community and discover evidence-based solutions for improving food
            access.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
            <Link href="/map">
              <Map className="mr-2 h-5 w-5" />
              Start Exploring Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
