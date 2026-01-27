import { redirect } from "next/navigation";

export default function SubCategoryRedirect({
  params,
}: {
  params: { slug: string };
}) {
  redirect(`/products?subcategory=${encodeURIComponent(params.slug)}`);
}
