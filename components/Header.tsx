import Hogar from './src/hogar.png'
import Usuario from './src/usuario.png'
import LogOut from './src/logout.png'
import { useRouter } from 'next/navigation'

type HeaderComponentProps = {
  handleSearch: () => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({ handleSearch, setSearchTerm }) => {
  const router = useRouter()
  const logOut = () => {
    router.push('/')
    localStorage.removeItem('token')
  }
  return(
<header className='flex justify-center items-center w-full px-4'>
  <nav
    className="my-2 relative rounded-2xl flex w-full items-center justify-between bg-black py-2 shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
    data-twe-navbar-ref>
    <div className="flex w-full flex-wrap items-center justify-between px-3">
      <div className="flex items-center">
        <button
          className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-twe-collapse-init
          data-twe-target="#navbarSupportedContentY"
          aria-controls="navbarSupportedContentY"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span
            className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </span>
        </button>
      </div>

      <div
        className="!visible hidden grow basis-[100%] items-center text-center lg:!flex lg:basis-auto lg:text-left"
        id="navbarSupportedContentY"
        data-twe-collapse-item>
        <h3 className="mx-10 text-3xl">MY POSTS</h3>
        <input
            type="text"
            className="peer mx-10 bg-gray-800 border-gray-800 w-1/2 block rounded border-2 bg-transparent px-3 leading-[2.15] outline-none "
            id="inputSearch"
            placeholder="Buscar"
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        <button onClick={handleSearch}>Search</button>
        <button className='mx-10' onClick={() => {router.push('/home')}}><img className='h-6' src={Hogar.src} alt="" /></button>
        <button className='mx-0' onClick={() => {router.push('/profile')}}><img className='h-6' src={Usuario.src} alt="" /></button>
        <button className='mx-10' onClick={logOut}><img className='h-6' src={LogOut.src} alt="Log out" /></button>
      </div>
    </div>
  </nav>
</header>
  );
}
export default HeaderComponent;