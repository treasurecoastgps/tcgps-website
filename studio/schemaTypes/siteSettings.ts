import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';

// Singleton — one document only, edited in place via structure.ts.
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Treasure Coast Global Property Solutions',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'investorRelationsEmail',
      title: 'Investor Relations Email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
      ],
    }),
    defineField({
      name: 'defaultSeoImage',
      title: 'Default Social Share Image',
      type: 'image',
      description: 'Used as the fallback Open Graph image for pages without their own.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
