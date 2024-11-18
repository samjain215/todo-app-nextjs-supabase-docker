import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query["code"];
  if (!code) {
    return res
      .status(200)
      .send({ error: true, message: "Invalid Code", loggedIn: false });
  }

  if (code === "240403" || code === "180604" || code === "231104") {
    return res.status(200).send({
      error: false,
      message: "Successfully Logged In",
      loggedIn: true,
    });
  } else {
    return res.status(200).send({
      error: true,
      message: "Invalid Code",
      loggedIn: false,
    });
  }
}
