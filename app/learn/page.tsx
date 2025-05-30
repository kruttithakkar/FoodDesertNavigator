import EducationModal from "@/components/education-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Learn About Food Deserts</h1>
              <p className="text-gray-600">Understanding the challenge and solutions</p>
            </div>
          </div>
        </div>

        {/* Education Content */}
        <Card>
          <CardHeader>
            <CardTitle>Educational Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Explore comprehensive information about food deserts, their impacts on communities, and evidence-based
              intervention strategies that are making a difference.
            </p>
            <EducationModal
              trigger={
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  <BookOpen className="h-5 w-5" />
                  Open Interactive Guide
                </Button>
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
