"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SubmitHandler, useForm } from "react-hook-form";

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  return (
    <>
      <Header />
      <main>
        <h1 className="title">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="inputContainer">
            {errors.email && <span>This field is required</span>}
            <input
              {...register("email", { required: true })}
              className="textField"
              placeholder="E-Mail address"
            />
          </div>
          <div className="inputContainer">
            {errors.password && <span>This field is required</span>}
            <input
              {...register("password", { required: true })}
              className="textField"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btnAccentGreen">
            Sign Up
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
