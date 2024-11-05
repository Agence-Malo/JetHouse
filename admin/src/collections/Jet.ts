import type { CollectionConfig } from 'payload'

export const Jet: CollectionConfig = {
  slug: 'jet',
  labels: {
    singular: 'Jet',
    plural: 'Jets Catalogue',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: false },
    { name: 'brochure', type: 'upload', relationTo: 'media', required: false },
    {
      type: 'row',
      fields: [
        {
          name: 'information',
          type: 'group',
          fields: [
            {
              name: 'cabin size (m)',
              type: 'group',
              fields: [
                { name: 'length', type: 'number', required: true },
                { name: 'width', type: 'number', required: true },
                { name: 'height', type: 'number', required: true },
              ],
            },
            {
              name: 'maximum speed (km/h)',
              type: 'number',
              required: true,
            },
            {
              name: 'flight hours',
              type: 'number',
              required: true,
            },
            {
              name: 'crew',
              type: 'group',
              fields: [
                { name: 'pilots', type: 'number', required: true },
                { name: 'flight attendants', type: 'number', required: true },
              ],
            },
            { name: 'maximum range (km)', type: 'number', required: true },
            { name: 'baggage capacity (m³)', type: 'number', required: true },
          ],
        },
        {
          name: 'images',
          type: 'group',
          fields: [
            { name: 'hero banner', type: 'upload', relationTo: 'media', required: true },
            { name: 'cabin layout', type: 'upload', relationTo: 'media', required: true },
            {
              name: 'gallery',
              labels: {
                singular: 'image',
                plural: 'images',
              },
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
