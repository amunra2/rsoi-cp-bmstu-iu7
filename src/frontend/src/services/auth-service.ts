import { AxiosResponse, isAxiosError } from "axios";
import {$apiAuth} from "../http";
import { AuthResponse } from "../model/response/auth.response";

export default class AuthService {
  static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse> | string>  { 
    return $apiAuth.post<AuthResponse>(
      "user/login/",
      {login, password},
    ).catch((error) => {
      var errorMessage: string;
      if (isAxiosError(error)) {
        if (error.response) {
          errorMessage = `${error.response.data.message}`;
        } else {
          errorMessage = `${error}`;
        }
        console.log(error);
      } else {
        errorMessage = `NOT AXIOS: ${error}`;
        console.log(`NOT AXIOS: ${error}`);
      }

      return errorMessage;
    });
  }

  // static async registration(login: string, password: string,): Promise<AxiosResponse<AuthResponse>> {
  //   return $api.post<AuthResponse>(
  //     "/registration",
  //     {login, password},
  //   );
  // }

  
}
