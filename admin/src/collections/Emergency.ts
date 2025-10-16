import { APIError, GlobalConfig } from 'payload'
import GitHubActionsTrigger from '@/hooks/GitHub-Actions-trigger'

const Emergency: GlobalConfig = {
  slug: 'emergency',
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      async ({ data, originalDoc }) => {
        if (
          originalDoc &&
          originalDoc.updatedAt >= new Date(Date.now() - 10 * 60 * 1000).toISOString()
        )
          throw new APIError(
            'You can only update the Emergency page every 10 minutes.',
            429,
            null,
            true,
          )
        return data
      },
    ],
    afterChange: [GitHubActionsTrigger],
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enable Emergency Page',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'updates',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'updatedAt',
          type: 'date',
          admin: {
            readOnly: true,
            date: {
              displayFormat: 'YYYY-MMM-dd HH:mm:ss:SSS',
            },
          },
          hooks: {
            beforeValidate: [({ previousValue }) => previousValue || new Date().toISOString()],
          },
        },
      ],
    },
  ],
}

export default Emergency
