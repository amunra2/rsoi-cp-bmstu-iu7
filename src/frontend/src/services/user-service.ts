import { AxiosResponse } from "axios";
import { UserInterface } from "../model/interface/user.interface";
import {$apiUser} from "../http";

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<UserInterface[]>> {
    return $apiUser.get<UserInterface[]>('/user/');
  }
}
