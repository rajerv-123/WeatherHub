import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CloudSun, Thermometer, Wind, Droplets } from 'lucide-react'

interface CurrentWeatherProps {
  data: {
    temperature: number
    condition: string
    description: string
    windSpeed: number
    humidity: number
    icon: string
  }
  location: {
    city: string
    country: string
  }
}

export default function CurrentWeather({ data, location }: CurrentWeatherProps) {
  return (
    <Card className="bg-white/10 backdrop-blur text-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Current Weather</span>
          <span className="text-lg">
            {location.city}, {location.country}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex items-center justify-center space-x-4">
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={data.condition}
            className="w-16 h-16"
          />
          <div className="text-center">
            <div className="text-4xl font-bold">{data.temperature}°C</div>
            <div className="text-lg capitalize">{data.description}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className="h-5 w-5" />
          <span>Wind: {data.windSpeed} m/s</span>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets className="h-5 w-5" />
          <span>Humidity: {data.humidity}%</span>
        </div>
      </CardContent>
    </Card>
  )
}

