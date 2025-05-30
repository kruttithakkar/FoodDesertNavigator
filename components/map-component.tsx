"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, MapIcon, BookOpen } from "lucide-react"
import MapSidebar, { type FilterState } from "./map-sidebar"
import InterventionCards from "./intervention-cards"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import EducationModal from "./education-modal"
import { Button } from "@/components/ui/button"

// Expanded sample data with multiple states and counties
const sampleData = {
  type: "FeatureCollection",
  features: [
    // California - Alameda County
    {
      type: "Feature",
      properties: {
        id: "06001400100",
        state: "CA",
        county: "alameda",
        zipCode: "94601",
        isDesert: true,
        isLowIncome: true,
        isLowAccess: true,
        distanceToGrocery: 2.3,
        medianIncome: 32500,
        populationDensity: 4200,
        povertyRate: 28.5,
        unemploymentRate: 12.3,
        educationBachelor: 15.2,
        vehicleAccess: 65.8,
        county_name: "Alameda County",
        state_name: "California",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-122.2, 37.8],
            [-122.1, 37.8],
            [-122.1, 37.9],
            [-122.2, 37.9],
            [-122.2, 37.8],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "06001400200",
        state: "CA",
        county: "alameda",
        zipCode: "94602",
        isDesert: false,
        isLowIncome: false,
        isLowAccess: false,
        distanceToGrocery: 0.5,
        medianIncome: 78000,
        populationDensity: 6800,
        povertyRate: 8.2,
        unemploymentRate: 4.1,
        educationBachelor: 45.7,
        vehicleAccess: 92.3,
        county_name: "Alameda County",
        state_name: "California",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-122.1, 37.8],
            [-122.0, 37.8],
            [-122.0, 37.9],
            [-122.1, 37.9],
            [-122.1, 37.8],
          ],
        ],
      },
    },
    // California - San Francisco County
    {
      type: "Feature",
      properties: {
        id: "06075010100",
        state: "CA",
        county: "san-francisco",
        zipCode: "94102",
        isDesert: false,
        isLowIncome: true,
        isLowAccess: false,
        distanceToGrocery: 0.3,
        medianIncome: 45000,
        populationDensity: 8900,
        povertyRate: 18.7,
        unemploymentRate: 7.2,
        educationBachelor: 52.1,
        vehicleAccess: 45.2,
        county_name: "San Francisco County",
        state_name: "California",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-122.45, 37.75],
            [-122.4, 37.75],
            [-122.4, 37.8],
            [-122.45, 37.8],
            [-122.45, 37.75],
          ],
        ],
      },
    },
    // Texas - Harris County
    {
      type: "Feature",
      properties: {
        id: "48201010100",
        state: "TX",
        county: "harris",
        zipCode: "77001",
        isDesert: true,
        isLowIncome: true,
        isLowAccess: true,
        distanceToGrocery: 3.2,
        medianIncome: 28900,
        populationDensity: 3100,
        povertyRate: 32.1,
        unemploymentRate: 15.7,
        educationBachelor: 12.8,
        vehicleAccess: 58.4,
        county_name: "Harris County",
        state_name: "Texas",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-95.4, 29.7],
            [-95.35, 29.7],
            [-95.35, 29.75],
            [-95.4, 29.75],
            [-95.4, 29.7],
          ],
        ],
      },
    },
    // New York - New York County
    {
      type: "Feature",
      properties: {
        id: "36061010100",
        state: "NY",
        county: "new-york",
        zipCode: "10001",
        isDesert: false,
        isLowIncome: false,
        isLowAccess: true,
        distanceToGrocery: 1.8,
        medianIncome: 85000,
        populationDensity: 12000,
        povertyRate: 12.4,
        unemploymentRate: 6.2,
        educationBachelor: 68.9,
        vehicleAccess: 25.7,
        county_name: "New York County",
        state_name: "New York",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-74.0, 40.75],
            [-73.95, 40.75],
            [-73.95, 40.8],
            [-74.0, 40.8],
            [-74.0, 40.75],
          ],
        ],
      },
    },
  ],
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

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const leafletRef = useRef<any>(null)
  const geoJsonLayerRef = useRef<any>(null)
  const [selectedTract, setSelectedTract] = useState<TractInfo | null>(null)
  const [showInterventions, setShowInterventions] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedLayer, setSelectedLayer] = useState<string>("foodDesert")
  const [filters, setFilters] = useState<FilterState>({
    state: "",
    county: "",
    zipCode: "",
    lowIncome: false,
    lowAccess: false,
    both: false,
  })
  const [filteredData, setFilteredData] = useState(sampleData)

  const layerConfigs = {
    foodDesert: {
      name: "Food Desert Areas",
      property: "isDesert",
      type: "boolean",
      colors: { true: "#ff4d4f", false: "#91caff" },
      legend: [
        { color: "#ff4d4f", label: "Food Desert" },
        { color: "#91caff", label: "Not Food Desert" },
      ],
    },
    poverty: {
      name: "Poverty Rate",
      property: "povertyRate",
      type: "numeric",
      colors: ["#f0f9ff", "#0ea5e9", "#1e40af", "#1e3a8a"],
      thresholds: [10, 20, 30],
      legend: [
        { color: "#f0f9ff", label: "< 10%" },
        { color: "#0ea5e9", label: "10-20%" },
        { color: "#1e40af", label: "20-30%" },
        { color: "#1e3a8a", label: "> 30%" },
      ],
    },
    unemployment: {
      name: "Unemployment Rate",
      property: "unemploymentRate",
      type: "numeric",
      colors: ["#fef3c7", "#f59e0b", "#d97706", "#92400e"],
      thresholds: [5, 10, 15],
      legend: [
        { color: "#fef3c7", label: "< 5%" },
        { color: "#f59e0b", label: "5-10%" },
        { color: "#d97706", label: "10-15%" },
        { color: "#92400e", label: "> 15%" },
      ],
    },
    education: {
      name: "Bachelor's Degree Rate",
      property: "educationBachelor",
      type: "numeric",
      colors: ["#fce7f3", "#ec4899", "#be185d", "#831843"],
      thresholds: [20, 35, 50],
      legend: [
        { color: "#fce7f3", label: "< 20%" },
        { color: "#ec4899", label: "20-35%" },
        { color: "#be185d", label: "35-50%" },
        { color: "#831843", label: "> 50%" },
      ],
    },
    vehicleAccess: {
      name: "Vehicle Access Rate",
      property: "vehicleAccess",
      type: "numeric",
      colors: ["#dcfce7", "#22c55e", "#16a34a", "#15803d"],
      thresholds: [70, 80, 90],
      legend: [
        { color: "#dcfce7", label: "< 70%" },
        { color: "#22c55e", label: "70-80%" },
        { color: "#16a34a", label: "80-90%" },
        { color: "#15803d", label: "> 90%" },
      ],
    },
  }

  const getFeatureColor = (feature: any, layerConfig: any) => {
    const value = feature.properties[layerConfig.property]

    if (layerConfig.type === "boolean") {
      return layerConfig.colors[value.toString()]
    }

    if (layerConfig.type === "numeric") {
      const thresholds = layerConfig.thresholds
      const colors = layerConfig.colors

      if (value < thresholds[0]) return colors[0]
      if (value < thresholds[1]) return colors[1]
      if (value < thresholds[2]) return colors[2]
      return colors[3]
    }

    return "#cccccc"
  }

  const applyFilters = () => {
    const filtered = { ...sampleData }

    filtered.features = sampleData.features.filter((feature) => {
      const props = feature.properties

      // Geographic filters
      if (filters.state && props.state !== filters.state) return false
      if (filters.county && props.county !== filters.county) return false
      if (filters.zipCode && !props.zipCode.includes(filters.zipCode)) return false

      // Demographic filters
      if (filters.lowIncome && !props.isLowIncome) return false
      if (filters.lowAccess && !props.isLowAccess) return false
      if (filters.both && (!props.isLowIncome || !props.isLowAccess)) return false

      return true
    })

    setFilteredData(filtered)
  }

  const handleSearch = async () => {
    applyFilters()

    // Update map bounds to show filtered data
    if (mapRef.current && leafletRef.current && filteredData.features.length > 0) {
      const L = leafletRef.current
      const group = L.featureGroup()

      filteredData.features.forEach((feature) => {
        const layer = L.geoJSON(feature)
        group.addLayer(layer)
      })

      if (group.getLayers().length > 0) {
        mapRef.current.fitBounds(group.getBounds(), { padding: [20, 20] })
      }
    }
  }

  const handleTractClick = (tractInfo: TractInfo) => {
    setSelectedTract(tractInfo)
    // Show interventions automatically if it's a food desert
    if (tractInfo.isDesert) {
      setShowInterventions(true)
    }
  }

  const handleCloseInterventions = () => {
    setShowInterventions(false)
  }

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const initMap = async () => {
      const L = (await import("leaflet")).default
      leafletRef.current = L

      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)

      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      })

      mapRef.current = L.map(mapContainer.current).setView([39.8283, -98.5795], 4) // Center of US

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current)

      updateMapLayer()
      setMapLoaded(true)
    }

    initMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  const updateMapLayer = () => {
    if (!mapRef.current || !leafletRef.current) return

    const L = leafletRef.current

    // Remove existing layer
    if (geoJsonLayerRef.current) {
      mapRef.current.removeLayer(geoJsonLayerRef.current)
    }

    const currentLayerConfig = layerConfigs[selectedLayer as keyof typeof layerConfigs]

    geoJsonLayerRef.current = L.geoJSON(filteredData, {
      style: (feature: any) => {
        return {
          fillColor: getFeatureColor(feature, currentLayerConfig),
          weight: 2,
          opacity: 1,
          color: "black",
          fillOpacity: 0.7,
        }
      },
      onEachFeature: (feature: any, layer: any) => {
        layer.on({
          mouseover: (e: any) => {
            const layer = e.target
            layer.setStyle({
              weight: 3,
              fillOpacity: 0.9,
            })
          },
          mouseout: (e: any) => {
            geoJsonLayerRef.current.resetStyle(e.target)
          },
          click: (e: any) => {
            const properties = feature.properties
            const tractInfo = {
              id: properties.id,
              state: properties.state,
              county: properties.county,
              zipCode: properties.zipCode,
              isDesert: properties.isDesert,
              isLowIncome: properties.isLowIncome,
              isLowAccess: properties.isLowAccess,
              distanceToGrocery: properties.distanceToGrocery,
              medianIncome: properties.medianIncome,
              populationDensity: properties.populationDensity,
              povertyRate: properties.povertyRate,
              unemploymentRate: properties.unemploymentRate,
              educationBachelor: properties.educationBachelor,
              vehicleAccess: properties.vehicleAccess,
              county_name: properties.county_name,
              state_name: properties.state_name,
            }
            handleTractClick(tractInfo)
          },
        })
      },
    }).addTo(mapRef.current)
  }

  useEffect(() => {
    if (mapLoaded) {
      updateMapLayer()
    }
  }, [selectedLayer, filteredData, mapLoaded])

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <MapSidebar filters={filters} onFiltersChange={setFilters} onSearch={handleSearch} />

        <SidebarInset className="flex-1">
          <div className="relative w-full h-full">
            <div className="absolute top-4 left-4 z-[1000]">
              <SidebarTrigger />
            </div>

            <div ref={mapContainer} className="absolute inset-0" />

            {/* Intervention Cards */}
            {showInterventions && (
              <InterventionCards selectedTract={selectedTract} onClose={handleCloseInterventions} />
            )}

            {/* Layer Selector and Legend */}
            <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md z-[1000] max-w-xs">
              <div className="mb-4">
                <label htmlFor="layer-select" className="block text-sm font-medium mb-2">
                  Select Data Layer:
                </label>
                <select
                  id="layer-select"
                  value={selectedLayer}
                  onChange={(e) => setSelectedLayer(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  {Object.entries(layerConfigs).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-medium mb-2">Legend</h3>
                {layerConfigs[selectedLayer as keyof typeof layerConfigs].legend.map((item, index) => (
                  <div key={index} className="flex items-center mb-1">
                    <div className="w-4 h-4 mr-2 border border-gray-400" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <EducationModal
                  trigger={
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <BookOpen className="h-4 w-4" />
                      Learn About Food Deserts
                    </Button>
                  }
                />
              </div>

              <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                Showing {filteredData.features.length} of {sampleData.features.length} census tracts
              </div>
            </div>

            {selectedTract && !showInterventions && (
              <Card className="absolute bottom-4 left-4 w-80 shadow-lg z-[1000] max-h-96 overflow-y-auto">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Census Tract {selectedTract.id}</CardTitle>
                    <Badge variant={selectedTract.isDesert ? "destructive" : "default"}>
                      {selectedTract.isDesert ? "Food Desert" : "Not a Food Desert"}
                    </Badge>
                  </div>
                  <CardDescription>
                    {selectedTract.county_name}, {selectedTract.state_name} • Zip: {selectedTract.zipCode}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-b pb-2">
                      <h4 className="font-medium text-sm mb-1">Classification</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${selectedTract.isLowIncome ? "bg-red-500" : "bg-green-500"}`}
                          ></div>
                          <span className="text-sm">
                            {selectedTract.isLowIncome ? "Low Income Area" : "Not Low Income"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${selectedTract.isLowAccess ? "bg-red-500" : "bg-green-500"}`}
                          ></div>
                          <span className="text-sm">
                            {selectedTract.isLowAccess ? "Low Access to Grocery" : "Good Grocery Access"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-b pb-2">
                      <h4 className="font-medium text-sm mb-1">Food Access</h4>
                      <div className="flex items-center gap-2">
                        <MapIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Distance to grocery: <strong>{selectedTract.distanceToGrocery} miles</strong>
                        </span>
                      </div>
                    </div>

                    <div className="border-b pb-2">
                      <h4 className="font-medium text-sm mb-1">Economic Indicators</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Median income: <strong>${selectedTract.medianIncome.toLocaleString()}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Poverty rate: <strong>{selectedTract.povertyRate}%</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Unemployment: <strong>{selectedTract.unemploymentRate}%</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-1">Demographics</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Population density: <strong>{selectedTract.populationDensity}/sq mi</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Bachelor's degree: <strong>{selectedTract.educationBachelor}%</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Vehicle access: <strong>{selectedTract.vehicleAccess}%</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {selectedTract.isDesert && (
                      <div className="pt-2 border-t">
                        <button
                          onClick={() => setShowInterventions(true)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium"
                        >
                          View Intervention Strategies
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-[1000]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
