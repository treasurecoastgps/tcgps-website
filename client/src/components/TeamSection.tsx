import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Linkedin, Mail } from 'lucide-react';
import { sanityClient, urlForImage } from '@/lib/sanity';

interface SanityTeamMember {
  _id: string;
  name: string;
  title: string;
  bio: string;
  email?: string;
  linkedinUrl?: string;
  headshot?: { asset?: { _ref: string } };
}

const TEAM_QUERY = `*[
  _type == "teamMember"
  && active == true
] | order(order asc) {
  _id, name, title, bio, email, linkedinUrl, headshot
}`;

export default function TeamSection() {
  const { data: teamMembers, isLoading, error } = useQuery<SanityTeamMember[]>({
    queryKey: ['sanity', 'teamMembers'],
    queryFn: () => sanityClient.fetch(TEAM_QUERY),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center animate-pulse">
            <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded mb-1" />
            <div className="h-3 bg-gray-200 rounded mb-3" />
            <div className="h-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600">Failed to load the team. Please try again later.</p>;
  }

  if (!teamMembers || teamMembers.length === 0) {
    return <p className="text-center text-gray-500">Team profiles are being updated — check back soon.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {teamMembers.map((member) => {
        const headshotUrl = member.headshot
          ? urlForImage(member.headshot).width(600).height(600).fit('crop').url()
          : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=600';

        return (
          <div key={member._id} className="text-center">
            <img
              src={headshotUrl}
              alt={`Professional headshot of ${member.name}`}
              className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              loading="lazy"
              decoding="async"
            />
            <h3 className="text-xl font-bold text-navy mb-1">{member.name}</h3>
            <p className="text-sky-blue font-semibold mb-3">{member.title}</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
            <div className="flex justify-center space-x-3">
              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  className="text-medium-blue hover:text-sky-blue transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="text-medium-blue hover:text-sky-blue transition-colors"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
