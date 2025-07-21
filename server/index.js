
const express=require('express');
const {graphqlHTTP} =require('express-graphql');
const {buildSchema}=require('graphql');
const cors=require('cors');

const books= [
    {
        id:1,title:"1998",author:"ABC"
    },
    {
        id:2,title:"1999",author:"ABCDEF"
    }

];
// graphQL SCHEMA 
const schema = buildSchema(`
    type Book {
id: Int
title: String
author: String
    }

    type Query {
books: [Book]
book(id: Int!): Book
    }
`);

const root = {
    books:() => books,
    book: ({id}) => books.find(book => book.id===id)
};

const app=express();
app.use(cors);
app.use('/graphql',graphqlHTTP({
    schema,
    rootValue:root,
    graphiql:true //-> ui 
}));
app.listen(4000,()=> console.log("Server up!"));