import { useState, useEffect } from "react";

const Welcome = () => {
    const [displayText, setDisplayText] = useState("");
    const text = "Welcome to  Dashboard X! ";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 100);
    }, []);

    return (
        <div className="overflow-hidden whitespace-nowrap relative mt-8">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-blue-500  animate-scroll">
                {displayText}
            </div>
        </div>
    );
};

export default Welcome;
