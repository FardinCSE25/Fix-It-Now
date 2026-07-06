export interface TechnicianQuery {
  searchTerm?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc"
}