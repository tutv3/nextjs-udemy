import { validateEmail } from "../../../utils/validators";
import { getAllDocuments, insertDocument, connectDB } from "../../../utils/db";

async function handler(req, res) {
  const { eventId, name, text, email } = req.body;

  let client = {};

  try {
    client = await connectDB();
  } catch (error) {
    return res.status(500).json({
      msg: "Connecting to db failed"
    });
  }

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

    let result;

    try {
      result = await insertDocument(client, newComment, "comments");
    } catch (error) {
      return res.status(500).json({
        msg: "Inserting comment to db failed"
      });
    }

    return res.json({
      msg: "Commented successfully",
      cmt: { _id: result.insertedId, ...newComment }
    });
  }
  if (req.method === "GET") {
    const resCmts = await getAllDocuments(
      client,
      "comments",
      { _id: -1 },
      {
        eventId: req.query.eventId
      }
    );
    return res.json({
      cmts: resCmts
    });
  }
}

export default handler;
