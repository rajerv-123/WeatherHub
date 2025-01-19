import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function WeatherMap({ lat, lon }) {
  const validLat = typeof lat === 'number' ? lat : 0
  const validLon = typeof lon === 'number' ? lon : 0

  return (
    <Card className="bg-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Weather Map</CardTitle>
      </CardHeader>
      <CardContent>
        <iframe
          width="100%"
          height="400"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${validLon-0.1},${validLat-0.1},${validLon+0.1},${validLat+0.1}&layer=mapnik`}
        ></iframe>
      </CardContent>
    </Card>
  )
}

