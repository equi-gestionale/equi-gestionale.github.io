import { Book } from './book.model';

export class GoogleResponse{

    kind: string;
    items: GoogleVolume[];
    totalItems: number;

    deserialize(input: any): this {
        return Object.assign(this, input);
      }

}

export class GoogleVolume{

    volumeInfo: Book;

    deserialize(input: any): this {
        return Object.assign(this, input);
      }

}