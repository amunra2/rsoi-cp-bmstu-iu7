import { PropsWithChildren } from 'react'

interface TextProps {
  size: "mini" | "little" | "medium" | "high" | "large";
  className: string;
}

export default function Text({size, className, children}: PropsWithChildren<TextProps>) {
  return (
    <div className={className+` text-${size}-size leading-${size}-height`}>
      {children}
    </div>
  )
}
