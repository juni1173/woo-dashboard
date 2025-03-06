import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "Missing product ID" }, { status: 400 });

    const response = await fetch(`https://cretaluxurycruises.dev6.inglelandi.com/wp-json/wc/v3/products/${id}`, {
      headers: {
        Authorization: `Basic ${btoa(process.env.CONSUMER_KEY + ":" + process.env.CONSUMER_SECRET)}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Product not found" }, { status: response.status });
    }

    const product = await response.json();
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

