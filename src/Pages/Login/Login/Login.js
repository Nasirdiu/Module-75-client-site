import React, { useEffect } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../../Share/Loading/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import useToken from "../../../hooks/useToken";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  //email sing in
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  //google sing in
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [sendPasswordResetEmail, sending, restError] =
    useSendPasswordResetEmail(auth);
  //use token
  const [token] = useToken(user || gUser);

  let singInError;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);
  //loading
  if (loading || gLoading) {
    return <Loading></Loading>;
  }
  //error
  if (error || gError || restError) {
    singInError = (
      <p className="text-red-700">
        {error?.message || gError?.message || restError?.message}
      </p>
    );
  }
  //user

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  //resetPassword
  const resetPassword = async () => {
    const email = getValues("email");
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Send Mail");
    } else {
      toast("Enter Your Mail Address");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid Email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-600">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-600">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your Password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is Required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 carater longer",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-600">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {singInError}
            <p>
              <small>
                <Link onClick={resetPassword} to="">
                  Forgot Password ?
                </Link>
              </small>
            </p>

            <input
              className="btn w-full max-w-xs text-white my-4"
              type="submit"
              value="Login "
            />
          </form>

          <p>
            <small>
              New to Doctors Portal?
              <Link to="/singUp" className="text-secondary">
                Create new account
              </Link>
            </small>
          </p>

          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline"
          >
            Continue with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
