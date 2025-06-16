export interface PaginatedResponse<T>{
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number; // El número de página actual (base 0)
  numberOfElements: number;
  empty: boolean;
}
