import React, { useState } from 'react';
type AddPostProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>,title:string, body:string) => void;
};

const AddPostComponent: React.FC<AddPostProps> = ({ handleSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e,title, body); 
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleFormSubmit} className='flex justify-center items-center w-full px-4 mb-2'>
      <div className="my-0 relative rounded-2xl w-full items-center justify-between bg-black py-2 shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4" data-twe-navbar-ref>
        <div className="w-full my-4 items-center justify-between px-3">
          <input
            type="text"
            className="peer mx-10 bg-gray-800 border-gray-800 w-3/12 block rounded border-2 bg-transparent px-3 leading-[2.15] outline-none"
            id="inputSearch"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full items-center justify-between px-3">
          <input
            type="text"
            className="peer mx-10 bg-gray-800 border-gray-800 h-20 w-11/12 block rounded border-2 bg-transparent px-3 outline-none"
            id="inputSearch"
            placeholder="Cuerpo"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="flex my-4 justify-end items-center w-full px-7">
          <button
            type="submit"
            className="button-submit inline-block w-1/12 rounded bg-primary mx-10 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            data-twe-ripple-init
            data-twe-ripple-color="light">
            Publicar
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddPostComponent;