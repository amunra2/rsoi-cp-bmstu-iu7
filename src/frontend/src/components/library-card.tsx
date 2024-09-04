import React from 'react'
import { LibraryInterface } from '../model/interface/library.interface'
import Text from './text';

interface LibraryCardProps {
  useName?: boolean;
  library: LibraryInterface;
}

export default function LibraryCard({
  library,
  useName = true,
}: LibraryCardProps) {
  return (
    <div>
      {useName && 
        <React.Fragment>
          <Text size="medium" className="font-extrabold">{library.name}</Text>
          <br />
        </React.Fragment>
      }
      <div className="flex flex-row gap-2">
        <Text size="little" className="font-semibold min-w-14">Адрес:</Text>
        <Text size="little">{library.address}</Text>
      </div>
      <div className="flex flex-row gap-2">
        <Text size="little" className="font-semibold min-w-14">Город:</Text>
        <Text size="little">{library.city}</Text>
      </div>
    </div>
  )
}
