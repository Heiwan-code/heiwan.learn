import { useState, useEffect } from 'react';

import React from 'react'

interface DotsProps {
    keyword: String
    highlightClass: string
    dotCount: number
    dotsDone: Function
}

const Dots: React.FC<DotsProps> = ( {
    keyword, 
    highlightClass, 
    dotCount, 
    dotsDone
}) => {
    const [dots, setDots] = useState('');
    const [totalDots, setTotalDots] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (dots.length == 3)
                setDots('');
            else {
                setDots(prev => prev + '.');
            }
            setTotalDots(prev => prev + 1)
        }, 800 + Math.floor(Math.random() * 500));

        if (totalDots >= dotCount) {
            clearInterval(interval);
            dotsDone()
        }
    
        return () => {
          clearInterval(interval);
        };
      }, [dots, dotCount]);

  return (
      <span className=
        {`main-hero__keyword highlight-text`}
        >
            {keyword ? `  ${keyword}` : dots}
    </span>
  );
}

export default Dots;