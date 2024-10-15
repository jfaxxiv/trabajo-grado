import { ACCESS_TOKEN } from "../config.json";

export const handdleIntegrationMP = async (raffleData, id, numTickets) => {
  console.log(raffleData);
  const { titulo, descripcion, precio } = raffleData;
  const preference = {
   "items": [
      {
        "id": `${id}`,
        "title": `${titulo}`,
        "description": `${descripcion}`,
        "category_id": "tickets",
        "quantity": numTickets,
        "currency_id": "$",
        "unit_price": precio,
      },
    ],
  };
  try {
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${ACCESS_TOKEN}`,
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
