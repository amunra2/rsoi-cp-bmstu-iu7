import React from 'react'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Text from './text';

interface WebsiteLogoProps {
  size: "mini" | "little" | "medium" | "high" | "large";
}

export default function WebsiteLogo({size}: WebsiteLogoProps) {
  return (
    <a 
      href="/"
      className="flex flex-row gap-4 border justify-center bg-secondary-color p-1 rounded-md"
    >
      <Text size={size}
        className={`text-third-color h-fit`}
      >
        LibraREALLY
      </Text>
      <MenuBookIcon
        style={{fontSize: `var(--large-size)`, lineHeight: `var(--${size}-height)`}}
        className="text-third-color" 
      />
    </a>
  )
}
