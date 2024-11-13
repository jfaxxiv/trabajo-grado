import { ACCESS_TOKEN, TEST } from "../config.json";
//"ACCESS_TOKEN":"APP_USR-723194450483589-091417-0d3ad3f2beb8a0b2f445a1f71afa6d77-657801387",
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
