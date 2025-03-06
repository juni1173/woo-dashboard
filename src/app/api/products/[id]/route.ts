import { NextResponse } from "next/server";
import axios from "axios";

const WOO_BASE_URL = "https://cretaluxurycruises.dev6.inglelandi.com/wp-json/wc/v3";
const CONSUMER_KEY = process.env.WOO_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WOO_CONSUMER_SECRET;

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const response = await axios.get(`${WOO_BASE_URL}/products/${params.id}`, {
      auth: {
        username: CONSUMER_KEY!,
        password: CONSUMER_SECRET!,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
