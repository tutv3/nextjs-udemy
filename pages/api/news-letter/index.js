import { validateEmail } from "../../../utils/validators";
import { connectDB, insertDocument } from "../../../utils/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !validateEmail(email)) {
      return res.status(422).json({
        msg: "Email is not in valid format"
      });
    }
    let client = {};
    try {
      client = await connectDB();
    } catch (error) {
      return res.status(500).json({
        msg: "Connecting to db failed"
      });
    }

    try {
      await insertDocument(client, { email }, "users");
    } catch (error) {
      return res.status(500).json({
        msg: "Inserting to db failed"
      });
    }

    return res.status(201).json({
      msg: "Registered successfully"
    });
  }
}

export default handler;
