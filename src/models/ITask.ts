export interface ITask {
    id: number;
    name: string;
    due_date: string;
    is_done: boolean;
    category: number | null;
    priority: number | null;
}
