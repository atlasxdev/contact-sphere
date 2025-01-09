import { dotPulse } from "ldrs";

dotPulse.register();

function Loader() {
    return (
        <div className="h-screen flex items-center justify-center">
            <l-dot-pulse size="64" speed="1.3" color="#7C3AED"></l-dot-pulse>
        </div>
    );
}

export default Loader;
