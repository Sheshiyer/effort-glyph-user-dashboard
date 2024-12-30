export interface ClockifyUser {
  id: string;
  email: string;
  name: string;
  activeWorkspace: string;
  defaultWorkspace: string;
  status: string;
  profilePicture: string;
}

export interface Employee {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  start_date: string;
  clockify_id: string;
}