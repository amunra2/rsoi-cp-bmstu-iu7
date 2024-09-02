import {$apiGateway} from "../http";
import { LibraryResponseInterface, LibraryFilter } from "../model/interface/library.interface";

export default class GatewayService {
  static async getLibraries(filters?: LibraryFilter): Promise<LibraryResponseInterface | undefined> {
    try {
      const response = await $apiGateway.get<LibraryResponseInterface>('/libraries/', {
        params: {
          city: filters?.city,
          page: filters?.page,
          size: filters?.size,
        }
      });
      const libraries = response.data;
      return libraries;
    } catch (e) {
      console.log(e);
    }
  }
}
