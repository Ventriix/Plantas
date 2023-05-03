"use client";

import PlantCard from "@/components/PlantCard";
import { useCallback, useEffect, useState } from "react";
import { Plant } from "@/types";
import { XMarkIcon } from "@heroicons/react/24/solid";
import queryDocumentsWhere from "@/firebase/firestore/queryDocuments";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { Dna } from "react-loader-spinner";
import styles from "./PlantOverview.module.scss";

export default function PlantOverview() {
  /* const [plants] = useState<Plant[]>([
    {
      id: "Test",
      name: "Monstera 1",
      description: "This is a test plant of type Monstera.",
      images: [
        "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera_variant_medium_grant_cream_5b593882-bf40-445c-be26-e8cd6b3ddbe1.jpg?v=1672212220",
      ],
      metadata: {
        created_at: 1682352317360,
        updated_at: 1682352317360,
        last_watering: 1682352917360,
        next_watering: 1683121784459,
        watering_interval_secs: 86400,
        tags: ["tropical", "test"],
      },
    },
    {
      id: "Test1",
      name: "Monstera 2",
      description: "This is a test plant of type Monstera.",
      images: [
        "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera_variant_medium_grant_cream_5b593882-bf40-445c-be26-e8cd6b3ddbe1.jpg?v=1672212220",
      ],
      metadata: {
        created_at: 1682352317360,
        updated_at: 1682352317360,
        last_watering: 1682352917360,
        next_watering: 1682439317360,
        watering_interval_secs: 86400,
        tags: ["tropical", "test"],
      },
    },
  ]); */
  const [plants, setPlants] = useState<Plant[] | undefined>(undefined);
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [searchBarInput, setSearchBarInput] = useState("");
  const [filteredPlants, setFilteredPlants] = useState<Plant[] | undefined>(
    plants
  );
  const user = useAuthContext();

  function filterByTags() {
    if (plants === undefined) return;

    if (searchTags.length > 0) {
      const tempFilteredPlants: Plant[] = [];

      searchTags.forEach((tag) =>
        plants
          .filter(
            (plant) =>
              plant.metadata.tags.includes(tag) ||
              plant.name.toLowerCase() === tag ||
              plant.description.toLowerCase().includes(tag)
          )
          .forEach((filteredPlant) => {
            if (!tempFilteredPlants.includes(filteredPlant)) {
              tempFilteredPlants.push(filteredPlant);
            }
          })
      );

      setFilteredPlants(tempFilteredPlants);
    } else {
      setFilteredPlants(plants);
    }
  }

  const addSearchTag = useCallback(
    (tag: string) => {
      if (!searchTags.includes(tag.toLowerCase())) {
        setSearchTags((prevState) => [...prevState, tag.toLowerCase()]);
      }
    },
    [searchTags, setSearchTags]
  );

  useEffect(() => {
    filterByTags();
  }, [searchTags]);

  async function GetPlantsFromDatabase() {
    const firestorePlants = await queryDocumentsWhere(
      "user_plants",
      "owning_user",
      user!.uid
    );

    const newPlants: Plant[] = [];

    firestorePlants.result!.docs.forEach((plant) => {
      newPlants.push({
        id: plant.get("id"),
        name: plant.get("name"),
        description: plant.get("description"),
        images: plant.get("images"),
        metadata: {
          created_at: plant.get("created_at"),
          updated_at: plant.get("updated_at"),
          last_watering: plant.get("last_watering"),
          next_watering: plant.get("next_watering"),
          watering_interval_secs: plant.get("watering_interval_secs"),
          tags: plant.get("tags"),
        },
      });
    });

    setPlants(newPlants);
  }

  useEffect(() => {
    GetPlantsFromDatabase();
  }, []);

  useEffect(() => {
    filterByTags();
  }, [plants]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Plants</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search"
          className="textField"
          value={searchBarInput}
          onChange={(event) => setSearchBarInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && searchBarInput.length > 0) {
              addSearchTag(searchBarInput);
              setSearchBarInput("");
            }
          }}
        />
        <ul>
          {searchTags.length > 0 &&
            searchTags.map((tag, index) => (
              <li key={tag}>
                <div className={`btn btnAccentGreen ${styles.tagButton}`}>
                  {tag}
                  <button
                    onClick={() =>
                      setSearchTags(
                        searchTags.filter(
                          (otherTag, otherIndex) => otherIndex !== index
                        )
                      )
                    }
                    type="button"
                    className={`btn btnTransparent ${styles.tagDeleteButton}`}
                  >
                    <XMarkIcon className={styles.tagDeleteIcon} />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
      {plants && filteredPlants && filteredPlants.length > 0 && (
        <ul className={styles.plantContainer}>
          {filteredPlants.map((plant) => (
            <li key={plant.name}>
              <PlantCard plant={plant} addSearchTag={addSearchTag} />
            </li>
          ))}
        </ul>
      )}
      {plants &&
        (!filteredPlants ||
          (filteredPlants && filteredPlants.length === 0)) && (
          <div className={styles.noPlantsContainer}>
            <p>You have no plants.</p>
            <Link href="/add-plant">
              <button type="button" className="btn btnAccentGreen">
                Add Plant
              </button>
            </Link>
          </div>
        )}
      {!plants && (
        <div className={styles.plantContainer}>
          <Dna visible height={80} width={80} ariaLabel="Loading" />
        </div>
      )}
    </div>
  );
}
