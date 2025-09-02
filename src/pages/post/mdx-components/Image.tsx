export function Image(props: { src: string; alt: string; title?: string }) {
  if (props.title !== undefined) {
    return (
      <div>
        <figure>
          <img src={props.src} alt={props.alt} />
          <figcaption className="text-sm text-primary opacity-80 text-center mt-1">{props.title}</figcaption>
        </figure>
      </div>
    );
  } else {
    return <img src={props.src} alt={props.alt} />;
  }
}
