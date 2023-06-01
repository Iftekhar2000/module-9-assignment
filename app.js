
/* imports */
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookSchema');

// setting up express
const app = express();
app.use(express.json());


// Connect to MongoDB
mongoose.connect('mongodb+srv://iftekharulhaque2000:user1234@cluster0.amrqrh5.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//api routes

app.get('/books/:id', async(req,res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
          }
          res.json(book);
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/books', async (req, res) => {
    try {
      const book = new Book(req.body);
      await book.save();
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.put('/books/:id', async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.delete('/books/:id', async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Start the server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server listening on port localhost:${port}`);
  });