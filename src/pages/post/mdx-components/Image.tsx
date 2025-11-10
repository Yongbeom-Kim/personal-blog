import { usePostSlug } from "../hooks/use-slug";

export function Image(props: { src: string; alt: string; title?: string }) {
  let src = props.src;

  const slug = usePostSlug()
  const pathPrefix = `/assets/${slug}`

  if (pathPrefix.startsWith('./'))
    src = src.replace('./', '')
  if (!props.src.startsWith(pathPrefix))
    src = `${pathPrefix}/${src}`


  if (props.title !== undefined) {
    return (
      <figure className="mx-auto">
        <img src={src} alt={props.alt} className="mx-auto" />
        <figcaption className="text-sm text-primary opacity-80 text-center mt-1">
          {props.title}
        </figcaption>
      </figure>
    );
  } else {
    return <img src={src} alt={props.alt} />;
  }
}
