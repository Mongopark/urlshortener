import useBreakpoint from '../../../hooks/useBreakpoint.ts';
import { DataProps} from '../model/type.ts';



export default function SingleUser({item, index}: DataProps) {
    const isMobile = useBreakpoint('md').isBelowMd;  
    
  
 
// black #8F86D7 #98BCF1 #3D7C8D

  return (
    <tr key={index} className="border-b border-white w-full">
      {!isMobile&&<td className="py-5 pe-2 ps-2 whitespace-nowrap border-t-2 border-[#EEEAF2] text-[9px] sm:text-[11px] md:text-[13px]">{item?.name}</td>}
      {!isMobile&&<td className="py-2 pe-2 whitespace-nowrap border-t-2 border-[#EEEAF2] text-[#808080] text-[9px] sm:text-[11px] md:text-[13px]">{item?.description}</td>}
      <td className="py-2 pe-2 whitespace-nowrap border-t-2 border-[#EEEAF2] text-[#808080] text-[9px] sm:text-[11px] md:text-[13px]">{item?.urlLink}</td>
      <td className="py-2 pe-2 whitespace-nowrap cursor-pointer border-t-2 border-[#EEEAF2] text-[#808080] text-[9px] sm:text-[11px] md:text-[13px]"><div onClick={()=>console.log('done')}>{item?.more}</div></td>
    </tr>
  );
}