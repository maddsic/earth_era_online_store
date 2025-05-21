import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'imageUrl',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subscriptions',
      title: 'Subscriptions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'months',
              type: 'number',
              validation: (rule) => rule.required().positive(),
            },
            {
              name: 'price',
              type: 'number',
              validation: (rule) => rule.required().positive(),
            },
            // {
            //   name: 'savings',
            //   type: 'number',
            //   validation: (rule) => rule.required().min(0),
            // },
            {
              name: 'isPopular',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'features',
              type: 'array',
              of: [{type: 'string'}],
              validation: (rule) => rule.required().min(1),
            },
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
