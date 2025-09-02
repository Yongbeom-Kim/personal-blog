export function Image(props: { src: string; alt: string; title?: string }) {
  if (props.title !== undefined) {
    return (
      <figure className="mx-auto">
        <img src={props.src} alt={props.alt} className="mx-auto" />
        <figcaption className="text-sm text-primary opacity-80 text-center mt-1">
          {props.title}
        </figcaption>
      </figure>
    );
  } else {
    return <img src={props.src} alt={props.alt} />;
  }
}
