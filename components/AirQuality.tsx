import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wind } from 'lucide-react'

interface AirQualityProps {
  data: {
    aqi: number
    components: {
      co: number
      no2: number
      o3: number
      pm2_5: number
      pm10: number
    }
  }
}

export default function AirQuality({ data }: AirQualityProps) {
  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { level: 'Good', color: 'text-green-500' }
    if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-500' }
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'text-orange-500' }
    if (aqi <= 200) return { level: 'Unhealthy', color: 'text-red-500' }
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'text-purple-500' }
    return { level: 'Hazardous', color: 'text-rose-500' }
  }

  const aqiInfo = getAQILevel(data.aqi)

  return (
    <Card className="bg-white/10 backdrop-blur text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5" />
          Air Quality Index
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="text-center">
            <div className={`text-4xl font-bold ${aqiInfo.color}`}>{data.aqi}</div>
            <div className={`text-lg ${aqiInfo.color}`}>{aqiInfo.level}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">PM2.5</div>
              <div className="text-lg">{data.components.pm2_5} µg/m³</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">PM10</div>
              <div className="text-lg">{data.components.pm10} µg/m³</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">NO₂</div>
              <div className="text-lg">{data.components.no2} µg/m³</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">O₃</div>
              <div className="text-lg">{data.components.o3} µg/m³</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

