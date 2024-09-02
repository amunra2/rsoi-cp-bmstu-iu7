import {$apiLibrary} from "../http";
import { LibraryResponseInterface } from "../model/interface/library.interface";

export default class LibraryService {
  static async getLibraries(): Promise<LibraryResponseInterface | undefined> {
    try {
      const response = await $apiLibrary.get<LibraryResponseInterface>('/library/');
      const libraries = response.data;
      return libraries;
    } catch (e) {
      console.log(e);
    }
  }
}
