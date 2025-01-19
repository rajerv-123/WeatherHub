import { Github, Twitter, Mail, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">About WeatherHub</h3>
            <p className="text-sm text-muted-foreground">
              A comprehensive weather application providing real-time weather data, forecasts, and detailed meteorological information.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#current" className="text-sm text-muted-foreground hover:text-primary transition-colors">Current Weather</a>
              </li>
              <li>
                <a href="#forecast" className="text-sm text-muted-foreground hover:text-primary transition-colors">Weather Forecast</a>
              </li>
              <li>
                <a href="#map" className="text-sm text-muted-foreground hover:text-primary transition-colors">Weather Map</a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center">
            © 2024 WeatherHub. Created with <Heart className="h-4 w-4 mx-1 text-red-500" /> by Your Name. Powered by OpenWeather API.
          </p>
        </div>
      </div>
    </footer>
  )
}

