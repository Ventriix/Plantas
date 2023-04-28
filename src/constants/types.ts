export type Plant = {
  name: string;
  description: string;
  images: string[];
  metadata: {
    created_at: number;
    updated_at: number;
    last_watering: number;
    next_watering: number;
    watering_interval_secs: number;
    tags: string[];
  };
};
