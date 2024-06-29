import useBreakpoint from '../../../hooks/useBreakpoint.ts';





export interface CardProps {
    title?: string;
  }

export default function Header({
    title,
  }: CardProps) {
    const isMobile = useBreakpoint('md').isBelowMd;  
  
 


  return (
    <div className="font-medium bg-primary flex justify-between md:text-2xl text-sm p-5">
        <h1 className='text-white md:ms-10 ms-2'>{title}</h1>
    <h1 className='md:me-10 me-1'>
      <span className="px-2 py-1 h-full md:px-3 md:py-2 rounded font-semibold disabled:opacity-50 bg-other mx-2 far fa-search text-white"></span>
      {!isMobile&&<span className="px-2 py-1 h-full md:px-3 md:py-2 rounded font-semibold disabled:opacity-50 bg-other me-2 far fa-bell text-white"></span>}
      <label className="px-2 py-1 h-full md:px-3 md:py-2 rounded font-semibold disabled:opacity-50 bg-other me-2 far fa-sign-out-alt text-white" htmlFor="my_modal_7" onClick={()=>{}}></label>
      {!isMobile&&<span className="px-5 md:px-5 md:py-1 rounded rounded-5 font-semibold disabled:opacity-50 mx-2 bg-white rounded-full"></span>}
      </h1>
    </div>
  );
}
