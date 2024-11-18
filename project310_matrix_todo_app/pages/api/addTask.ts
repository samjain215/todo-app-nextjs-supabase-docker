import { supabase } from "@/lib/initSupabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userID, title, desc } = req.body;

  if (!userID) {
    return res
      .status(400)
      .send({ error: true, message: "Unable to Add Task (Invalid User ID)" });
  }
  if (!title) {
    return res
      .status(400)
      .send({ error: true, message: "Unable to Add Task (Invalid Title)" });
  }
  if (!desc) {
    return res.status(400).send({
      error: true,
      message: "Unable to Add Task (Invalid Description)",
    });
  }

  // Add Task To Database
  const response = await supabase.from("tasks").insert([
    {
      user_id: userID,
      title: title,
      description: desc,
      category_id: 1,
      priority_id: 1,
      due_date: Date.now(),
      status: "Pending",
      created_at: Date.now(),
    },
  ]);
  if (response.status === 200) {
    res.status(200).send({ error: false, message: "", data: response.data });
  } else {
    res.status(response.status).send({ error: true, message: response.error });
  }
}
