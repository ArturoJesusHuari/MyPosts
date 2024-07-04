import Image from "next/image";
import Avatar from "./src/avatar.png"

interface UserData {
  id: string,
  name: string;
  username: string;
  email: string;
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  } 
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

interface UserDataProps {
  userData: UserData | null;
}

const UserDataComponent: React.FC<UserDataProps> = ({ userData }) => {
  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className='rounded-2xl my-0 mb-2 w-full bg-black'>
      <div className='flex mx-8 my-8'>
        <div className='mt-4 w-1/2'>
          <Image className="mx-16 my-6" src={Avatar} alt="" />
          <p className='text-xl'><b>Email:</b> {userData.email}</p>
          <p className='text-xl'><b>Name:</b> {userData.name}</p>
          <p className='text-xl'><b>Username:</b> {userData.username}</p>
          <p className='text-xl'><b>Phone:</b> {userData.phone}</p>
          <p className='text-xl'><b>Website:</b> <a href={userData.website}>{userData.website}</a></p>
        </div>
        <div>
          <div className='mt-4 w-1/2'>
            <p className='text-xl'><b>Address:</b></p>
            <p className='ml-4'>{userData.address.street}, {userData.address.suite}</p>
            <p className='ml-4'>{userData.address.city}, {userData.address.zipcode}</p>
            <p className='ml-4'><b>Geo:</b> {userData.address.geo.lat}, {userData.address.geo.lng}</p>
          </div>

          <div className='mt-4'>
            <p className='text-xl'><b>Company:</b></p>
            <p className='ml-4'>{userData.company.name}</p>
            <p className='ml-4'>{userData.company.catchPhrase}</p>
            <p className='ml-4'>{userData.company.bs}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDataComponent;