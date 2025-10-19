export function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
    const {children, ...rest} = props;
    return (
        <pre {...rest} className="bg-gray-400/10 leading-[1.7] py-4 px-0 my-6 bg-border rounded-md overflow-x-auto">
            <CodeInPre {...(children as React.ReactElement<React.ComponentProps<'code'>>).props} />
        </pre>
    )
}

function CodeInPre(props: React.ComponentProps<'code'>) {
    return <code {...props} className="text-xs sm:text-sm block leading-[1.55]" />;
}