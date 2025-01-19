import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function WeatherDetails({ data }) {
  return (
    <Card className="bg-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Weather Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {Object.entries(data || {}).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="capitalize">{key.replace('_', ' ')}:</span>
            <span>{value !== undefined && value !== null ? value : 'N/A'}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

