import { initialLoginFieldState, registerFields } from '../model/fields.ts';
import { registerValidator } from '../../auth/model/validators.ts';
import { useFormik } from 'formik';
import { AuthRequest } from '../../auth/model/index.ts';
import { useAuthAction } from '../../auth/slice/index.ts';
import { useUrlShortnerMutation } from '../../../app/api';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../app/store';


export default function CreateUrl(props: {toggleRegister: ()=>void;}) {
  const fields = registerFields;
    const { authenticate } = useAuthAction();
    const currentUserId = useAppSelector((state: RootState) => state.auth.userId);
  const [ urlShortner,
    {
      isLoading: shortenIsLoading,}
    ] = useUrlShortnerMutation();

  const formik = useFormik<AuthRequest>({
    initialValues: initialLoginFieldState,
    validationSchema: registerValidator,
    onSubmit: (values) => authenticate(values)
  });


  
  


  const handleShorten = async () => {
    try {
      const response: any = await urlShortner({
        name: formik.values.username,
      original: formik.values.web,
      description: formik.values.text,
      user_id: currentUserId
    });
    if (formik.values.username === "" || formik.values.web === "" || formik.values.text === "" || currentUserId === "" ) {
      // Handle error
        toast('input all fields and try again', { type: 'error' });
    } else if (response?.error) {
        toast(response?.error?.data?.message, { type: 'error' });
      } else {
        // URL shortened successfully
        toast(response?.data?.message || 'something went wrong, please try again', { type: response?.data?.status==='success' ? 'success' : 'info' });
                  formik.resetForm();
      }
    } catch (error) {
      // Handle error
        toast(`Error shortening URL:${error ? 'input all fields and try again' : 'an error occured, please check your internet and try again'}`, { type: 'error' });
        console.log(error);
    }
  };

  return (
    <section>      
      <div className="p-5">
      <form>
        <div className="flex flex-col md:gap-5 gap-3">
          {fields.map((field) => (
            <label key={field.id} className="form-control">
              <span className="label label-text md:text-sm text-[12px]">{field.label}</span>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                className={`w-full input input-bordered flex items-center gap-2 md:text-sm text-[12px] ${
                  formik.touched[field.id] && formik.errors[field.id] && 'input-error'
                }`}
                value={formik.values[field.id]}
                onChange={formik.handleChange}
              />
              {formik.touched[field.id] && formik.errors[field.id] ? (
                <span className="label label-text-alt">{formik.errors[field.id]}</span>
              ) : null}
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-8 w-full"
          disabled={shortenIsLoading}
          onClick={(handleShorten)}
        >                
        <div className="btn btn-sm text-white btn-ghost text-xs md:text-sm">
            Shorten URL
          </div> {shortenIsLoading && <span className="loading loading-spinner"></span>}
        </button>
      </form>
      </div>
    </section>
  );
}
