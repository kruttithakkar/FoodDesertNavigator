"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Search, MapPin, Filter } from "lucide-react"

// Sample geographic data
const statesData = {
  CA: {
    name: "California",
    counties: {
      alameda: "Alameda County",
      "san-francisco": "San Francisco County",
      "los-angeles": "Los Angeles County",
    },
  },
  TX: {
    name: "Texas",
    counties: {
      harris: "Harris County",
      dallas: "Dallas County",
      travis: "Travis County",
    },
  },
  NY: {
    name: "New York",
    counties: {
      "new-york": "New York County",
      kings: "Kings County",
      queens: "Queens County",
    },
  },
  FL: {
    name: "Florida",
    counties: {
      "miami-dade": "Miami-Dade County",
      broward: "Broward County",
      orange: "Orange County",
    },
  },
}

export interface FilterState {
  state: string
  county: string
  zipCode: string
  lowIncome: boolean
  lowAccess: boolean
  both: boolean
}

interface MapSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onSearch: () => void
}

export default function MapSidebar({ filters, onFiltersChange, onSearch }: MapSidebarProps) {
  const [selectedState, setSelectedState] = useState(filters.state)
  const [selectedCounty, setSelectedCounty] = useState(filters.county)

  const handleStateChange = (state: string) => {
    setSelectedState(state)
    setSelectedCounty("") // Reset county when state changes
    onFiltersChange({
      ...filters,
      state,
      county: "",
    })
  }

  const handleCountyChange = (county: string) => {
    setSelectedCounty(county)
    onFiltersChange({
      ...filters,
      county,
    })
  }

  const handleZipCodeChange = (zipCode: string) => {
    onFiltersChange({
      ...filters,
      zipCode,
    })
  }

  const handleCheckboxChange = (field: keyof FilterState, checked: boolean) => {
    onFiltersChange({
      ...filters,
      [field]: checked,
    })
  }

  const availableCounties = selectedState ? statesData[selectedState as keyof typeof statesData]?.counties || {} : {}

  return (
    <Sidebar className="w-80 border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Map Filters</h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Geographic Filters
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4">
            {/* State Selection */}
            <div className="space-y-2">
              <Label htmlFor="state-select">State</Label>
              <Select value={selectedState} onValueChange={handleStateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {Object.entries(statesData).map(([code, data]) => (
                    <SelectItem key={code} value={code}>
                      {data.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* County Selection */}
            <div className="space-y-2">
              <Label htmlFor="county-select">County</Label>
              <Select value={selectedCounty} onValueChange={handleCountyChange} disabled={!selectedState}>
                <SelectTrigger>
                  <SelectValue placeholder={selectedState ? "Select a county" : "Select state first"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Counties</SelectItem>
                  {Object.entries(availableCounties).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Zip Code Input */}
            <div className="space-y-2">
              <Label htmlFor="zip-code">Zip Code</Label>
              <Input
                id="zip-code"
                type="text"
                placeholder="Enter zip code"
                value={filters.zipCode}
                onChange={(e) => handleZipCodeChange(e.target.value)}
                maxLength={5}
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Demographic Filters</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-3">
            {/* Low Income Areas */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="low-income"
                checked={filters.lowIncome}
                onCheckedChange={(checked) => handleCheckboxChange("lowIncome", checked as boolean)}
              />
              <Label htmlFor="low-income" className="text-sm font-normal">
                Low Income Areas
              </Label>
            </div>

            {/* Low Access to Grocery Stores */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="low-access"
                checked={filters.lowAccess}
                onCheckedChange={(checked) => handleCheckboxChange("lowAccess", checked as boolean)}
              />
              <Label htmlFor="low-access" className="text-sm font-normal">
                Low Access to Grocery Stores
              </Label>
            </div>

            {/* Both Conditions */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="both"
                checked={filters.both}
                onCheckedChange={(checked) => handleCheckboxChange("both", checked as boolean)}
              />
              <Label htmlFor="both" className="text-sm font-normal">
                Both (Food Deserts)
              </Label>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Search Button */}
        <div className="pt-4">
          <Button onClick={onSearch} className="w-full" size="lg">
            <Search className="h-4 w-4 mr-2" />
            Search & Update Map
          </Button>
        </div>

        {/* Active Filters Summary */}
        <SidebarGroup>
          <SidebarGroupLabel>Active Filters</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="text-xs text-muted-foreground space-y-1">
              {selectedState && <div>State: {statesData[selectedState as keyof typeof statesData]?.name}</div>}
              {selectedCounty && <div>County: {availableCounties[selectedCounty]}</div>}
              {filters.zipCode && <div>Zip Code: {filters.zipCode}</div>}
              {(filters.lowIncome || filters.lowAccess || filters.both) && (
                <div className="pt-1">
                  Showing:{" "}
                  {[
                    filters.lowIncome && "Low Income",
                    filters.lowAccess && "Low Access",
                    filters.both && "Food Deserts",
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </div>
              )}
              {!selectedState &&
                !selectedCounty &&
                !filters.zipCode &&
                !filters.lowIncome &&
                !filters.lowAccess &&
                !filters.both && <div>No filters applied</div>}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
