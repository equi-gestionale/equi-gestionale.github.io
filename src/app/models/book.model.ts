
export class Book {
    id: number;
    isbn: string;
    title: string;
    subtitle: string;
    authors: string;
    publisher: string;
    publishedDate: Date;
    description: string;
    pageCount: number;
    language: string;
    libraryMetadata: LibraryMetadata;
  }

  export class LibraryMetadata{
    registrationDates:Date[];
    deliveryDates:Date[];
    numberOfCopy:number;
  }