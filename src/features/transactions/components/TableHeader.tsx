import useBreakpoint from '../../../hooks/useBreakpoint.ts';

export default function TableHeader() {
    const isMobile = useBreakpoint('md').isBelowMd;  
  
  
 
// black #8F86D7 #98BCF1 #3D7C8D

  return (
    <thead className="">
    <tr>
    {!isMobile&&<th scope="col" className="text-left font-medium text-gray-500 tracking-wider text-[9px] sm:text-[12px] md:text-xs whitespace-nowrap ps-2 py-4">Name</th>}
    {!isMobile&&<th scope="col" className="text-left font-medium text-gray-500 tracking-wider text-[9px] sm:text-[12px] md:text-xs whitespace-nowrap">Description <i className='far fa-question-circle'></i></th>}
      <th scope="col" className="text-left font-medium text-gray-500 tracking-wider text-[9px] sm:text-[12px] md:text-xs pe-1 md:whitespace-nowrap md:py-4 py-2">Shortened Url</th>
      <th scope="col" className="text-left font-medium text-gray-500 tracking-wider text-[9px] sm:text-[12px] md:text-xs pe-1 md:whitespace-nowrap"></th>
    </tr>
  </thead>
  );
}
