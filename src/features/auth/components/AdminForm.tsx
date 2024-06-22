import React, { useState, useEffect } from 'react';
import { initialLoginFieldState, loginFields } from '../model/fields.ts';
import { loginValidator } from '../model/validators.ts';
import { useFormik } from 'formik';
import { AuthRequest } from '../model';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthAction } from '../slice';
import {
  useLoginMutation
} from '../../../app/api';
import { saveToken, setUserAuthenticated } from '../slice';
import { useAppDispatch } from '../../../hooks';
import { useGetUsersQuery } from '../../../app/api';
import Alert from '../../../components/Alert.tsx';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

export default function AdminForm(props: {toggleRegister: ()=>void;}) {
  const dispatch = useAppDispatch();
  const fields = loginFields;
  const [dialog, setDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function
  const [
    login,
    {
      data: loginIsData,
      isLoading: loginIsLoading,
      isError: loginIsError,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginMutation();  
  // Destructure the result and specify the type
  const allUsers: any = useGetUsersQuery<any>();
  //  const [userWallet, { data, isLoading, isError }] = useUserWalletQuery<any>();
  const { data: usersData, isLoading: userDataIsLoading, isError: userDataIsError, isSuccess: userDataIsSuccess, refetch: userDataRefetch } = allUsers;
 
  

  const { authenticate, loading } = useAuthAction();

  const formik = useFormik<AuthRequest>({
    initialValues: initialLoginFieldState,
    validationSchema: loginValidator,
    onSubmit: (values) => authenticate(values)
  });

  const toggleDialog = () => {
    setDialog(!dialog);
  };

  const loginUser = async () => {
    try {
      const response: any = await login({
        email: formik.values.email,
        password: formik.values.password
      });
      if (response?.data?.status !== 'success') {
        // setMessage(response?.data?.message);
        setType('failure');
        setMessage('The credentials you entered are incorrect. Please try again or reset your password.');
        setDialog(true); // Update error message state
      } else if (response?.data?.status === 'success') {
        dispatch(setUserAuthenticated(true));
        dispatch(saveToken(response?.data?.token));
      setType('success');
      setMessage('Login Successful');
      setDialog(true); // Update error message state
      navigate('/home'); // Navigate to /home on success
      toast(response.message, {
        type: 'success'
      });
      } else {
        setType('failure');
      setMessage('Something went wrong, please try again');
      setDialog(true);
      }
    } catch (error) {
      setType('failure');
      setMessage('Check your internet and try again, there should be a problem with your internet connection');
      setDialog(true);
      console.error('Error Logging in:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userDataIsSuccess) {
          console.log('Fetched user data:', usersData);
        } else if (userDataIsLoading) {
          console.log('Loading user data...');
        } else if (userDataIsError) {
          console.log('Error fetching user data');
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    fetchData();
  }, [userDataIsSuccess, userDataIsLoading, userDataIsError, usersData]);

  


  return (
    <section className="border border-grey-300 p-5 rounded-[10px]">
      <Alert type={type} text={message} dialog={dialog} setDialog={toggleDialog} />      
      <ToastContainer />
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
          disabled={loginIsLoading}
          onClick={loginUser}
        >
          <Link className="btn btn-sm btn-ghost text-white text-xs md:text-sm" to="/home">
            Log In
          </Link> {loading && <span className="loading loading-spinner"></span>}
        </button>
      </form>
      <p className="text-center text-[#808080] my-5 lg:mb-[0.75rem] md:text-sm text-[10px]">Dont have an account?<span className="text-center text-primary lg:mb-[3.75rem] cursor-pointer md:text-sm text-[10px]" onClick={()=>props.toggleRegister()}> Sign Up</span></p>
    </section>
  );
}
