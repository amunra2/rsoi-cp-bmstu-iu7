import { useState } from "react";
import AuthService from "../services/auth-service";
import InputField from "../components/input-field";
import Box from '@mui/material/Box';
import InputPassword from "../components/input-password";
import Text from "../components/text";
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import WebsiteLogo from "../components/website-logo";
import Alert from '@mui/material/Alert';
import { ThemeProvider } from "@emotion/react";
import { MyTheme } from "../theme-mui";


export function LoginPage() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const auth = async () => {
    const response = await AuthService.login(login, password);

    if (typeof response === "string") {
      setErrorMsg(response);
    } else {
      localStorage.setItem(`accessToken`, response.data.access_token as string);
      localStorage.setItem(`refreshToken`, response.data.refresh_token as string);
    }
  }; //  border border-red-700


  return (
    <div className="flex justify-center items-center h-screen bg-indigo-500">
      <Box
        className="flex flex-col gap-3 bg-third-color rounded-md p-6"
        component="form"
      >
        <WebsiteLogo size={"high"} />

        <Text size="large" className="flex justify-center mt-7 mb-1 text-secondary-color text-large-size">
          Авторизоваться
        </Text>

        <div className="grid grid-cols-2 gap-4">
          <InputField label="Логин" value={login} setValue={(value: string) => {
            setLogin(value);
          }}/>
          <InputPassword value={password} setValue={(value: string) => {
            setPassword(value);
          }}/>
        </div>

        {errorMsg &&
          <Alert
            sx={{fontWeight: 1000}}
            severity="error"
          >
            {errorMsg}
          </Alert>
        }
        
        <ThemeProvider theme={MyTheme}>
          <Button
            sx={{
              marginTop: 5,
              fontSize: "var(--medium-size)"
            }}
            color="secondary"
            size="small"
            variant="outlined"
            onClick={ auth }
          >
            Готово
          </Button>
        </ThemeProvider>

        <Divider sx={{ borderBottomWidth: 3 }} variant="middle" />
        
        <ThemeProvider theme={MyTheme}>
          <Link
            className="flex justify-center"
            color="secondary"
            sx={{fontSize: "var(--little-size)"}}
            // href="/register"
            underline="hover"
          >
            Зарегистрироваться
          </Link>
        </ThemeProvider>
      </Box>
    </div>
  )
}
