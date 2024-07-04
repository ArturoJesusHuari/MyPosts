type Post = {
  userId: string;
  id: string;
  title: string;
  body: string;
};
interface SortByComponentProps {
  sortByStringField: (field: keyof Post) => void;
}
const SortByComponent: React.FC<SortByComponentProps> = ({ sortByStringField }) => {
  return (
    <div className='w-full flex items-center px-4'>
      <div className='w-8/12 border-b-2 border-lime-100'></div>
      <p className='mx-4'>Ordenar por:</p>
      <button 
        onClick={() => sortByStringField('title')}
        className='text-white hover:text-sky-800 mx-2'
      >
        Título
      </button>
      <button 
        onClick={() => sortByStringField('body')}
        className='text-white hover:text-sky-800 mx-2'
      >
        Contenido
      </button>
    </div>
  );
}

export default SortByComponent;