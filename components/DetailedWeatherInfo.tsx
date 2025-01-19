import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Thermometer, Wind, Droplets, Gauge, Sun, CloudRain, Snowflake, Eye, Cloud } from 'lucide-react'

interface DetailedWeatherInfoProps {
  data: {
    dt: number;
    temperature: number;
    wind_speed: number;
    wind_gust?: number;
    wind_deg: number;
    pressure: number;
    humidity: number;
    rain_1h: number;
    rain_3h: number;
    snow_1h: number;
    snow_3h: number;
    dew_point: number;
    visibility: number;
    clouds: number;
  }
}

export default function DetailedWeatherInfo({ data }: DetailedWeatherInfoProps) {
  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    return directions[Math.round(deg / 45) % 8]
  }

  return (
    <Card className="bg-white/10 backdrop-blur text-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Detailed Weather Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Thermometer className="h-5 w-5" />
          <span>Temperature: {data.temperature}°C</span>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className="h-5 w-5" />
          <span>Wind: {data.wind_speed} m/s {getWindDirection(data.wind_deg)}</span>
        </div>
        {data.wind_gust && (
          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5" />
            <span>Wind Gust: {data.wind_gust} m/s</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Gauge className="h-5 w-5" />
          <span>Pressure: {data.pressure} hPa</span>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets className="h-5 w-5" />
          <span>Humidity: {data.humidity}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <Sun className="h-5 w-5" />
          <span>Dew Point: {data.dew_point.toFixed(1)}°C</span>
        </div>
        <div className="flex items-center space-x-2">
          <CloudRain className="h-5 w-5" />
          <span>Rain (1h): {data.rain_1h} mm</span>
        </div>
        <div className="flex items-center space-x-2">
          <CloudRain className="h-5 w-5" />
          <span>Rain (3h): {data.rain_3h} mm</span>
        </div>
        <div className="flex items-center space-x-2">
          <Snowflake className="h-5 w-5" />
          <span>Snow (1h): {data.snow_1h} mm</span>
        </div>
        <div className="flex items-center space-x-2">
          <Snowflake className="h-5 w-5" />
          <span>Snow (3h): {data.snow_3h} mm</span>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5" />
          <span>Visibility: {data.visibility} km</span>
        </div>
        <div className="flex items-center space-x-2">
          <Cloud className="h-5 w-5" />
          <span>Cloudiness: {data.clouds}%</span>
        </div>
        <div className="col-span-2">
          <span className="text-sm text-gray-300">
            Last updated: {new Date(data.dt * 1000).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

