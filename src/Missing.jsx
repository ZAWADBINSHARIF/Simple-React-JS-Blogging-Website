import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Missing() {
    return (
        <main className="Missing">
            <p>Page not found</p>
            <p>{"Well, that's disappointing."}</p>
            <Link to="/">Go to back the Homepage</Link>
        </main>
    )
}