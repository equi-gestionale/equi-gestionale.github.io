
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
  }

  export class Membership{
    isStandard: boolean;
    isSchoolClass:boolean;
    className: string;
    amount:number;
    date:Date;
    memberType:string;
    isPrivacy:boolean;
    isNewsletterEnabled:boolean;
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