const express = require('express')
const cors = require('cors');
require('dotenv').config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2vxppji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        // all collections here
        const roommateCollection = client.db('roomlyDB').collection('roommates');

        // all routes here

        //get all roommate
        app.get('/roommates', async (req, res) => {
            const result = await roommateCollection.find().toArray();
            res.send(result);
        })
        //get a single roommate data
        app.get('/roommates/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await roommateCollection.findOne(query);
            res.send(result);
        })
        // post / create a post
        app.post('/roommates', async (req, res) => {
            const postData = req.body;
            const result = await roommateCollection.insertOne(postData);
            res.send(result);
        });

        //Update post Roommate post
        app.put('/roommates/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const roommateUpdate = req.body;

            const options = { upsert: true };

            const updatedDoc = {
                $set: roommateUpdate
            };

            const result = await roommateCollection.updateOne(filter, updatedDoc, options);

            res.send(result);

        })

        //delete a roommate post
        app.delete('/roommates/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await roommateCollection.deleteOne(query);
            res.send(result);
        })

        // Get only 8 available roommates from roommateCollection
        app.get('/featured-roommates', async (req, res) => {
            const query = { availability: "available" };
            const result = await roommateCollection.find(query).limit(8).toArray();
            res.send(result);
        });

        // Add like count

        app.patch('/roommates/:id/like', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };

                // Ensure 'likes' is a number before incrementing
                const doc = await roommateCollection.findOne(filter);
                if (!doc) {
                    return res.status(404).send({ message: 'Roommate not found' });
                }

                // If likes is not a number, convert it
                if (typeof doc.likes !== 'number') {
                    const likesNum = parseInt(doc.likes) || 0;
                    await roommateCollection.updateOne(filter, { $set: { likes: likesNum } });
                }

                // Now increment
                const updateResult = await roommateCollection.updateOne(filter, { $inc: { likes: 1 } });

                if (updateResult.modifiedCount > 0) {
                    const updatedDoc = await roommateCollection.findOne(filter);
                    res.send({ likes: updatedDoc.likes });
                } else {
                    res.status(404).send({ message: 'Roommate not found or already liked' });
                }
        });


        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

//default run server
app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
