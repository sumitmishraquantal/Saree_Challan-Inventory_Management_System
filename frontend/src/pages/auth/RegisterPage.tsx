import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  registerUser
} from "../../services/registerService";


function RegisterPage() {

  const navigate =
    useNavigate();


  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

      role: "operator"
    });


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await registerUser(
        formData
      );

      toast.success(
        "Registration Successful"
      );

      navigate("/login");

    } catch (error) {

      console.error(error);

      toast.error(
        "Registration Failed"
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
          ERP Registration
        </h1>


        <form
          onSubmit={handleSubmit}
          className="
            flex
            flex-col
            gap-4
          "
        >

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="
              border
              p-3
              rounded
            "
            required
          />


          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="
              border
              p-3
              rounded
            "
            required
          />


          {/* ROLE */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="
              border
              p-3
              rounded
            "
          >

            <option value="operator">
              Operator
            </option>

            <option value="warehouse">
              Warehouse
            </option>

            <option value="accountant">
              Accountant
            </option>

            <option value="admin">
              Admin
            </option>

          </select>


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
            Register
          </button>

        </form>


        {/* LOGIN LINK */}
        <p className="
          text-center
          mt-4
          text-gray-600
        ">

          Already have an account?

          <Link
            to="/login"
            className="
              text-blue-600
              ml-1
              font-semibold
            "
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default RegisterPage;