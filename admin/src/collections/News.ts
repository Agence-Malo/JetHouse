import type { CollectionConfig } from 'payload'
import GitHubActionsTrigger from '@/hooks/GitHub-Actions-trigger'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'News Item',
    plural: 'News',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if ((operation === 'create' || operation === 'update') && data?.title) {
          data.id = data.title
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .toLowerCase()
        }
        return data
      },
    ],
    afterChange: [GitHubActionsTrigger],
    afterDelete: [GitHubActionsTrigger],
  },
  fields: [
    {
      name: 'id',
      label: 'Slug',
      type: 'text',
      admin: {
        readOnly: true,
      },
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'fullContent',
      label: 'Full Content',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      label: 'Main Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
    },
  ],
}
