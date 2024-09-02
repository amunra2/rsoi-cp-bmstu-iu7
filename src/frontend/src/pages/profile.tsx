import Text from '../components/text';
import Avatar from '@mui/material/Avatar';
import UserService from '../services/user-service';
import { useCallback, useEffect, useState } from 'react';
import { UserInterface } from '../model/interface/user.interface';
import { fontSize } from '@mui/system';
import MyAvatar from '../components/avatar';
import AuthService from '../services/auth-service';


export default function ProfilePage() {
  const [user, setUser] = useState<UserInterface>();

  const getMe = useCallback(async () => {
    const user = await UserService.getMe();
    setUser(user);
  }, []);

  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <div 
      className="flex flex-col p-10 mt-5 w-5/6 bg-my-third-color drop-shadow-2xl rounded-md"
    >
      <Text size="large">Профиль</Text>

      <div className="flex flex-row mt-5 gap-7">
        <MyAvatar size={150} lastname={user?.lastname} firstname={user?.firstname}>?</MyAvatar>
        <div className="flex flex-col">
          <Text className="font-extrabold" size="high">{user?.login ?? "???"}</Text>
          <br />
          <div className="flex flex-row gap-2">
            <Text className="font-semibold min-w-32" size="medium">Фамилия:</Text>
            <Text size="medium">{user?.lastname ?? "???"}</Text>
          </div>
          <div className="flex flex-row gap-2">
            <Text className="font-semibold min-w-32" size="medium">Имя:</Text>
            <Text size="medium">{user?.firstname ?? "???"}</Text>
          </div>

          <br />
          <div className="flex flex-row gap-2">
            <Text className="font-semibold min-w-32" size="medium">Почта:</Text>
            <Text size="medium">{user?.email ?? "???"}</Text>
          </div>
          <div className="flex flex-row gap-2">
            <Text className="font-semibold min-w-32" size="medium">Телефон:</Text>
            <Text size="medium">{user?.phone ?? "???"}</Text>
          </div>

          <br />
          {AuthService.isAdmin() && 
            <div className="flex flex-row gap-2">
              <Text className="font-semibold min-w-32" size="medium">Роль:</Text>
              <Text size="medium">{user?.role ?? "???"}</Text>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
