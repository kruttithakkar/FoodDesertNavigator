"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowUpDown, MapPin, Users, DollarSign, AlertTriangle } from "lucide-react"
import { nycFoodDesertData, type NYCFoodDesertData } from "../data/nyc-food-desert-data"

interface NYCDataTableProps {
  onTractSelect?: (tract: NYCFoodDesertData) => void
  selectedTractId?: string
}

type SortField = keyof NYCFoodDesertData
type SortDirection = "asc" | "desc"

export default function NYCDataTable({ onTractSelect, selectedTractId }: NYCDataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [boroughFilter, setBoroughFilter] = useState<string>("all")
  const [desertFilter, setDesertFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("borough")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const boroughs = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"]

  const filteredAndSortedData = useMemo(() => {
    const filtered = nycFoodDesertData.filter((tract) => {
      const matchesSearch =
        tract.borough.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tract.censusTract.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tract.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesBorough = boroughFilter === "all" || tract.borough === boroughFilter

      const matchesDesert =
        desertFilter === "all" ||
        (desertFilter === "desert" && tract.isDesert) ||
        (desertFilter === "not-desert" && !tract.isDesert)

      return matchesSearch && matchesBorough && matchesDesert
    })

    // Sort the filtered data
    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      // Handle different data types
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    return filtered
  }, [searchTerm, boroughFilter, desertFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleRowClick = (tract: NYCFoodDesertData) => {
    onTractSelect?.(tract)
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 opacity-50" />
    return <ArrowUpDown className={`h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
  }

  const totalPopulation = filteredAndSortedData.reduce((sum, tract) => sum + tract.population, 0)
  const desertTracts = filteredAndSortedData.filter((tract) => tract.isDesert)
  const desertPopulation = desertTracts.reduce((sum, tract) => sum + tract.population, 0)

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{filteredAndSortedData.length}</div>
                <div className="text-xs text-muted-foreground">Census Tracts</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{desertTracts.length}</div>
                <div className="text-xs text-muted-foreground">Food Deserts</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{totalPopulation.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Population</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{desertPopulation.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">In Food Deserts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            NYC Food Desert Data
          </CardTitle>
          <CardDescription>
            Searchable and sortable data for {nycFoodDesertData.length} census tracts across NYC's five boroughs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by borough, census tract, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={boroughFilter} onValueChange={setBoroughFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by borough" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Boroughs</SelectItem>
                {boroughs.map((borough) => (
                  <SelectItem key={borough} value={borough}>
                    {borough}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={desertFilter} onValueChange={setDesertFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="desert">Food Deserts Only</SelectItem>
                <SelectItem value="not-desert">Non-Deserts Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Data Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto max-h-96">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow>
                    <TableHead className="w-32">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("borough")}
                        className="h-8 p-0 font-medium"
                      >
                        Borough
                        {getSortIcon("borough")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-32">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("censusTract")}
                        className="h-8 p-0 font-medium"
                      >
                        Census Tract
                        {getSortIcon("censusTract")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-32">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("lowIncomePercent")}
                        className="h-8 p-0 font-medium"
                      >
                        % Low-Income
                        {getSortIcon("lowIncomePercent")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-36">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("lowAccessPercent")}
                        className="h-8 p-0 font-medium"
                      >
                        % Low Access
                        {getSortIcon("lowAccessPercent")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-32">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("population")}
                        className="h-8 p-0 font-medium"
                      >
                        Population
                        {getSortIcon("population")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-36">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("distanceToGrocery")}
                        className="h-8 p-0 font-medium"
                      >
                        Distance (mi)
                        {getSortIcon("distanceToGrocery")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-24">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedData.map((tract) => (
                    <TableRow
                      key={tract.id}
                      className={`cursor-pointer hover:bg-muted/50 ${
                        selectedTractId === tract.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                      }`}
                      onClick={() => handleRowClick(tract)}
                    >
                      <TableCell className="font-medium">{tract.borough}</TableCell>
                      <TableCell>{tract.censusTract}</TableCell>
                      <TableCell>
                        <span className={tract.lowIncomePercent > 40 ? "text-red-600 font-medium" : ""}>
                          {tract.lowIncomePercent.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={tract.lowAccessPercent > 33 ? "text-orange-600 font-medium" : ""}>
                          {tract.lowAccessPercent.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>{tract.population.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={tract.distanceToGrocery > 1 ? "text-red-600 font-medium" : ""}>
                          {tract.distanceToGrocery.toFixed(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={tract.isDesert ? "destructive" : "secondary"} className="text-xs">
                          {tract.isDesert ? "Desert" : "OK"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {filteredAndSortedData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No census tracts match your current filters.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
