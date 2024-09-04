import {Dayjs} from "dayjs"

export interface TakeBookRequest {
  libraryUuid: string;
  booUuid: string;
  tillDate: Dayjs;
}
