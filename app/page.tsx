import Header from '../components/Header'
import WeatherDashboard from '../components/WeatherDashboard'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <WeatherDashboard />
      </main>
      <Footer />
    </div>
  )
}

