import { useState } from 'react';
import ComponentHeader from './components/ComponentHeader.tsx';
import TableHeader from './components/TableHeader.tsx';
import SingleUser from './components/SingleTransaction.tsx';
import { ItemProps} from './model/type.ts';
import data from './model/TransactionsData.ts';
import Pagination, { PaginationMobile } from './components/Pagination.tsx';
import useBreakpoint from '../../hooks/useBreakpoint.ts';
import CreateUrl from './components/CreateUrl.tsx';
import Header from './components/Header.tsx';



export default function TransactionsScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // Set the number of items per page
  const isMobile = useBreakpoint('md').isBelowMd;  

  
  // Calculate the indexes of the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const [showRegister, setShowRegister] = useState(false);

  const toggleRegister = () => {
    setShowRegister(prevState => !prevState);
  };


  return (
    <div>
      <Header title='PLACEHOLDER'/>
      <div className='ms-1 md:ms-3 md:mt-5 mt-3'>
    <ComponentHeader title='Shorten URL'/>
    </div>  
    <div className="md:w-[30%] rounded-[10px] md:px-0 bg-white">
          <div className="w-full">            
              <CreateUrl toggleRegister={toggleRegister} />
          </div>
        </div>

      {/* Table */}
      <div className="flex flex-col m-3 md:m-5" > 
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="w-full divide-y bg-[#EEEAF2] divide-gray-200">
                <TableHeader />           
                <tbody className="bg-white divide-y divide-white-400 text-sm font-semibold">
                  {currentItems.map((item: ItemProps, index: number) => (
                    <SingleUser item={item} index={index} key={item.id} />  
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


      {/* Pagination Controls */}
      {isMobile?<div className="flex justify-end m-5" style={{marginTop: isMobile?"10px":"70px"}}>
        <PaginationMobile data={data} currentPage={currentPage} setCurrentPage={setCurrentPage}/></div>
        :<div className="flex justify-end m-5" style={{marginTop: isMobile?"10px":"70px"}}>
        <Pagination data={data} currentPage={currentPage} setCurrentPage={setCurrentPage}/></div>}
    </div>
  );
}
