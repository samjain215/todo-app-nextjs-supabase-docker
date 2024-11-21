import { supabase } from "@/lib/initSupabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password, title, desc } = req.query;

  if (!password) {
    return res
      .status(500)
      .send({ error: true, message: "Unable to Add Task (Invalid Password)" });
  }
  if (!title) {
    return res
      .status(500)
      .send({ error: true, message: "Unable to Add Task (Invalid Title)" });
  }
  if (!desc) {
    return res.status(500).send({
      error: true,
      message: "Unable to Add Task (Invalid Description)",
    });
  }

  const fetchUserID = await supabase
    .from("users")
    .select("user_id")
    .eq("password", password);

  if (fetchUserID.data) {
    const userID = fetchUserID.data![0]["user_id"];
    // Add Task To Database
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7); // Add 7 days

    const response = await supabase.from("tasks").insert([
      {
        user_id: userID,
        title: title,
        description: desc,
        category_id: 1,
        priority_id: 1,
        due_date: dueDate.toISOString(), // Use ISO format with 7 days added
        status: "Pending",
        created_at: new Date().toISOString(), // Use ISO format
      },
    ]);

    console.log(response.status);
    if (response.status === 201) {
      res.status(201).send({ error: false, message: "", data: response.data });
    } else {
      console.error("Internal Server Error");
      res.status(500).send({ error: true, message: response.error });
    }
  }
}
