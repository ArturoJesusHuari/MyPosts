'use client'
import React from 'react';
import { useState, useEffect } from 'react'
import Avatar from "./src/avatar.png"
import Image from "next/image"; 
import Editar from './src/boton-editar.png'
import Borrar from './src/borrar.png'
import { Post } from '@/types/interfaces';

interface MyPostComponentProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

const MyPostComponent: React.FC<MyPostComponentProps> = ({ post, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.body);

  const handleEdit = () => {
    const updatedPost: Post = {
      id: post.id,
      title: newTitle,
      body: newContent,
    };
    onEdit(updatedPost);
    setShowModal(false);
  };

  return (
    <article className='rounded-2xl bg-black my-2 justify-start items-start w-full'>
      <div className='mx-8 my-8'>
        <div className='flex justify-between'>
          <div className='flex'>
            <Image className="mx-4 my-6" height={40} src={Avatar} alt="Avatar" />
            <div className='items-center content-center'>
              <p className='text-xl'><b>{post ? post.username : 'Loading...'}</b></p>
              <p className='text-xs'>{post ? post.email : 'Loading...'}</p>
            </div>
          </div>
          <div className='flex items-end'>
            <button onClick={() => setShowModal(true)}>
              <Image className="mx-4 my-6 w-5 h-5" src={Editar} alt="Editar" />
            </button>
            <button onClick={() => onDelete(post.id)}>
              <Image className="mx-4 my-6 w-5 h-5" src={Borrar} alt="Borrar" />
            </button>
          </div>
        </div>
        <p className='text-2xl'>{post.title}</p>
        <p>{post.body}</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-11/12 max-w-md">
            <span className="absolute top-2 right-2 cursor-pointer text-2xl font-bold" onClick={() => setShowModal(false)}>&times;</span>
            <h2 className="text-xl mb-4">Editar Publicación</h2>
            <form onSubmit={(e) => { e.preventDefault();handleEdit()}}>
              <div className="mb-4">
                <label className="block text-white ">Title:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-gray-900 text-white px-3 py-2 border-0 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className=" text-white">Content:</label>
                <input
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full text-justify bg-gray-900 text-white px-3 py-2 border-0 rounded-lg"
                ></input>
              </div>
              <button type="submit" className="text-white bg-orange-600 px-4 py-2 rounded-lg">Editar</button>
            </form>
          </div>
        </div>
      )}
    </article>
  );
}
export default MyPostComponent;