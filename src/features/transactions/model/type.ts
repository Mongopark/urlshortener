

export interface DataProps {
    item?: ItemProps;
    index: number;
  }

  export interface UrlsProps {
    data: UserData;
    message: string;
  }

  export interface UserData {
        id: string;
        email: string;
        password: string;
        createdAt: string;
        updatedAt: string;
        urls: ItemProps[];
  }

// export interface ItemProps {
//     id: number; 
//     TransactionId: string; 
//     urlLink: string; 
//     more: string;
//     name: string; 
//     signUpDate: string; 
//     description: string;
//   }

export interface ItemProps {
_id: number; 
name: string;
description: string;
original: string;
short: string;
createdAt: string;
user_id: string;
}

  export interface AllDataProps {
    data: ItemProps[];
  }