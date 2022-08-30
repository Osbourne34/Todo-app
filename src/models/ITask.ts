import { Dayjs } from 'dayjs';

export interface ITask {
    name: string;
    due_date: string | undefined;
    category: number | null;
    priority: number | null;
}
