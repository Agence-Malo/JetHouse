import type { CollectionConfig } from "payload";

export const Category: CollectionConfig = {
    slug: "categories",
    labels: {
        singular: "Category",
        plural: "Categories",
    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeValidate: [
            ({ data, operation }) => {

                if ((operation === "create" || operation === "update") && data?.name) {
                    data.id = data.name
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
            name: "id",
            label: "Slug",
            type: "text",
            admin: {
                readOnly: true,
            },
            required: true,
        },
        {
            name: "name",
            type: "text",
            required: true,
        },
    ],
};