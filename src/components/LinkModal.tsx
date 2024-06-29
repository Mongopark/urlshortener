import { toast } from 'react-toastify';

const LinkModal = (props: { link: string; onClose: () => void }) => {

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast(`Link ${text} copied to clipboard!`, { type: 'info' });
      },
      (err) => {
        toast(`Could not copy link ${text}: ${err}`, { type: 'error' });
      }
    );
  };

  return (
    <>
      <input type="checkbox" id="my_modal_8" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <i className='bg-primarylight rounded rounded-[30px] p-2 py-3 md:p-3 md:py-5' onClick={() => copyToClipboard(props.link)}>
            <i className="fas fa-link bg-[skyblue] rounded rounded-[20px] p-2 md:p-3 text-primary"></i>
          </i>
          <h3 className="text-lg font-bold mb-4 md:mb-10 text-sm md:text-[20px] pt-4">View full URL</h3>
          Share Link
          <div className="flex mb-3">
            <label className='modal-backdrop text-[10px] md:text-sm rounded-[8px] border text-black w-5/6 md:w-5/6 border-grey border-[3px] items-center'>
              {props.link}
            </label>
            <button className='p-3 text-[10px] md:text-sm w-1/6 md:w-1/6' onClick={() => copyToClipboard(props.link)}>
              <i className='far fa-clone'></i>
            </button>
          </div>
          <div className="flex flex-col md:flex-row flex-col-reverse mt-3 justify-between">
            <label
              className="mt-2 md:mt-0 text-black text-[10px] md:text-sm hover:bg-pink w-full md:h-12 h-10 md:w-5/12 border-grey border-[3px] text-center rounded-[8px] cursor-pointer flex items-center justify-center"
              onClick={props.onClose}
            >
              <span>Cancel</span>
            </label>
            <button className='btn bg-primary hover:bg-primarylight text-white text-[10px] md:text-sm w-full md:w-5/12' onClick={props.onClose}>
              Done
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_8" onClick={props.onClose}>Close</label>
      </div>
    </>
  );
};

export default LinkModal;
