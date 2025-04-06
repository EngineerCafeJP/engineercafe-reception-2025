export type ZipcloudResponse = {
  status: number;
  message: string | null;
  results: Address[] | null;
};

type Address = {
  zipcode: string;
  prefcode: string;
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
};
