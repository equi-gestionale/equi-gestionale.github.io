
export class Member {
    id: string;
    name: string;
    surname: string;
    birthdate: Date;
    birthplace: string;
    address: Address;
    contacts: Contacts;
    addInfo: AddInfo;
    note: string;
    membership : Membership;
  }

  export class Address{
    city:string;
    state:string;
    street:string;
    cap:number;
  }

  export class Contacts{
    phone: string;
    cell: string;
    email:string;
  }

  export class AddInfo{
    profession: string;
    hobby: string;
    website: string;
    qualification: string;
  }

  export class Membership{
    standard: boolean;
    schoolclass:boolean;
    className: string;
    amount:number;
    date:Date;
    privacy:boolean;
    newsletterEnabled:boolean;
    memberColor: string;
  }

  export class MembersPage{
    content: Member[];
    totalPages: number;
    totalElements:number;
    last:boolean;
    size:number;
    number:number;
    numberOfElements:number;
    first:boolean;
    empty:boolean;

  }