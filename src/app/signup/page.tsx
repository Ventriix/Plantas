"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SubmitHandler, useForm } from "react-hook-form";
import signUp from "@/firebase/auth/signup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import login from "@/firebase/auth/login";
import getMessageFromCode from "@/firebase/errorConverter";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function AddPlant() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const result = await signUp(data.email, data.password);

    if (!result.error) {
      const loginResult = await login(data.email, data.password);

      if (!loginResult.error) {
        router.push("/");
      } else {
        setError(getMessageFromCode(loginResult.error!.toString())!);
      }
    } else {
      setError(getMessageFromCode(result.error!.toString())!);
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <main>
        <h1 className="title">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="inputContainer">
            {error.length > 0 && <span>{error}</span>}
            {errors.email && <span>{errors.email.message}</span>}
            <input
              {...register("email", {
                required: "This field is required",
                validate: (val: string) => {
                  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val)) {
                    return "Must be an email address";
                  }

                  return true;
                },
              })}
              type="email"
              onChange={() => {
                setError("");
              }}
              className="textField"
              placeholder="E-Mail address"
            />
          </div>
          <div className="inputContainer">
            {errors.password && <span>{errors.password.message}</span>}
            <input
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum 20 characters",
                },
              })}
              type="password"
              className="textField"
              placeholder="Password"
            />
          </div>
          <div className="inputContainer">
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
            <input
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (val: string) => {
                  if (watch("password") !== val) {
                    return "Passwords do not match";
                  }

                  return true;
                },
              })}
              type="password"
              className="textField"
              placeholder="Confirm password"
            />
          </div>
          <button
            type="submit"
            className="btn btnAccentGreen"
            disabled={loading}
          >
            {loading ? "Signing Up" : "Sign Up"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
