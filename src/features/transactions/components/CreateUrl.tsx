import { initialLoginFieldState, registerFields } from '../model/fields.ts';
import { registerValidator } from '../../auth/model/validators.ts';
import { useFormik } from 'formik';
import { AuthRequest } from '../../auth/model/index.ts';
import { Link } from 'react-router-dom';
import { useAuthAction } from '../../auth/slice/index.ts';

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
      <div className="p-5">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col md:gap-5 gap-3">
          {fields.map((field) => (
            <label key={field.id} className="form-control">
              <span className="label label-text">{field.label}</span>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                className={`w-full input input-bordered flex items-center gap-2 ${
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
          disabled={loading}
        >                
        <Link className="btn btn-sm text-white btn-ghost text-xs lg:text-sm" to="/home">
            Shorten URL
          </Link> {loading && <span className="loading loading-spinner"></span>}
        </button>
      </form>
      </div>
    </section>
  );
}
