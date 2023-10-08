export interface Task {
  id: string;
  title: string;
  due_date?: string | null;
  isImportant?: boolean;
  isCompleted: boolean;
}
