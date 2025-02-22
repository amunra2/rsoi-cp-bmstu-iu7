import Avatar from '@mui/material/Avatar';
import { PropsWithChildren } from 'react';

interface MyAvatarProps {
  lastname?: string;
  firstname?: string;
  size: number;
  className?: string;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string, size: number) {
  return {
    sx: {
      height: size,
      width: size,
      fontSize: size / 2,
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function MyAvatar({lastname, firstname, children, size, className}: PropsWithChildren<MyAvatarProps>) {
  return (
    <div>
      {(lastname && firstname) ? 
        <Avatar className={className} {...stringAvatar(`${lastname} ${firstname}`, size)}></Avatar> :
        <Avatar className={className} sx={{height: size, width: size, fontSize: size / 2}}>{children}</Avatar>}
    </div>
  )
}
