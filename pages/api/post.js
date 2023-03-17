import clientPromise from "../../lib/mongodb";

export default async (req,res) => {
    try {
        const client = await clientPromise;
        const db = client.db('nextjs_sample_db');
        const coll = db.collection('data');
        const { userName, password } = req.body;

        const found = await coll.find({'username': userName}).toArray()
        if (found[0]) {
          res.json({'error': 'Invalid username. Please choose another'});
        } else {
          const answer = await coll.insertOne({'username': userName, 'password': password});
          res.json(answer);
        }
    } catch(e) {
        console.log('post.js error ', e);
    }
}

/*
export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("nextjs_sample_db");
  const coll = db.collection('data');
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await coll.insertOne(bodyObject);
      res.json(myPost);
      break;
    case "GET":
      const allPosts = await coll.find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}
*/