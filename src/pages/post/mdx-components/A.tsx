export function A(props: {
  href: string;
  children: string | React.ReactNode;
  title?: string;
}) {
  return (
    <>
        <a href={props.href} title={props.title} target="_blank">{props.children}</a>
    </>
  );
}
