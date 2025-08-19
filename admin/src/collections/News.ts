import { APIError, CollectionConfig } from 'payload'
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
      async ({ data, operation, req, originalDoc }) => {
        if ((operation === 'create' || operation === 'update') && data && data.title) {
          data.id = data.title
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .toLowerCase()

          const payload = req.payload
          const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()
          if (originalDoc && originalDoc.updatedAt >= tenMinutesAgo)
            throw new APIError('You can only update News every 10 minutes.', 429, null, true)
          else if (
            (
              await payload.find({
                collection: 'news',
                where: {
                  updatedAt: {
                    greater_than_equal: tenMinutesAgo,
                  },
                  id: {
                    not_equals: data.id,
                  },
                },
              })
            ).docs.length > 0
          )
            throw new APIError(
              'You can only create or update News every 10 minutes.',
              429,
              null,
              true,
            )
          return data
        }
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
