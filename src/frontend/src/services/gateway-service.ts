import {$apiGateway} from "../http";
import { BookFilter, BookResponseInterface } from "../model/interface/book.interface";
import { LibraryResponseInterface, LibraryFilter } from "../model/interface/library.interface";
import { TakeBookRequest } from "../model/request/reservation.request";
import { TakeBookResponse } from "../model/response/reservation.response";

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

  static async getBooksByLibraryUuid(libraryUuid: string, filters?: BookFilter): Promise<BookResponseInterface | undefined> {
    try {
      const response = await $apiGateway.get<BookResponseInterface>(`/libraries/${libraryUuid}/books/`, {
        params: {
          showAll: filters?.showAll,
          page: filters?.page,
          size: filters?.size,
        }
      });
      const books = response.data;
      return books;
    } catch (e) {
      console.log(e);
    }
  }

  static async reserveBook(request: TakeBookRequest): Promise<TakeBookResponse | undefined> {
    try {
      const response = await $apiGateway.post<TakeBookResponse>(`/reservations/`,
        {
          libraryUid: request.libraryUuid,
          bookUid: request.booUuid,
          tillDate: request.tillDate.format("YYYY-MM-DD"),
        }
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}
