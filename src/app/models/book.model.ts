
export class Book {
    id: number;
    title: string;
    authors: string;
    subtitle: string;
    isbn: string;
    publisher: string;
    publishedDate: Date;
    description: string;
    pageCount: number;
    language: string;
    category: string;
    thumbnail: string;
    libraryMetadata: LibraryMetadata;
  }

  export class LibraryMetadata{
    registrationDates:Date[];
    deliveryDates:Date[];
    numberOfCopy:number;
  }

  export class BooksPage{
    content: Book[];
    totalPages: number;
    totalElements:number;
    last:boolean;
    size:number;
    number:number;
    numberOfElements:number;
    first:boolean;
    empty:boolean;
  }

  export class Genre{
    id: string;
    genre: string;
  }