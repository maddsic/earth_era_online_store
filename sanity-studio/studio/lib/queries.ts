// Get the category by slug
export const getCategoryBySlug = `
  *[_type == "category" && slug.current == $slug][0]{
    _id,
    title,
  }
`

// Get products that belong to the category
export const getProductsByCategoryId = `
  *[_type == "product" && category._ref == $categoryId]{
 _id,
  name,
  slug,
  description,
  price,
  imageUrl,
  category->{_id, title, description, imageUrl}
  }
`
