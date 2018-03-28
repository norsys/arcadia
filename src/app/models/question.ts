import {Category} from './category';

export class Question {
    public id: number;
    public question: string;
    public response: string;
    public inputType: string;
    public category_id: string;
    public agency_id: string;
    public Category: Category;
}
