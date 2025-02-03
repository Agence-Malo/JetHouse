import type { CollectionConfig } from "payload";

export const News: CollectionConfig = {
    slug: "news",
    labels: {
        singular: "News Item",
        plural: "News",
    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeValidate: [
            ({ data, operation }) => {
                if ((operation === "create" || operation === "update") && data?.title) {
                    data.slug = data.title
                        .trim()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]+/g, "")
                        .toLowerCase();
                }
                return data;
            },
        ],
    },
    fields: [
        {
            name: "slug",
            label: "Slug",
            type: "text",
            admin: {
                readOnly: true,
            },
            required: true,
        },
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "excerpt",
            label: "Excerpt",
            type: "textarea",
            required: false,
        },
        {
            name: "content",
            label: "Full Content",
            type: "textarea",
            required: false,
        },
        {
            name: "date",
            label: "Publication Date",
            type: "date",
            required: true,
        },
        {
            name: "image",
            label: "Main Image",
            type: "upload",
            relationTo: "media",
            required: false,
        },
        {
            name: "category",
            label: "Category",
            type: "relationship",
            relationTo: "categories",
            required: false,
        },
    ],
};