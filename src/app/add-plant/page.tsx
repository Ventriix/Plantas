"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import uploadFile from "@/firebase/storage/uploadFile";
import { useAuthContext } from "@/context/AuthContext";
import setDocument from "@/firebase/firestore/setDocument";
// eslint-disable-next-line import/no-extraneous-dependencies
import { uuidv4 } from "@firebase/util";
import Image from "next/image";
import getFile from "@/firebase/storage/getFile";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/solid";
import overviewStyles from "@/components/PlantOverview.module.scss";
import canvasPreview from "@/crop/canvasPreview";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import styles from "./AddPlant.module.scss";
// eslint-disable-next-line import/no-extraneous-dependencies
import "react-image-crop/src/ReactCrop.scss";

type Inputs = {
  name: string;
  description: string;
  days: number;
  hours: number;
  minutes: number;
  icon: FileList;
};

export default function AddPlant() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const user = useAuthContext();
  const [timespanError, setTimespanError] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [loading, setLoading] = useState(false);
  const icon = watch("icon");
  const [iconBase64, setIconBase64] = useState("");
  const [iconBlob, setIconBlob] = useState<Blob | null>(null);
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagBarInput, setTagBarInput] = useState("");
  const iconSelectRef = useRef<HTMLInputElement | null>(null);
  const [iconCrop, setIconCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [showIconCrop, setShowIconCrop] = useState(false);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const iconRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!icon || !icon[0]) return;

    const reader = new FileReader();
    reader.readAsDataURL(icon[0]);

    reader.onload = () => {
      if (reader.result) {
        setIconBase64(reader.result.toString());
        setShowIconCrop(true);
      }
    };
  }, [icon]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  async function dataUrlToFile(
    dataUrl: string,
    fileName: string
  ): Promise<File> {
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: "image/png" });
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const totalWateringSecs =
      data.days * 86400 + data.hours * 3600 + data.minutes * 60;

    if (totalWateringSecs < 3600) {
      setTimespanError(true);
    } else {
      setTimespanError(false);
    }

    setLoading(true);

    const timestamp = Date.now();
    const plantId = uuidv4();

    const path = `/user_plants/${user!.uid}/${plantId}/0`;

    uploadFile(await dataUrlToFile(iconBase64, "0.png"), path, {
      owning_user: user!.uid,
      related_plant: plantId,
    })
      .then(async ({ task, error }) => {
        setUploadError(!!error);

        if (!error) {
          task!.then(async () => {
            const iconUrlResult = await getFile(path);
            setUploadError(!!iconUrlResult.error);

            if (!iconUrlResult.error) {
              const documentResult = await setDocument(`user_plants`, plantId, {
                id: plantId,
                name: data.name,
                description: data.description,
                images: [iconUrlResult.result],
                owning_user: user!.uid,
                created_at: timestamp,
                updated_at: timestamp,
                last_watering: timestamp,
                next_watering: timestamp + totalWateringSecs * 1000,
                watering_interval_secs: totalWateringSecs,
                tags,
              });

              setUploadError(!!documentResult.error);

              if (!documentResult.error) {
                router.push("/");
              }
            }
          });
        }
      })
      .catch((error) => {
        setUploadError(!!error);
      });

    setLoading(false);
  };

  const addTag = useCallback(
    (tag: string) => {
      if (!tags.includes(tag.toLowerCase())) {
        setTags((prevState) => [...prevState, tag.toLowerCase()]);
      }
    },
    [tags, setTags]
  );

  function CropIcon() {
    setShowIconCrop(false);

    if (!previewCanvasRef.current) {
      return;
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        return;
      }

      if (iconBase64.length > 0) {
        URL.revokeObjectURL(iconBase64);
      }

      setIconBlob(blob);
      setIconBase64(URL.createObjectURL(blob));
    });
  }

  useEffect(() => {
    canvasPreview(iconRef.current!, previewCanvasRef.current!, completedCrop!);
  }, [completedCrop]);

  return (
    <>
      <Header />
      <main>
        {showIconCrop && (
          <div className={styles.cropContainer}>
            <ReactCrop
              crop={iconCrop}
              onChange={(crop) => setIconCrop(crop)}
              onComplete={(crop) => setCompletedCrop(crop)}
              aspect={1}
              ruleOfThirds
              minHeight={20}
              minWidth={20}
              className={styles.canvas}
            >
              {iconBase64 && (
                <Image
                  src={iconBase64}
                  alt="Plant Icon"
                  width={800}
                  height={800}
                  className={styles.icon}
                  ref={iconRef}
                />
              )}
            </ReactCrop>
            {completedCrop && (
              <div className={styles.previewContainer}>
                <p>Preview</p>
                <canvas ref={previewCanvasRef} className={styles.canvas} />
              </div>
            )}
            <button
              type="button"
              className="btn btnAccentGreen"
              onClick={CropIcon}
            >
              Finish Crop
            </button>
          </div>
        )}
        {!showIconCrop && (
          <>
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
                <p>Water every</p>
                {errors.days && <span>Days need to be between 0 and 359</span>}
                {errors.hours && <span>Hours need to be between 0 and 23</span>}
                {errors.minutes && (
                  <span>Minutes need to be between 0 and 59</span>
                )}
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
                    {...register("minutes", {
                      required: true,
                      max: 59,
                      min: 0,
                    })}
                    className="textField"
                    placeholder="Mins"
                  />
                </div>
              </div>
              <div className="inputContainer">
                <p>Icon</p>
                {errors.icon && <span>This field is required</span>}
                <div className={styles.fileSelectContainer}>
                  <button
                    type="button"
                    className="btn btnTransparent"
                    onClick={() => iconSelectRef.current!.click()}
                  >
                    Browse...
                  </button>
                  <input
                    {...register("icon", { required: true })}
                    ref={iconSelectRef}
                    onChange={(event) => {
                      setValue("icon", event.target.files!);
                    }}
                    type="file"
                    accept="image/*"
                  />
                </div>
                {iconBase64.length > 0 && (
                  <Image
                    src={iconBase64}
                    alt="Plant Icon"
                    width={800}
                    height={800}
                    className={styles.icon}
                  />
                )}
              </div>
              <div className={overviewStyles.searchContainer}>
                <input
                  type="text"
                  placeholder="Add Tag(s)"
                  className="textField"
                  value={tagBarInput}
                  onChange={(event) => setTagBarInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && tagBarInput.length > 0) {
                      event.preventDefault();
                      addTag(tagBarInput);
                      setTagBarInput("");
                    }
                  }}
                />
                {tags.length > 0 && (
                  <ul>
                    {tags.map((tag, index) => (
                      <li key={tag}>
                        <div
                          className={`btn btnAccentGreen ${overviewStyles.tagButton}`}
                        >
                          {tag}
                          <button
                            onClick={() =>
                              setTags(
                                tags.filter(
                                  (otherTag, otherIndex) => otherIndex !== index
                                )
                              )
                            }
                            type="button"
                            className={`btn btnTransparent ${overviewStyles.tagDeleteButton}`}
                          >
                            <XMarkIcon
                              className={overviewStyles.tagDeleteIcon}
                            />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {uploadError && (
                <span className="error">
                  An error occured while uploading your plant. Please try again
                  later.
                </span>
              )}
              <button
                type="submit"
                className="btn btnAccentGreen"
                disabled={loading}
              >
                {loading ? "Adding Plant" : "Add Plant"}
              </button>
            </form>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
