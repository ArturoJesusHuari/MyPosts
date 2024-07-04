interface PaginationComponentProps {
  paginate: (pageNumber: number) => void;
  postsLength: number;
  postsPerPage: number;
}
const PaginationComponent: React.FC<PaginationComponentProps> = ({postsLength,postsPerPage,paginate}) => {
  return(
    <div className="pagination mx-12 flex w-full justify-star items-center">
      {Array.from({ length: Math.ceil(postsLength / postsPerPage) }, (_, index) => (
      <button 
        className='w-9 px-1 mx-2 main-button bg-black my-2 justify-start items-start' 
        key={index} 
        onClick={() => paginate(index + 1)}>{index + 1}
      </button>
      ))}
    </div>
  );
}
export default PaginationComponent;