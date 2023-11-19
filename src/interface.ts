export interface Task {
  id: string;
  title: string;
  due_date?: string | null;
  isImportant?: boolean;
  isCompleted: boolean;
  steps?: Step[] | null | undefined;
}

export interface Step {
  id: string;
  title: string;
  isCompleted: boolean;
}
