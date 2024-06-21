

export interface DataProps {
    item?: ItemProps;
    index: number;
  }

export interface ItemProps {
    id: number; 
    TransactionId: string; 
    urlLink: string; 
    more: string;
    name: string; 
    signUpDate: string; 
    description: string;
  }

  export interface AllDataProps {
    data: ItemProps[];
  }