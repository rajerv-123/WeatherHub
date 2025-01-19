import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const API_KEY = '1f1c6ef5aa3efa07d568bf37bbbe55d4'

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 })
  }

  if (!API_KEY) {
    console.error('OpenWeatherMap API key is not configured in environment variables')
    return NextResponse.json({
      error: 'Weather API configuration error. Please check server configuration.'
    }, { status: 500 })
  }

  try {
    // Get current weather
    const currentWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    )

    if (!currentWeatherResponse.ok) {
      const errorData = await currentWeatherResponse.json()
      return NextResponse.json({ error: errorData.message }, { status: currentWeatherResponse.status })
    }

    const currentWeatherData = await currentWeatherResponse.json()

    // Get forecast data
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    )

    if (!forecastResponse.ok) {
      const errorData = await forecastResponse.json()
      return NextResponse.json({ error: errorData.message }, { status: forecastResponse.status })
    }

    const forecastData = await forecastResponse.json()

    // Get air quality data
    const { lat, lon } = currentWeatherData.coord
    const airQualityResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )

    if (!airQualityResponse.ok) {
      console.error('Error fetching air quality data')
    }

    const airQualityData = await airQualityResponse.json()

    const weatherData = {
      current: {
        dt: currentWeatherData.dt,
        temperature: Math.round(currentWeatherData.main.temp * 10) / 10,
        condition: currentWeatherData.weather[0].main,
        description: currentWeatherData.weather[0].description,
        wind_speed: Math.round(currentWeatherData.wind.speed * 10) / 10,
        wind_gust: currentWeatherData.wind.gust,
        wind_deg: currentWeatherData.wind.deg,
        pressure: currentWeatherData.main.pressure,
        humidity: currentWeatherData.main.humidity,
        rain_1h: currentWeatherData.rain?.['1h'] || 0,
        rain_3h: currentWeatherData.rain?.['3h'] || 0,
        snow_1h: currentWeatherData.snow?.['1h'] || 0,
        snow_3h: currentWeatherData.snow?.['3h'] || 0,
        dew_point: currentWeatherData.main.temp - ((100 - currentWeatherData.main.humidity) / 5),
        visibility: currentWeatherData.visibility / 1000,
        clouds: currentWeatherData.clouds.all,
        icon: currentWeatherData.weather[0].icon,
      },
      forecast: forecastData.list
        .filter((item: any, index: number) => index % 8 === 0)
        .map((item: any) => ({
          date: new Date(item.dt * 1000).toLocaleDateString(),
          temperature: Math.round(item.main.temp * 10) / 10,
          condition: item.weather[0].main,
          icon: item.weather[0].icon,
        })),
      details: {
        feels_like: Math.round(currentWeatherData.main.feels_like * 10) / 10,
        temp_min: Math.round(currentWeatherData.main.temp_min * 10) / 10,
        temp_max: Math.round(currentWeatherData.main.temp_max * 10) / 10,
        pressure: currentWeatherData.main.pressure,
        sea_level: currentWeatherData.main.sea_level,
        grnd_level: currentWeatherData.main.grnd_level,
        visibility: currentWeatherData.visibility / 1000,
        cloudiness: currentWeatherData.clouds.all,
        sunrise: new Date(currentWeatherData.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(currentWeatherData.sys.sunset * 1000).toLocaleTimeString(),
      },
      airQuality: airQualityData.list?.[0] ? {
        aqi: airQualityData.list[0].main.aqi,
        components: airQualityData.list[0].components,
      } : null,
      lat: currentWeatherData.coord.lat,
      lon: currentWeatherData.coord.lon,
      city: currentWeatherData.name,
      country: currentWeatherData.sys.country,
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error('Server error while fetching weather data:', error)
    return NextResponse.json({
      error: 'Failed to fetch weather data. Please try again later.'
    }, { status: 500 })
  }
}

