"use client"
import React, { useState} from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [login, setLogin] = useState(true);

  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(credentials)
    axios.post("http://localhost:4000/login", {
      username: credentials.username
    })
    .then(function (response) {
      const token = response.data.token
      localStorage.setItem('token', token);
      setLogin(true);
      router.push('/home')
    })
    .catch(function (error) {
      console.log(error);
      setLogin(false);
    });
  };

  return (
<section className="h-screen">
  <div className="container h-full px-6 py-24">
    <div
      className="flex h-full flex-wrap items-center justify-center lg:justify-between">
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
        <h1 className="mb-12 mt-1 pb-1 text-8xl font-semibold">MY POSTS</h1>
        <h3 className="mb-12 mt-1 pb-1 text-xl">Realiza publicaciones, mira las publicaciones de otros y comenta.</h3>
      </div>

      <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
      <form onSubmit={handleSubmit}>
        <div className="relative mb-6" data-twe-input-wrapper-init>
          <input
            type="text"
            className="peer block min-h-[auto] w-full border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pt-[1.15rem] [&:not(:placeholder-shown)]:leading-[1.15] [&:not(:placeholder-shown)]:border-b-2 dark:[&:not(:placeholder-shown)]:border-white"
            id="exampleFormControlInput3"
            placeholder="Username"
            name="username"
            required
            onChange={handleChange} />
        </div>
        <div className="relative mb-6" data-twe-input-wrapper-init>
          <input
            type="password"
            className="peer block min-h-[auto] w-full border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pt-[1.15rem] [&:not(:placeholder-shown)]:leading-[1.15] [&:not(:placeholder-shown)]:border-b-2 dark:[&:not(:placeholder-shown)]:border-white"
            id="exampleFormControlInput33"
            placeholder="Password"
            name="password"
            required
            onChange={handleChange} />
        </div>
        {login == false?(
          <h3 className="text-red-600 mb-6">Usuario incorrecto</h3>
        ):(<div></div>)}
        <div className="flex justify-center items-center w-full">
          <button
            type="submit"
            className="button-submit inline-block w-1/2 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            data-twe-ripple-init
            data-twe-ripple-color="light">
            Login
          </button>
        </div>
      </form>
      </div>
    </div>
  </div>
</section>
  );
}
export default LoginPage;