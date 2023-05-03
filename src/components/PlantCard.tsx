"use client";

import { Plant } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import useCountdown from "@/hooks/useCountdown";
import deleteDocument from "@/firebase/firestore/deleteDocument";
import { useRouter } from "next/navigation";
import updateDocument from "@/firebase/firestore/updateDocument";
import deleteFile from "@/firebase/storage/deleteFile";
import { useAuthContext } from "@/context/AuthContext";
import styles from "./PlantCard.module.scss";

export default function PlantCard({
  plant,
  addSearchTag,
}: {
  plant: Plant;
  addSearchTag: any;
}) {
  const [cachedPlant, setCachedPlant] = useState<Plant>(plant);
  const [selectedImage, setSelectedImage] = useState(0);
  const { days, hours, minutes, seconds, setTime } = useCountdown(
    new Date(cachedPlant.metadata.next_watering)
  );
  const router = useRouter();
  const user = useAuthContext();

  function NextImage() {
    setSelectedImage(
      selectedImage + 1 > plant.images.length - 1 ? 0 : selectedImage + 1
    );
  }

  useEffect(() => {
    setTime(
      Math.max(
        0,
        Math.floor((cachedPlant.metadata.next_watering - Date.now()) / 1000)
      )
    );
  }, [cachedPlant]);

  async function DeletePlant() {
    await deleteDocument("user_plants", plant.id);
    await deleteFile(`/user_plants/${user!.uid}/${plant.id}/0`);
    window.location.reload();
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
          <svg
            className={`smallIcon ${styles.icon}`}
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="800"
            version="1.1"
            viewBox="0 0 512.053 512.053"
            xmlSpace="preserve"
          >
            <path d="M261.36 437.387C202.48 437.28 154.8 389.6 154.693 330.72c0-5.867-4.8-10.667-10.667-10.667s-10.667 4.8-10.667 10.667c.107 70.613 57.387 127.893 128 128 5.867 0 10.667-4.8 10.667-10.667.001-5.866-4.799-10.666-10.666-10.666z" />
            <path d="M263.387 3.04c-4.16-4.053-10.773-4.053-14.827 0-6.827 6.72-168.533 166.293-168.533 329.173 0 99.2 78.933 179.84 176 179.84s176-80.64 176-179.84c0-163.84-161.707-322.453-168.64-329.173zm-7.36 487.68c-85.333 0-154.667-71.147-154.667-158.507 0-134.613 122.88-272.747 154.667-306.24 31.787 33.387 154.667 170.88 154.667 306.24-.001 87.36-69.441 158.507-154.667 158.507z" />
          </svg>
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
            <p>
              {new Date(cachedPlant.metadata.next_watering).toLocaleString()}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn btnPrimary"
          onClick={() => {
            const now = Date.now();
            updateDocument("user_plants", plant.id, {
              last_watering: now,
              next_watering: now + plant.metadata.watering_interval_secs * 1000,
              updated_at: now,
            });

            setCachedPlant((prevState) => ({
              ...prevState,
              metadata: {
                ...prevState.metadata,
                last_watering: now,
                next_watering:
                  now + plant.metadata.watering_interval_secs * 1000,
                updated_at: now,
              },
            }));
          }}
        >
          Water Now
        </button>
        {plant.metadata.tags.length > 0 && (
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
        )}
      </div>
    </div>
  );
}
