import { defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons';

// PUBLIC PORTFOLIO SHOWCASE ONLY.
// Rule 506(b) prohibits general solicitation of specific offerings, so this schema
// intentionally has NO fields for target return, raise total, raised-to-date, or
// minimum investment. That data belongs to the private "Offering" model that will
// live in the investor-portal backend (Phase 4 of PLATFORM_ARCHITECTURE.md) once an
// investor is authenticated — it should never be modeled here.
export default defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Property Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      initialValue: 'FL',
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          'Commercial',
          'Residential',
          'Mixed-Use',
          'Retail',
          'Multi-Family',
          'Industrial',
          'Single Family',
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'General portfolio status shown publicly — not a funding/raise indicator.',
      options: {
        list: ['Coming Soon', 'Active', 'Under Review', 'Planning', 'In Operation'],
        layout: 'dropdown',
      },
      initialValue: 'Active',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'General, non-financial description of the property.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Feature this property near the top of the public portfolio page.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 100,
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'city', media: 'heroImage' },
  },
});
