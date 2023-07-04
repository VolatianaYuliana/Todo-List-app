import axios from "axios";

export const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVEUR}`,
});

// Ajouter un intercepteur de demande
instance.interceptors.request.use((config) => {
  // Ajoutez votre logic pour déterminer la valeur du token
  const token = localStorage.getItem("token");

  // Modifier les en-têtes de configuration avant de les envoyer
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
