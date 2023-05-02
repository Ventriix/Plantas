"use client";

import { Plant } from "@/types";
import Image from "next/image";
import { useState } from "react";
import {
  AcademicCapIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import useCountdown from "@/hooks/useCountdown";
import deleteDocument from "@/firebase/firestore/deleteDocument";
import { useRouter } from "next/navigation";
import styles from "./PlantCard.module.scss";

export default function PlantCard({
  plant,
  addSearchTag,
}: {
  plant: Plant;
  addSearchTag: any;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { days, hours, minutes, seconds } = useCountdown(
    new Date(plant.metadata.next_watering)
  );
  const router = useRouter();

  function NextImage() {
    setSelectedImage(
      selectedImage + 1 > plant.images.length - 1 ? 0 : selectedImage + 1
    );
  }

  async function DeletePlant() {
    await deleteDocument("user_plants", plant.id);
  }

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`btn btnAccentRed btnRound ${styles.trashIcon}`}
        onClick={DeletePlant}
      >
        <TrashIcon className="smallIcon" />
      </button>
      <button
        type="button"
        className={`btn btnPrimary btnRound ${styles.editIcon}`}
        onClick={() => {
          router.push("/");
        }}
      >
        <PencilIcon className="smallIcon" />
      </button>
      <Image
        src={plant.images[selectedImage]}
        alt={`Plant Image ${selectedImage + 1}`}
        width={800}
        height={800}
        className={styles.image}
      />
      <div className={styles.innerCard}>
        <p className={styles.name}>{plant.name}</p>
        <p className={styles.description}>{plant.description}</p>
        <div className={styles.timerContainer}>
          <AcademicCapIcon className="smallIcon" />
          <div className={styles.timerTextContainer}>
            <span
              className={
                days === "00" &&
                hours === "00" &&
                minutes === "00" &&
                seconds === "00"
                  ? styles.timerExpired
                  : ""
              }
            >{`${days}:${hours}:${minutes}:${seconds}`}</span>
            <p>{new Date(plant.metadata.next_watering).toLocaleString()}</p>
          </div>
        </div>
        <ul>
          {plant.metadata.tags.map((tag) => (
            <li key={tag}>
              <button
                type="button"
                className={`btn btnAccentGreen ${styles.tagButton}`}
                onClick={() => addSearchTag(tag)}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
