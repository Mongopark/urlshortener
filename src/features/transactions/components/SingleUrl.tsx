import { useState } from 'react';
import useBreakpoint from '../../../hooks/useBreakpoint.ts';
import { DataProps } from '../model/type.ts';
import LinkModal from '../../../components/LinkModal.tsx';

export default function SingleUrl({ item, index }: DataProps) {
  const isMobile = useBreakpoint('md').isBelowMd;
  const [shortCode, setShortCode] = useState<string | undefined>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (short: string | undefined) => {
    setShortCode(short);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShortCode('');
  };

  return (
    <>
      <tr key={index} className="border-b border-white w-full">
        {!isMobile && (
          <td className="py-5 pe-2 ps-2 whitespace-nowrap border-t-2 border-[#EEEAF2] text-[9px] sm:text-[11px] md:text-[13px]">
            {item?.name}
          </td>
        )}
        {!isMobile && (
          <td className="py-2 pe-2 whitespace-nowrap border-t-2 border-[#EEEAF2] text-[#808080] text-[9px] sm:text-[11px] md:text-[13px]">
            {item?.description}
          </td>
        )}
        <td className="py-2 pe-2 whitespace-nowrap border-t-2 border-[#EEEAF2] text-[#808080] text-[9px] sm:text-[11px] md:text-[13px]">
          https://mongshort.vercel.app/{item?.short}
        </td>
        <td className="py-2 pe-2 whitespace-nowrap border-t-2 border-[#EEEAF2] text-[#808080] text-[9px] sm:text-[11px] md:text-[13px]">
          <label
            className="cursor-pointer"
            htmlFor="my_modal_8"
            onClick={() => {
              handleOpenModal(item?.short);
              console.log(item?.short);
            }}
          >
            <i className="fas fa-link"></i>
          </label>
        </td>
      </tr>
      {isModalOpen && (
        <LinkModal link={`https://mongshort.vercel.app/${shortCode}`} onClose={handleCloseModal} />
      )}
    </>
  );
}
