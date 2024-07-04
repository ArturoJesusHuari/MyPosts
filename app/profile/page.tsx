"use client"
//Next
import { useRouter } from 'next/navigation'
//React
import React, { useState, useEffect } from 'react';
//Libreria para consultas http
import axios from "axios";
//API
const apiUrlPosts = 'http://localhost:4000/posts';
const apiUrlData = 'http://localhost:4000/users/data';
//Componentes
import HeaderComponent from "@/components/Header";
import MyPostComponent from "@/components/MyPost";
import UserDataComponent from "@/components/UserData"
import PaginationComponent from "@/components/Pagination";
import SortByComponent from "@/components/SortBy";

import { UserData, Post } from '@/types/interfaces';

const ProfilePage = () => {
  let token:any;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter()

  useEffect(() => {
    getUserData(token)
        .then(
          data => setUserData(data)
        ).catch(error => console.error('Algo falló'));
  }, []);

  useEffect(() => {
    fetchPosts();
  },[]);

  const getUserData = async (token: any): Promise<UserData> => {
    const response = await axios.get(apiUrlData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  const fetchPosts = async () => {
    try {
      const response = await axios.get(apiUrlPosts +'/mine', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      router.push('/login')
    }
  };

  const handleEdit = async (post: Post) => {
    try {
      await axios.put(apiUrlPosts , { post }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error updating post:', error);
    } finally{
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${apiUrlPosts }/${id}`,{ headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally{
      fetchPosts();
    }
  };

  const handleSearch = () => {
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPosts(filteredPosts);
    if(searchTerm == ''){
      fetchPosts();
    }
  };

  const sortByStringField = (field: keyof Post) => {
    const sortedPosts = [...posts].sort((a, b) => {
      const fieldA = a[field];
      const fieldB = b[field];
  
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return fieldA.localeCompare(fieldB, undefined, { sensitivity: 'base' });
      }
  
      // Opcional: Manejar el caso donde fieldA o fieldB no son cadenas
      return 0;
    });
  
    setPosts(sortedPosts);
  };

  //Paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 8;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return(
    <>
      <HeaderComponent handleSearch={handleSearch} setSearchTerm={setSearchTerm} />
      <section className='flex flex-col justify-center px-4 items-center w-full'>
        <UserDataComponent userData={userData} />
      </section>
      <main className="flex flex-col justify-center items-center px-4">
        <SortByComponent sortByStringField={sortByStringField} />
        <PaginationComponent postsLength={posts.length} postsPerPage={postsPerPage} paginate={paginate} />
        <section className="flex flex-col justify-center items-center">
        {currentPosts.map((post) => post.userId ? (
                <MyPostComponent 
                key={post.id} 
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              ) : null )
              }
        </section>
        <PaginationComponent postsLength={posts.length} postsPerPage={postsPerPage} paginate={paginate} />
      </main>
    </>
  );
}
export default ProfilePage;