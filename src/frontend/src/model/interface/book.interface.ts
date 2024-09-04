export interface BookInterface {
  bookUid: string;
  name: string;
  author: string;
  genre: string;
  condition: "EXCELLENT" | "GOOD" | "BAD";
  availableCount: number;
}

export interface BookResponseInterface {
  items: BookInterface[];
  page: number;
  pageSize: number;
  totalElements: number;
}

export interface BookFilter {
  showAll?: boolean;
  page?: number;
  size?: number;
}
