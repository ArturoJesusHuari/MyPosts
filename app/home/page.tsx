"use client"
//Next
import { useRouter } from 'next/navigation'
//React
import React, { useState, useEffect } from 'react';
//Libreria para consultas http
import axios from "axios";
//API
const apiUrl = 'http://localhost:4000/posts';
//Componentes
import HeaderComponent from "@/components/Header";
import PostComponent from "@/components/Post";
import AddPostComponent from '@/components/AddPost';
import PaginationComponent from "@/components/Pagination";
import SortByComponent from "@/components/SortBy";
//Interfaces
import { AddPost, Post } from '@/types/interfaces';

const HomePage = () => {
  let token:any;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const router = useRouter()

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(apiUrl, {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, title:string, body:string) => {
    e.preventDefault();
    const newPost: AddPost = {
      title,
      body,
    };
    try {
      axios.post(apiUrl, newPost, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then( () => {
        fetchPosts(); 
      })
      .catch(function (error) {
        console.log(error);
      });
    } catch (error) {
      console.error('Error creating post:', error);
    } finally{
      fetchPosts(); 
    }
  };

  const handleSearch = () => {
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPosts(filteredPosts);
    if(searchTerm === ''){
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
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchPosts(); 
  };
  
  return(
    <>
      <HeaderComponent handleSearch={handleSearch} setSearchTerm={setSearchTerm} />
      <AddPostComponent handleSubmit={handleSubmit}/>
      <main className="flex flex-col justify-center items-center px-4 ">
        <SortByComponent sortByStringField={sortByStringField} />
        <PaginationComponent postsLength={posts.length} postsPerPage={postsPerPage} paginate={paginate} />
        <section className="flex flex-col justify-center items-center w-full">
        {currentPosts.map((post) => 
          post.userId ? (
            <PostComponent key={post.id} post={post}/>
          ) : null
        )}
        </section>
        <PaginationComponent postsLength={posts.length} postsPerPage={postsPerPage} paginate={paginate} />
      </main>
    </>
  );
}
export default HomePage;