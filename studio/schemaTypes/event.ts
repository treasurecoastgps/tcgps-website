import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: ['Investor Meeting', 'Educational', 'Networking'],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startsAt',
      title: 'Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Stuart Conference Center" or "Virtual & In-Person"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'RSVP Status',
      type: 'string',
      options: {
        list: ['Open', 'Limited', 'Closed'],
        layout: 'radio',
      },
      initialValue: 'Open',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rsvpUrl',
      title: 'RSVP Link',
      type: 'url',
      description: 'Optional external RSVP/registration link.',
    }),
  ],
  orderings: [
    { title: 'Soonest First', name: 'startsAtAsc', by: [{ field: 'startsAt', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'startsAt' },
  },
});
