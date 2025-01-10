export function ErrorMessage({ message }: { message?: string }) {
    return (
        <span className="font-medium text-red-600 -tracking-tighter text-xs">
            {message}
        </span>
    );
}
