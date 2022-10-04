import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

export const CelebrationAnimation = () => {
    const [windowsDimension, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

    const detectSize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize);
        return () => {
            window.removeEventListener('resize', detectSize);
        }

    }, [windowsDimension])

    return (
        <>
            <ReactConfetti
                width={windowsDimension.width}
                height={windowsDimension.height}
                tweenDuration={100}
            />
        </>
    );
};