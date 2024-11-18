import { supabase } from "@/lib/initSupabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const password = req.query["password"];
  if (!password) {
    return res.status(500).send({ error: true, message: "Invalid Password" });
  }

  const userData = await supabase
    .from("users")
    .select("user_id")
    .eq("password", password);

  if (userData.data) {
    const userID = userData.data![0]["user_id"];
    const data = await supabase.from("tasks").select("*").eq("user_id", userID);

    const tasks = [];
    if (data.data) {
      for (const task of data.data) {
        const date = new Date(task.created_at);

        // Step 2: Convert to PST (Pacific Standard Time)
        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "America/Los_Angeles",
          hour12: false,
        };

        // Use Intl.DateTimeFormat to format the date in PST
        const formatter = new Intl.DateTimeFormat("en-US", options);
        const formattedDate = formatter.format(date);

        // Format the output to match "yyyy-mm-dd hh:mm:ss"
        const [month, day, year, hour, minute, second] = formattedDate.match(
          /\d+/g
        ) as string[];
        const result = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        tasks.push({
          id: task.task_id,
          title: task.title,
          description: task.description,
          category: "Work",
          dueDate: result,
        });
      }

      res.status(200).send(tasks);
    } else {
      console.error("Error Fetching Tasks");
      res.status(500).send({ error: "Internal Server Error" });
    }
  } else {
    console.error("Error Fetching Tasks");
    res.status(500).send({ error: "Internal Server Error" });
  }
}
