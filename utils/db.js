import { MongoClient } from "mongodb";

export async function connectDB() {
  return MongoClient.connect(process.env.MONGO_CLIENT_URI, {
    useUnifiedTopology: true
  });
}

export async function insertDocument(client, document, collection) {
  const db = client.db();

  const resCmt = await db.collection(collection).insertOne(document);

  return resCmt;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();
  const cmts = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  return cmts;
}
