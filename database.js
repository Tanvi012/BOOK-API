const books = [
    {
        ISBN: '12345Book',
        title: 'Getting started with MERN',
        pubDate: '2021-11-05',
        language: 'en',
        numPage: 250,
        author: [1, 2],
        publications: [1],
        category: ["tech", "programming", "education"]
    },
    {
        ISBN: '1234',
        title: 'Hindi Balbharti',
        pubDate: '2021-17-03',
        language: 'hindi',
        numPage: 100,
        author: [3],
        publications: [2],
        category: ['education']
    }
]

const authors = [
    {
        id: 1,
        name: "Aradhana",
        books: ["12345Book"]
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book"]
    },
    {
        id: 3,
        name: 'Kabeer',
        books: ['1234']
    }
]

const publications = [
    {
        id: 1,
        name: "Writex",
        books: ["12345Book"]
    },
    {
        id: 2,
        name: 'Bala',
        books: ['Hindi Balbharti']
    }
]

module.exports = { books, authors, publications }