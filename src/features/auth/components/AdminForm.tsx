import { initialLoginFieldState, loginFields } from '../model/fields.ts';
import { loginValidator } from '../model/validators.ts';
import { useFormik } from 'formik';
import { AuthRequest } from '../model';
import { Link } from 'react-router-dom';
import { useAuthAction } from '../slice';

export default function AdminForm(props: {toggleRegister: ()=>void;}) {
  const fields = loginFields;

  const { authenticate, loading } = useAuthAction();

  const formik = useFormik<AuthRequest>({
    initialValues: initialLoginFieldState,
    validationSchema: loginValidator,
    onSubmit: (values) => authenticate(values)
  });

  return (
    <section className="border border-grey-300 p-5 rounded-[10px]">
      <h1 className="text-2xl font-bold text-center mt-4 md:text-2xl text-sm">Log In</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col md:gap-5 gap-3">
          {fields.map((field) => (
            <label key={field.id} className="form-control">
              <span className="label label-text md:text-sm text-[12px]">{field.label}</span>
              <div className="relative">
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    className={`w-full input input-bordered pr-10 md:text-sm text-[12px] ${
                      formik.touched[field.id] && formik.errors[field.id] && 'input-error'
                    }`}
                    value={formik.values[field.id]}
                    onChange={formik.handleChange}
                  />
                  <i className={`fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}></i>
                </div>
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
          <Link className="btn btn-sm btn-ghost text-white text-xs lg:text-sm" to="/home">
            Log In
          </Link> {loading && <span className="loading loading-spinner"></span>}
        </button>
      </form>
      <p className="text-center text-[#808080] my-5 lg:mb-[0.75rem] md:text-sm text-[10px]">Dont have an account?<span className="text-center text-primary lg:mb-[3.75rem] cursor-pointer md:text-sm text-[10px]" onClick={()=>props.toggleRegister()}> Sign Up</span></p>
    </section>
  );
}
