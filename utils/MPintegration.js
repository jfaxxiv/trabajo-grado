import { ACCESS_TOKEN, TEST } from "../config.json";

export const handdleIntegrationMP = async (raffleData, id, numTickets) => {
  console.log(raffleData);
  const { titulo, descripcion, precio } = raffleData;
  const preference = {
   "items": [
      {
        "id": `${id}`,
        "title": `${titulo}`,
        "description": `${descripcion}`,
        "quantity": 1,
        "unit_price": 12,
      },
    ],
  };
  try {
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${TEST}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preference),
      }
    );

    const data = await response.json();
    console.log(data.init_point);
    return data.init_point;
  } catch (error) {
    console.log(error);
  }
};
