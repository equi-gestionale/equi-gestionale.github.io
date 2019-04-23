
export class Book {
    isbn: string;
    title: string;
    authors: [];
    publisher: string;
    publishedDate: Date;
    description: string;
    pageCount: number;
    language: string;

    deserialize(input: any): this {
      return Object.assign(this, input);
    }

  }