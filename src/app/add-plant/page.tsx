"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./AddPlant.module.scss";

type Inputs = {
  name: string;
  description: string;
  days: number;
  hours: number;
  minutes: number;
};

export default function AddPlant() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [timespanError, setTimespanError] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const totalWateringSecs =
      data.days * 86400 + data.hours * 3600 + data.minutes * 60;

    if (totalWateringSecs < 3600) {
      setTimespanError(true);
    } else {
      setTimespanError(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <h1 className="title">Add New Plant</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="inputContainer">
            {errors.name && <span>This field is required</span>}
            <input
              {...register("name", { required: true })}
              className="textField"
              placeholder="Name"
            />
          </div>
          <div className="inputContainer">
            {errors.description && <span>This field is required</span>}
            <textarea
              {...register("description", { required: true })}
              className="textField"
              placeholder="Description (ex. Bedroom, Kitchen, Balcony)"
            />
          </div>
          <div className="inputContainer">
            <p>Water every:</p>
            {errors.days && <span>Days need to be between 0 and 359</span>}
            {errors.hours && <span>Hours need to be between 0 and 23</span>}
            {errors.minutes && <span>Minutes need to be between 0 and 59</span>}
            {timespanError && (
              <span>Watering interval needs to be atleast 1 hour long</span>
            )}
            <div className={styles.scheduleInputContainer}>
              <input
                type="number"
                min={0}
                max={359}
                {...register("days", { required: true, max: 359, min: 0 })}
                className="textField"
                placeholder="Days"
              />
              <input
                type="number"
                min={0}
                max={359}
                {...register("hours", { required: true, max: 23, min: 0 })}
                className="textField"
                placeholder="Hours"
              />
              <input
                type="number"
                min={0}
                max={359}
                {...register("minutes", { required: true, max: 59, min: 0 })}
                className="textField"
                placeholder="Mins"
              />
            </div>
          </div>
          <button type="submit" className="btn btnAccentGreen">
            Add Plant
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
