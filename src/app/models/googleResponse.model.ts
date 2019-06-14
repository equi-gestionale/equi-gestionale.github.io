
export class GoogleResponse{

    kind: string;
    items: GoogleVolume[];
    totalItems: number;

    deserialize(input: any): this {
        return Object.assign(this, input);
      }

}

export class GoogleVolume{

    kind: string;
    id: string;
    volumeInfo: VolumeInfo;

    deserialize(input: any): this {
        return Object.assign(this, input);
      }

}

export class VolumeInfo{
    title:string;
    subtitle:string;
    authors:string[];
    publisher:string;
    publishedDate:string;
    description:string;
    industryIdentifiers:Isbn[];
    pageCount:number;
    mainCategory:string;
    categories:string[];
    contentVersion:string;
    imageLinks:ImageLinks;
    language:string;
    previewLink:string;
    infoLink:string;
    canonicalVolumeLink:string;

    deserialize(input: any): this {
        return Object.assign(this, input);
      }
}


export class ImageLinks{
    smallThumbnail:string;
    thumbnail:string;
    small:string;
    medium:string;
    large:string;
    extraLarge:string;

    deserialize(input: any): this {
        return Object.assign(this, input);
      }
}

export class Isbn{
    type:string;
    identifier:string;
    
    deserialize(input: any): this {
        return Object.assign(this, input);
      }
}