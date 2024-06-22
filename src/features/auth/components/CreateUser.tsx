import { initialLoginFieldState, registerFields } from '../model/fields.ts';
import { registerValidator } from '../model/validators.ts';
import { useFormik } from 'formik';
import { AuthRequest } from '../model';
import { Link } from 'react-router-dom';
import { useAuthAction } from '../slice';
import {
  useLoginMutation, useRegisterMutation
} from '../../../app/api';

export default function AdminForm(props: {toggleRegister: ()=>void;}) {
  const fields = registerFields;

  const { authenticate, loading } = useAuthAction();

  const formik = useFormik<AuthRequest>({
    initialValues: initialLoginFieldState,
    validationSchema: registerValidator,
    onSubmit: (values) => authenticate(values)
  });

  return (
    <section>
      <div className="border border-grey-300 p-5 rounded-[10px]">
      <h1 className="text-2xl font-bold text-center mt-4-text md:text-2xl text-sm">Create an Account</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col md:gap-5 gap-3">
          {fields.map((field) => (
            <label key={field.id} className="form-control">
              <span className="label label-text md:text-sm text-[12px]">{field.label}</span>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                className={`w-full input input-bordered flex items-center gap-2-text md:text-sm text-[12px] ${
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
          // disabled={loading || !(formik.isValid && formik.dirty)}
          disabled={loading}
        >                
        <Link className="btn btn-sm btn-ghost text-white text-xs md:text-sm" to="/home">
            Create Account
          </Link> {loading && <span className="loading loading-spinner"></span>}
        </button>  
        <p className="text-center text-[#808080] mb-1 lg:mb-[0.75rem] pt-5 md:text-sm text-[10px]">Already have an account?<span className="text-center text-primary mb-1 lg:mb-[0.75rem] cursor-pointer md:text-sm text-[10px]" onClick={()=>props.toggleRegister()}> Login Here</span></p>
      </form>
      </div>
    </section>
  );
}
