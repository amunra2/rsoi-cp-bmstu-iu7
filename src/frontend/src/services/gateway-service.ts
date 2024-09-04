import { isAxiosError } from "axios";
import {$apiGateway} from "../http";
import { BookFilter, BookResponseInterface } from "../model/interface/book.interface";
import { LibraryResponseInterface, LibraryFilter } from "../model/interface/library.interface";
import { TakeBookRequest } from "../model/request/reservation.request";
import { TakeBookResponse } from "../model/response/reservation.response";
import { RatingInterface } from "../model/interface/rating.interface";

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

  static async reserveBook(request: TakeBookRequest): Promise<TakeBookResponse | string> {
    const response = await $apiGateway.post<TakeBookResponse>(`/reservations/`,
      {
        libraryUid: request.libraryUuid,
        bookUid: request.booUuid,
        tillDate: request.tillDate.format("YYYY-MM-DD"),
      }
    ).catch((error) => {
      var errorMessage: string;
      if (isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          errorMessage = `Ошибка: Эта книга в библиотеке закончилась`;
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

    if (typeof response === "string") {
      return response;
    } else {
      const reservation = response.data;
      return reservation;
    }
  }

  static async getUserRating(): Promise<RatingInterface | undefined> {
    try {
      const response = await $apiGateway.get<RatingInterface>(`/rating/`);
      const rating = response.data;
      return rating;
    } catch (e) {
      console.log(e);
    }
  }
}
