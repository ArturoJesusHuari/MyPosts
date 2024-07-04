import Avatar from "./src/avatar.png"
import Image from "next/image"; 
import { Post } from '@/types/interfaces';

interface PostComponentProps {
  post: Post;
}

const PostComponent: React.FC<PostComponentProps> = ({post}) => {
  return (
    <article className='rounded-2xl bg-black my-2 justify-start items-start w-full'>
      <div className='mx-8 my-8'>
        <div className='flex'>
          <Image className="mx-4 my-6" height={40} src={Avatar} alt="" />
          <div className='items-center content-center'>
            <p className='text-xl text-white'><b>{post ? post.username : 'Loading...'}</b></p>
            <p className='text-xs text-white'>{post ? post.email : 'Loading...'}</p>
          </div>
        </div>
        <p className='text-2xl text-white'>{post.title}</p>
        <p className=' text-white'>{post.body}</p>
        
      </div>
    </article>
  );
}
export default PostComponent;