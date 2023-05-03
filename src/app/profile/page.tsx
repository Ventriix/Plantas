"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import deletePlantIcons from "@/firebase/storage/deletePlantIcons";
import getMessageFromCode from "@/firebase/errorConverter";
import deleteLoggedInUser from "@/firebase/auth/deleteLoggedInUser";
import logout from "@/firebase/auth/logout";
import queryDocumentsWhere from "@/firebase/firestore/queryDocuments";
import deleteDocument from "@/firebase/firestore/deleteDocument";

type Inputs = {
  email: string;
  confirm: string;
};

export default function AddPlant() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useAuthContext();

  const onSubmit: SubmitHandler<Inputs> = async () => {
    setLoading(true);
    const filesResult = await deletePlantIcons(`/user_plants/${user!.uid}`);

    if (!filesResult.error) {
      const firestoreQueryResult = await queryDocumentsWhere(
        "user_plants",
        "owning_user",
        user!.uid
      );

      if (!firestoreQueryResult.error) {
        firestoreQueryResult.result!.docs.forEach((doc) => {
          deleteDocument("user_plants", doc.id);
        });

        const userResult = await deleteLoggedInUser();

        if (!userResult.error) {
          await logout();
          router.push("/");
        } else {
          setError(getMessageFromCode(userResult.error!.toString())!);
        }
      } else {
        setError("Error while deleting your data");
      }
    } else {
      setError("Error while deleting your data");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <h1 className="title">Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="inputContainer">
            {error.length > 0 && <span>{error}</span>}
            {errors.email && <span>{errors.email.message}</span>}
            <input
              {...register("email", {
                required: "This field is required",
                validate: (val: string) => {
                  if (val !== user!.email) {
                    return "Incorrect email address";
                  }

                  return true;
                },
              })}
              className="textField"
              placeholder="Enter your email here to delete account"
            />
          </div>
          <div className="inputContainer">
            {errors.confirm && <span>{errors.confirm.message}</span>}
            <input
              {...register("confirm", {
                required: "This field is required",
                validate: (val: string) => {
                  if (val !== "delete") {
                    return "Please confirm by typing 'delete' here";
                  }

                  return true;
                },
              })}
              className="textField"
              placeholder="Type 'delete' here"
            />
          </div>
          <button type="submit" className="btn btnAccentRed" disabled={loading}>
            {loading ? "Deleting" : "Confirm Delete Account"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
