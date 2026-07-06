export interface ServicePayload {
    categoryId: string,
      title: string,
      description: string,
      price: number,
}

export interface ServiceQuery {
    type?: string;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc"
}