const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9crls8f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const productCollection = client.db('gadgetDB').collection('products');

        // GET all products
        app.get('/products', async (req, res) => {
            try {
                const { search, category, brandName, priceSort, dateSort, page = 1, limit = 10 } = req.query;
                const query = {};

                // Implementing search
                if (search) {
                    query.$or = [
                        { productName: new RegExp(search, 'i') },
                        { category: new RegExp(search, 'i') },
                        { brandName: new RegExp(search, 'i') },
                    ];
                }

                // Implementing category filter
                if (category) {
                    const categories = category.split(',').map(c => c.trim());
                    query.category = { $in: categories };
                }

                // Implementing brand filter
                if (brandName) {
                    const brands = brandName.split(',').map(b => b.trim());
                    query.brandName = { $in: brands };
                }

                // Implementing pagination
                const options = {
                    skip: (page - 1) * limit,
                    limit: parseInt(limit),
                };

                // Implementing sorting
                if (priceSort) {
                    options.sort = { price: priceSort === 'asc' ? 1 : -1 };
                }
                if (dateSort) {
                    options.sort = { creationDateTime: dateSort === 'asc' ? 1 : -1 };
                }

                const cursor = productCollection.find(query, options);
                const products = await cursor.toArray();
                const total = await productCollection.countDocuments(query);

                res.json({ products, totalPages: Math.ceil(total / limit) });
            } catch (error) {
                console.error(error);
                res.status(500).send('Server error');
            }
        });

        // Send a ping to confirm a successful connection
        // await client.db('admin').command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});