import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  loginUser
} from "../../services/authService";

import {
  useAuth
} from "../../auth/AuthContext";


function LoginPage() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");


  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const response =
        await loginUser(
          email,
          password
        );

      login(
        response.access_token
      );

      toast.success(
        "Login Successful"
      );

      navigate("/");

    } catch (error) {

      console.error(error);

      toast.error(
        "Invalid Credentials"
      );
    }
  };


  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
    ">

      <div className="
        bg-white
        p-8
        rounded-lg
        shadow-md
        w-full
        max-w-md
      ">

        <h1 className="
          text-3xl
          font-bold
          mb-6
          text-center
        ">
          ERP Login
        </h1>


        <form
          onSubmit={handleLogin}
          className="
            flex
            flex-col
            gap-4
          "
        >

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              border
              p-3
              rounded
            "
            required
          />


          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              border
              p-3
              rounded
            "
            required
          />


          {/* BUTTON */}
          <button
            type="submit"
            className="
              bg-blue-600
              text-white
              py-3
              rounded
              hover:bg-blue-700
            "
          >
            Login
          </button>

        </form>


        {/* REGISTER LINK */}
        <p className="
          text-center
          mt-4
          text-gray-600
        ">

          Don't have an account?

          <Link
            to="/register"
            className="
              text-blue-600
              ml-1
              font-semibold
            "
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default LoginPage;