import { supabase } from "@/lib/initSupabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await supabase.from("countries").select("*");

  res.status(200).send({ countries: data.data });
}
