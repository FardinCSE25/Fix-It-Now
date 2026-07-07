export interface TechnicianQuery {
  searchTerm?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc"
}

export interface UpdateTechnicianProfilePayload {
    bio?: string;
    experience?: string;
}

export interface UpdateAvailabilityPayload {
    workingDays: string[];
    startTime: string;
    endTime: string;
}