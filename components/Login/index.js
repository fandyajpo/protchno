import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [data, setData] = React.useState("");

  const onSubmit = async (data) => {
    const body = {
      grant_type: "password",
      client_secret: "0a40f69db4e5fd2f4ac65a090f31b823",
      client_id: "e78869f77986684a",
      username: data.username || "",
      password: data.password || "",
    };

    await fetch("api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col justify-center items-center gap-y-4"
      >
        <p className="text-center text-3xl text-red-500 font-bold">
          TechnoPartner
        </p>
        <div>
          <p className="text-center">Username</p>
          <input
            {...register("username", { required: true })}
            className="border p-2 rounded-md"
          />
          {errors.username && <span>This field is required</span>}
        </div>
        <div>
          <p className="text-center">Password</p>
          <input
            {...register("password", { required: true })}
            className="border p-2 rounded-md"
          />

          {errors.password && <span>This field is required</span>}
        </div>

        <div>
          <input
            type="submit"
            className="p-2 bg-white rounded-md border-2 w-52"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
