export default function ifEq(a: string, b: string, options: any) {
    return a === b ? options.fn(this) : options.inverse(this);
}