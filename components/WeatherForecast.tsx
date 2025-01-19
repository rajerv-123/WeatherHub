import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function WeatherForecast({ data }) {
  const validData = Array.isArray(data) ? data.filter(item => typeof item.temperature === 'number') : []

  return (
    <Card className="bg-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        {validData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={validData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff22', border: 'none' }} />
              <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-4">No forecast data available</div>
        )}
      </CardContent>
    </Card>
  )
}

