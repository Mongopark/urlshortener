import { ItemProps} from '../model/type';
import Arrow from '../../../assets/images/arrow.tsx';
import ArrowBack from '../../../assets/images/arrowBack.tsx';
import { useState } from 'react';


export interface DataProps {
    data: ItemProps[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
  }

export default function Pagination({
    data, currentPage, setCurrentPage
  }: DataProps) {
    const [itemsPerPage] = useState(7); // Set the number of items per page
    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  
  


  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
    <button
      onClick={() => paginate(1)}
      disabled={currentPage === 1}
      className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-1 border-gray-300 rounded font-semibold flex items-center"
    >
      <ArrowBack color="black"/><ArrowBack color="black"/>
    </button>
    <button
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
      className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-1 border-gray-300 rounded font-semibold"
    >
      <ArrowBack color="black"/>
    </button>
    <button
      onClick={() => paginate(currentPage)}
      className={`mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-4 bg-primary border-primary text-white text-[10px] md:text-sm rounded`}
    >
      {currentPage}
    </button>

    
    {currentPage + 1 > totalPages?<></>:<button
      onClick={() => paginate(currentPage+1)}
      disabled={currentPage + 1 > totalPages}
      className={`mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-1 border-gray-300 rounded text-[10px] md:text-sm font-semibold`}
    >
      {currentPage+1}
    </button>}


    <button
      className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-1 border-gray-300 rounded text-[10px] md:text-sm font-semibold"
    >
      {currentPage === totalPages?"end":"..."}
    </button>


    {currentPage + 19 > totalPages?(currentPage + 9 > totalPages?<></>:<button
      onClick={() => paginate(currentPage + 9)}
      disabled={currentPage + 9 > totalPages}
      className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-1 border-gray-300 rounded text-[10px] md:text-sm font-semibold"
    >
    {currentPage + 9}
  </button>):<button
      onClick={() => paginate(currentPage + 19)}
      disabled={currentPage + 19 > totalPages}
      className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-1 border-gray-300 rounded text-[10px] md:text-sm font-semibold"
    >
    {currentPage + 19}
  </button>}


    {currentPage + 20 > totalPages?(currentPage + 10 > totalPages?<></>:<button
      onClick={() => paginate(currentPage + 10)}
      disabled={currentPage + 10 > totalPages}
      className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-1 border-gray-300 rounded text-[10px] md:text-sm font-semibold"
    >
      {currentPage + 10}
    </button>):
    <button
      onClick={() => paginate(currentPage + 20)}
      disabled={currentPage + 20 > totalPages}
      className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-1 border-gray-300 rounded text-[10px] md:text-sm font-semibold"
    >
      {currentPage + 20}
    </button>}


    {currentPage === totalPages?<></>:<button
      onClick={() => paginate(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-1 border-gray-300 rounded font-semibold"
    >
      <Arrow color="black"/>
    </button>}
    {currentPage === totalPages?<></>:<button
      onClick={() => paginate(totalPages)}
      disabled={currentPage === totalPages}
      className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-1 border-gray-300 rounded font-semibold flex items-center"
    >
      <Arrow color="black"/><Arrow color="black"/>
    </button>}
  </>
  );
}



export function PaginationMobile({
  data, currentPage, setCurrentPage
}: DataProps) {
  const [itemsPerPage] = useState(7); // Set the number of items per page
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='flex justify-between items-center w-full'>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 h-full md:px-3 md:py-2 border border-gray-300 rounded font-semibold disabled:opacity-50"
      >
        <ArrowBack color="black" />
      </button>
      <text className='text-[11px]'>Page {currentPage} of {totalPages}</text>
            
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 md:px-3 h-full md:py-2 border border-gray-300 rounded font-semibold disabled:opacity-50"
        >
          <Arrow color="black" />
        </button>
    </div>
  );
}