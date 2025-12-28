export type itemsContacts = {
  id: string;
  phone: string;
  name: string;
  pushname: string;
  isMyContact: boolean;
  profilePic: {
    eurl: string;
    id: {
      server: string;
      user: string;
      _serialized: string;
    };
    img: string;
    imgFull: string;
    tag: string;
  };
};
