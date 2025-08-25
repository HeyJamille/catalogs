export type itemUsers = {
  id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  cep: string;
  photo: string;
  is_active: boolean;
  checked: boolean;
  enterprise: {
    id: string;
    company_acronym: string;
    company_fantasy: string;
  };
  rule: {
    id: string;
    name: string;
  };
  created_at: Date;
  updated_at: Date;
};
