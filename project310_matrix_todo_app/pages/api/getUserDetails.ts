import { supabase } from "@/lib/initSupabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query;
  if (!code) {
    return res.status(500).send({ error: true, message: "Code Not Found" });
  }
  console.log(code["code"]);

  const data = await supabase
    .from("users")
    .select("username")
    .eq("password", code["code"]);

  if (data.error) {
    console.error("Error fetching user password:", data.error);
  } else {
    res.status(200).send({ name: data.data });
  }
}
