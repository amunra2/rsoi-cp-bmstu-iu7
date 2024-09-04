import React from 'react'
import Text from './text';
import { BookInterface } from '../model/interface/book.interface';

interface BookCardProps {
  useName?: boolean;
  book: BookInterface;
}

export default function BookCard({
  book,
  useName = true,
}: BookCardProps) {
  return (
    <div>
      {useName && 
        <React.Fragment>
          <Text size="medium" className="font-extrabold">{book.name}</Text>
          <br />
        </React.Fragment>
      }
      <div className="flex flex-row gap-2">
        <Text size="little" className="font-semibold min-w-14">Автор:</Text>
        <Text size="little">{book.author}</Text>
      </div>
      <div className="flex flex-row gap-2">
        <Text size="little" className="font-semibold min-w-14">Жанр:</Text>
        <Text size="little">{book.genre}</Text>
      </div>
      <br />
      <div className="flex flex-row gap-2">
        <Text size="little" className="font-semibold min-w-14">Количество:</Text>
        <Text size="little">{book.availableCount}</Text>
      </div>
    </div>
  )
}
