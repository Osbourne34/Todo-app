import { Dayjs } from 'dayjs';

export interface ITask {
    name: string;
    due_date: string | undefined;
    category: number | null;
    priority: number | null;
}

export interface ITask2 {
    id: number;
    name: string;
    due_date: string;
    is_done: boolean;
    category: number | null;
    priority: number | null;
}
