import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db('nextjs_sample_db');
        const coll = db.collection('data');
        const { userName, password } = req.body;

        const found = await coll.find({'username': userName, 'password': password}).toArray();
        if (found[0]) {
            res.json({'found': true, 'data': found});
            //res.status(200).redirect('/home');
        } else {
            res.json({'found': false, 'data': found});
        }
    } catch(e) {
        console.log(e);
    }
}