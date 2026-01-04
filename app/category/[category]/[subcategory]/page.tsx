interface Props {
  params: { category: string; subcategory: string };
}

export default function SubCategoryPage({ params }: Props) {
  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-2xl font-bold capitalize">
        {params.subcategory.replace("-", " ")}
      </h1>

      <p className="mt-4 text-gray-600">
        Category: {params.category}
      </p>

      {/* Product Grid here */}
    </div>
  );
}
