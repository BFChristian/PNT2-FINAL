import axios from "axios";

const API_URL = "https://api.bluelytics.com.ar/v2/latest";

export const getDolarOficialVenta = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.oficial.value_sell;
  } catch (error) {
    console.error("Error al obtener la cotizacion del dolar oficial", error);
    throw error;
  }
};