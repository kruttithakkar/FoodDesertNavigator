import NYCMapComponent from "@/components/nyc-map-component"

export default function NYCPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1">
        <NYCMapComponent />
      </div>
    </main>
  )
}
