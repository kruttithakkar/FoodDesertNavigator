"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Map, BarChart3, Home, BookOpen, Building } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Map className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">Food Desert Navigator</span>
          </Link>
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <Button variant={pathname === "/" ? "default" : "ghost"} asChild size="sm">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button variant={pathname === "/map" ? "default" : "ghost"} asChild size="sm">
            <Link href="/map">
              <Map className="mr-2 h-4 w-4" />
              Interactive Map
            </Link>
          </Button>
          <Button variant={pathname === "/nyc" ? "default" : "ghost"} asChild size="sm">
            <Link href="/nyc">
              <Building className="mr-2 h-4 w-4" />
              NYC Data
            </Link>
          </Button>
          <Button variant={pathname === "/dashboard" ? "default" : "ghost"} asChild size="sm">
            <Link href="/dashboard">
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant={pathname === "/learn" ? "default" : "ghost"} asChild size="sm">
            <Link href="/learn">
              <BookOpen className="mr-2 h-4 w-4" />
              Learn
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
