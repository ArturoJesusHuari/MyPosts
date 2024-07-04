export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

export interface Post {
  userId?: string;
  username?: string;
  email?: string;
  id: string;
  title: string;
  body: string;
}
export interface AddPost {
  title: string;
  body: string;
}