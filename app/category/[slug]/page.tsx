import { redirect } from "next/navigation";

export default function CategoryRedirect({
  params,
}: {
  params: { slug: string };
}) {
  redirect(`/products?category=${encodeURIComponent(params.slug)}`);
}
