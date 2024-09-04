import React from 'react'
import Text from './text';

interface MultilineTextProps {
  text: string;
  size: "mini" | "little" | "medium" | "high" | "large";
  className?: string;
}

export default function MultilineText({text, size, className}: MultilineTextProps) {
  return (
    <div className={className}>
      {text.split(" ").map(w => 
        <Text
          key="w" 
          size={size}
          // className={className}
        >
          {w}
        </Text>
      )}
    </div>
  )
}
