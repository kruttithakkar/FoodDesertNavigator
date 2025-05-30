"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InfoIcon, MapIcon, BookOpen, TableIcon } from "lucide-react"
import EducationModal from "./education-modal"
import NYCDataTable from "./nyc-data-table"
import { nycFoodDesertData, type NYCFoodDesertData } from "../data/nyc-food-desert-data"

export default function NYCMapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const leafletRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [selectedTract, setSelectedTract] = useState<NYCFoodDesertData | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [showTable, setShowTable] = useState(true)

  const handleTractSelect = (tract: NYCFoodDesertData) => {
    setSelectedTract(tract)

    // Pan map to selected tract
    if (mapRef.current && leafletRef.current) {
      mapRef.current.setView(tract.coordinates, 14, { animate: true })

      // Highlight the selected marker
      markersRef.current.forEach((marker, index) => {
        const data = nycFoodDesertData[index]
        if (data.id === tract.id) {
          marker.openPopup()
        } else {
          marker.closePopup()
        }
      })
    }
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

      // Center on NYC
      mapRef.current = L.map(mapContainer.current).setView([40.7128, -74.006], 11)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current)

      // Create custom icons for food deserts vs non-deserts
      const desertIcon = L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background-color: #dc2626; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      })

      const nonDesertIcon = L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background-color: #16a34a; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      })

      // Add markers for each census tract
      markersRef.current = nycFoodDesertData.map((tract) => {
        const marker = L.marker(tract.coordinates, {
          icon: tract.isDesert ? desertIcon : nonDesertIcon,
        }).addTo(mapRef.current)

        const popupContent = `
          <div class="p-2 min-w-64">
            <div class="font-semibold text-sm mb-2">${tract.borough} - Tract ${tract.censusTract}</div>
            <div class="space-y-1 text-xs">
              <div class="flex justify-between">
                <span>Status:</span>
                <span class="font-medium ${tract.isDesert ? "text-red-600" : "text-green-600"}">
                  ${tract.isDesert ? "Food Desert" : "Not Food Desert"}
                </span>
              </div>
              <div class="flex justify-between">
                <span>Population:</span>
                <span class="font-medium">${tract.population.toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span>Low Income:</span>
                <span class="font-medium">${tract.lowIncomePercent.toFixed(1)}%</span>
              </div>
              <div class="flex justify-between">
                <span>Low Access:</span>
                <span class="font-medium">${tract.lowAccessPercent.toFixed(1)}%</span>
              </div>
              <div class="flex justify-between">
                <span>Distance to Grocery:</span>
                <span class="font-medium">${tract.distanceToGrocery.toFixed(1)} mi</span>
              </div>
            </div>
          </div>
        `

        marker.bindPopup(popupContent)

        marker.on("click", () => {
          setSelectedTract(tract)
        })

        return marker
      })

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

  return (
    <div className="flex h-screen w-full">
      {/* Data Table Sidebar */}
      {showTable && (
        <div className="w-1/2 border-r bg-background overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <TableIcon className="h-5 w-5" />
                NYC Food Desert Data
              </h2>
              <Button variant="outline" size="sm" onClick={() => setShowTable(false)}>
                Hide Table
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <NYCDataTable onTractSelect={handleTractSelect} selectedTractId={selectedTract?.id} />
          </div>
        </div>
      )}

      {/* Map Section */}
      <div className={`${showTable ? "w-1/2" : "w-full"} relative`}>
        {!showTable && (
          <div className="absolute top-4 left-4 z-[1000]">
            <Button variant="outline" size="sm" onClick={() => setShowTable(true)}>
              <TableIcon className="h-4 w-4 mr-2" />
              Show Data Table
            </Button>
          </div>
        )}

        <div ref={mapContainer} className="absolute inset-0" />

        {/* Map Controls */}
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md z-[1000] max-w-xs">
          <div className="mb-4">
            <h3 className="font-medium mb-2">NYC Food Deserts</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full border border-white shadow"></div>
                <span className="text-sm">
                  Food Desert ({nycFoodDesertData.filter((t) => t.isDesert).length} tracts)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full border border-white shadow"></div>
                <span className="text-sm">
                  Not Food Desert ({nycFoodDesertData.filter((t) => !t.isDesert).length} tracts)
                </span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
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
            Showing {nycFoodDesertData.length} NYC census tracts
          </div>
        </div>

        {/* Selected Tract Info */}
        {selectedTract && (
          <Card className="absolute bottom-4 left-4 w-80 shadow-lg z-[1000] max-h-96 overflow-y-auto">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
                  {selectedTract.borough} - Tract {selectedTract.censusTract}
                </CardTitle>
                <Badge variant={selectedTract.isDesert ? "destructive" : "default"}>
                  {selectedTract.isDesert ? "Food Desert" : "Not a Food Desert"}
                </Badge>
              </div>
              <CardDescription>Census Tract ID: {selectedTract.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border-b pb-2">
                  <h4 className="font-medium text-sm mb-1">USDA Classification</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${selectedTract.lowIncomePercent > 40 ? "bg-red-500" : "bg-green-500"}`}
                      ></div>
                      <span className="text-sm">
                        Low Income: <strong>{selectedTract.lowIncomePercent.toFixed(1)}%</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${selectedTract.lowAccessPercent > 33 ? "bg-red-500" : "bg-green-500"}`}
                      ></div>
                      <span className="text-sm">
                        Low Access: <strong>{selectedTract.lowAccessPercent.toFixed(1)}%</strong>
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
                  <h4 className="font-medium text-sm mb-1">Demographics</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Population: <strong>{selectedTract.population.toLocaleString()}</strong>
                      </span>
                    </div>
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
                        Vehicle access: <strong>{selectedTract.vehicleAccess}%</strong>
                      </span>
                    </div>
                  </div>
                </div>
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
    </div>
  )
}
