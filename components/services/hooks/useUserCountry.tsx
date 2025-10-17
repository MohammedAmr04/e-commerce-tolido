"use client";

import { useEffect, useState } from "react";

export default function useUserCountry() {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    const savedCountry = localStorage.getItem("user_country");
    if (savedCountry) {
      setCountry(savedCountry);
      return; // خلاص عندنا البلد، مش محتاج API call
    }

    // أول مرة بس: هنعمل fetch للبلد
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.country_name) {
          setCountry(data.country_name);
          localStorage.setItem("user_country", data.country_name);
        }
      })
      .catch((err) => console.error("Error fetching user country:", err));
  }, []);

  return country;
}
