import { NextResponse } from "next/server";
import axios from "axios";

const WOO_BASE_URL = "https://cretaluxurycruises.dev6.inglelandi.com/wp-json/wc/v3/products?per_page=50";
const CONSUMER_KEY = "ck_cb8d0d61726f318ddc43be3407749e7a58360fe1";
const CONSUMER_SECRET = "cs_bd55fa6bc205f402e50fdc25876032bb9c45b2ba";

export async function GET() {
  try {
    const response = await axios.get(`${WOO_BASE_URL}/products`, {
      auth: {
        username: CONSUMER_KEY,
        password: CONSUMER_SECRET,
      },
    });
    console.warn(response);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch products. ${error}` }, { status: 500 });
  }
}
