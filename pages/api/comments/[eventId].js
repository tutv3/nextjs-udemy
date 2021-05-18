import { validateEmail } from "../../../utils/validators";
import { MongoClient } from "mongodb";

async function handler(req, res) {
  const { eventId, name, text, email } = req.body;

  const client = await MongoClient.connect(process.env.MONGO_CLIENT_URI, {
    useUnifiedTopology: true
  });

  const db = client.db();

  if (req.method === "POST") {
    if (!eventId) {
      return res.status(422).json({
        msg: "Event is not founded"
      });
    }

    if (!name || !text || !email || !validateEmail(email)) {
      return res.status(422).json({
        msg: "Invalid input"
      });
    }

    const newComment = {
      eventId,
      name,
      text,
      email
    };

    const resCmt = await db.collection("comments").insertOne(newComment);

    client.close();

    return res.json({
      msg: "Commented successfully",
      cmt: { _id: resCmt.insertedId, ...newComment }
    });
  }
  if (req.method === "GET") {
    const resCmts = await db
      .collection("comments")
      .find({})
      .sort({
        _id: -1
      })
      .toArray();
    return res.json({
      cmts: resCmts
    });
  }
}

export default handler;
