// FIXME: This kills type check between the element and the props.
// But I can't figure out a way to make it work.
type ElementWithProps = [React.ElementType, Record<string, unknown>]

type ClientOnlyContextProps = {
    contexts: ReadonlyArray<ElementWithProps | [React.ElementType]>;
    children: React.ReactNode;
};

export const ClientOnlyContext = ({ contexts, children }: ClientOnlyContextProps) => {
    if (__SSR__) {
        return <>{children}</>;
    }

    const NestedContexts = contexts.reduceRight(
        (acc, [ContextProvider, props]) => {
            return <ContextProvider {...props}>{acc}</ContextProvider>;
        },
        children
    );

    return <>{NestedContexts}</>;
};
