export type ISODateString = string;
export type CurrencyCode = string;

export interface Timestamped {
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface PaginationInput {
  limit?: number;
  offset?: number;
}

export interface PaginatedResult<TItem> {
  items: ReadonlyArray<TItem>;
  totalCount: number;
}

export interface SupabaseTimestampColumns {
  created_at: ISODateString;
  updated_at: ISODateString;
}
