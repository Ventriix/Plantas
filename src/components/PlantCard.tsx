"use client";

import { Plant } from "@/constants/types";
import Image from "next/image";
import { useState } from "react";
import styles from "./PlantCard.module.scss";

export default function PlantCard({
  plant,
  addSearchTag,
}: {
  plant: Plant;
  addSearchTag: any;
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  function NextImage() {
    setSelectedImage(
      selectedImage + 1 > plant.images.length - 1 ? 0 : selectedImage + 1
    );
  }

  return (
    <div className={styles.container}>
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
