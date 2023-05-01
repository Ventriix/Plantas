"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SubmitHandler, useForm } from "react-hook-form";
import login from "@/firebase/auth/login";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

export default function AddPlant() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const { result, error } = await login(data.email, data.password);
    setLoading(false);

    if (!error) {
      router.push("/");
    }
  };

  return (
    <>
      <Header />
      <main>
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="inputContainer">
            {errors.email && <span>This field is required</span>}
            <input
              {...register("email", { required: true })}
              className="textField"
              type="email"
              placeholder="E-Mail address"
            />
          </div>
          <div className="inputContainer">
            {errors.password && <span>This field is required</span>}
            <input
              {...register("password", { required: true })}
              className="textField"
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="btn btnAccentGreen"
            disabled={loading}
          >
            {loading ? "Logging in" : "Login"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
