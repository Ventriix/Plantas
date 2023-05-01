"use client";

import PlantCard from "@/components/PlantCard";
import { useCallback, useEffect, useState } from "react";
import { Plant } from "@/constants/types";
import { XMarkIcon } from "@heroicons/react/24/solid";
import styles from "./PlantOverview.module.scss";

export default function PlantOverview() {
  const [plants] = useState<Plant[]>([
    {
      name: "Monstera 1",
      description: "This is a test plant of type Monstera.",
      images: [
        "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera_variant_medium_grant_cream_5b593882-bf40-445c-be26-e8cd6b3ddbe1.jpg?v=1672212220",
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
    {
      name: "Monstera 2",
      description: "This is a test plant of type Monstera.",
      images: [
        "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera_variant_medium_grant_cream_5b593882-bf40-445c-be26-e8cd6b3ddbe1.jpg?v=1672212220",
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
  ]);
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [searchBarInput, setSearchBarInput] = useState("");
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(plants);

  function filterByTags() {
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
      {filteredPlants.length > 0 && (
        <ul className={styles.plantContainer}>
          {filteredPlants.map((plant) => (
            <li key={plant.name}>
              <PlantCard plant={plant} addSearchTag={addSearchTag} />
            </li>
          ))}
        </ul>
      )}
      {filteredPlants.length === 0 && (
        <div className={styles.noPlantsContainer}>
          <p>You have no plants yet.</p>
          <button type="button" className="btn">
            Add your first plant
          </button>
        </div>
      )}
    </div>
  );
}
