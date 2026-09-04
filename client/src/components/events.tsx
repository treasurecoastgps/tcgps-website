import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, MapPin, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { sanityClient } from "@/lib/sanity";

interface SanityEvent {
  _id: string;
  title: string;
  eventType: string;
  startsAt: string;
  location: string;
  description: string;
  status: string;
  rsvpUrl?: string;
}

const UPCOMING_EVENTS_QUERY = `*[
  _type == "event"
  && startsAt >= now()
] | order(startsAt asc) [0...3] {
  _id, title, eventType, startsAt, location, description, status, rsvpUrl
}`;

export default function Events() {
  const { data: events, isLoading, error } = useQuery<SanityEvent[]>({
    queryKey: ['sanity', 'upcomingEvents'],
    queryFn: () => sanityClient.fetch(UPCOMING_EVENTS_QUERY),
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-accent/10 text-green-accent';
      case 'Limited':
        return 'bg-orange-500/10 text-orange-600';
      case 'Closed':
        return 'bg-red-500/10 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'Investor Meeting':
        return 'bg-sky-blue/10 text-sky-blue';
      case 'Educational':
        return 'bg-green-accent/10 text-green-accent';
      case 'Networking':
        return 'bg-medium-blue/10 text-medium-blue';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getButtonText = (status: string) => {
    switch (status) {
      case 'Open':
        return 'RSVP Now';
      case 'Limited':
        return 'Join Waitlist';
      case 'Closed':
        return 'Event Full';
      default:
        return 'Learn More';
    }
  };

  if (isLoading) {
    return (
      <section id="events" className="py-20 bg-light-blue">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">Upcoming Events</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Join us for exclusive investor meetings, educational seminars, and networking opportunities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse p-6">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="h-16 bg-gray-200 rounded mb-6"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="events" className="py-20 bg-light-blue">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">Upcoming Events</h2>
            <p className="text-xl text-red-600">Failed to load events. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section id="events" className="py-20 bg-light-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">Upcoming Events</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Join us for exclusive investor meetings, educational seminars, and networking opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {events.map((event) => {
            const startsAt = new Date(event.startsAt);
            return (
              <Card key={event._id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getTypeColor(event.eventType)}>
                      {event.eventType}
                    </Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-medium-blue" />
                      <span>{startsAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-medium-blue" />
                      <span>{startsAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-medium-blue" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6">{event.description}</p>
                  {event.rsvpUrl ? (
                    <a href={event.rsvpUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        className="w-full bg-sky-blue hover:bg-medium-blue text-white"
                        disabled={event.status === 'Closed'}
                      >
                        {getButtonText(event.status)}
                      </Button>
                    </a>
                  ) : (
                    <Button
                      className="w-full bg-sky-blue hover:bg-medium-blue text-white"
                      disabled
                    >
                      {getButtonText(event.status)}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
