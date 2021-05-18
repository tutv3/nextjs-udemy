import { validateEmail } from "../../../utils/validators";
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !validateEmail(email)) {
      return res.status(422).json({
        msg: "Email is not in valid format"
      });
    }

    const client = await MongoClient.connect(process.env.MONGO_CLIENT_URI, {
      useUnifiedTopology: true
    });

    const db = client.db();

    await db.collection("users").insertOne({
      email
    });

    client.close();

    return res.status(201).json({
      msg: "Registered successfully"
    });
  }
}

export default handler;
