import { useParams } from "react-router-dom";

export const usePostSlug = () => {
  const { slug = "" } = useParams<{ slug: string }>();
	return slug;
}