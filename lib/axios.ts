import axios from "axios";

export const countries = { Egypt: "EG", Syria: "SA", Jordan: "JO" } as const;
export const countryCurrencyMap = {
  EG: "EGP",
  SA: "SAR",
  AE: "AED",
  US: "USD",
  UK: "GBP",
  FR: "EUR",
  DE: "EUR",
  Other: "USD",
};

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // إضافة الـ token لو موجود
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;

      // تحويل اسم الدولة للكود المناسب
      const userCountry = localStorage.getItem("user_country") || "";
      //   type CountryName = keyof typeof countries; // "Egypt" | "Syria" | "Jordan"
      const countryCode: string =
        (countries as Record<string, string>)[userCountry] || "Other";

      config.headers["x-country-code"] = countryCode.toUpperCase();
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
