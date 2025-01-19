'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import CurrentWeather from './CurrentWeather'
import WeatherForecast from './WeatherForecast'
import WeatherDetails from './WeatherDetails'
import WeatherMap from './WeatherMap'
import AirQuality from './AirQuality'
import DetailedWeatherInfo from './DetailedWeatherInfo'

export default function WeatherDashboard() {
  const [city, setCity] = useState('San Francisco')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchWeatherData()
  }, [])

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      setError('Please enter a city name')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city.trim())}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather data')
      }

      setWeatherData(data)
      setError(null)
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setError(error.message || 'Failed to fetch weather data. Please try again.')
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchWeatherData()
  }

  return (
    <div className="space-y-4">
      <Card className="bg-white/10 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Weather Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-grow bg-white/20 text-white placeholder:text-white/70"
            />
            <Button type="submit" disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error ? (
        <Card className="bg-red-500/10 backdrop-blur">
          <CardContent className="p-4">
            <p className="text-center text-red-500 font-medium">{error}</p>
          </CardContent>
        </Card>
      ) : loading ? (
        <Card className="bg-white/10 backdrop-blur">
          <CardContent className="p-4">
            <p className="text-center text-white">Loading weather information...</p>
          </CardContent>
        </Card>
      ) : weatherData ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div id="current">
              <CurrentWeather 
                data={weatherData.current} 
                location={{ city: weatherData.city, country: weatherData.country }} 
              />
            </div>
            {weatherData.airQuality && (
              <div id="air-quality">
                <AirQuality data={weatherData.airQuality} />
              </div>
            )}
          </div>
          <div id="forecast">
            <WeatherForecast data={weatherData.forecast} />
          </div>
          <div id="details">
            <WeatherDetails data={weatherData.details} />
          </div>
          <div id="map">
            <WeatherMap lat={weatherData.lat} lon={weatherData.lon} />
          </div>
          <div id="detailed-info" className="md:col-span-2">
            <DetailedWeatherInfo data={weatherData.current} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

