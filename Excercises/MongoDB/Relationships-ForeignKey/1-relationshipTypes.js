//to create a relation b/w tables/documents in MongoDB we have three approaches to understand e.g
//Course has an author both are seperate tables/documents we can build relation b/w them as
//1. Using References (Normalization) here we have seperate collection/table for both author and course e.g
//Why/when use this:
//-> here we have single place where author data is stored i.e as its seperate author is document
// so chaging only one place will change author data for all courses i.e called consistency.
//-> problem is every time we get course we need to additionally get or write query
// to get its author seperatly. so low performance/slow
let author = {
  name: "mosh"
};
//so we stored id of author in course i.e foreignKey which we use in MSSQL but in MongoDB
//there is no such mechanism to check its validity i.e we can assign invalidId here also
//MongoDB don,t know about relation b/w course and author.
let course = {
  author: "idOfAuthor"
  //or can have multiple references or authors as
  // authors: ["id1", "id2", "id3"]
};

//2. Using Embedded Documents (DeNormalization) here we embed author document inside the course document instead of creating it seperately
//Why/when use this:
//-> as here we have stored author data inside the course so no need to get its author seperatly.
// so only one query will do all so high performance/fast
//-> problem is here we have stored author data inside the course so if we want to change author data
//  we need to change author data by going to all courses i.e no consistency.
let course = {
  name: "cs",
  author: {
    name: "mosh"
  }
};

//3. Using Hybrid Approach
// use it if we have a large no of properties in the Author so we declare it as seperte document
//but as per our requirement we store some of the properties of author we want in course along
//with authorId so.

let author = {
  name: "mosh"
  //50 other properties
};
let course = {
  name: "cs",
  author: {
    //stored here specific properties of author that are most frequently used so makes performance better
    id: "idOfAuthor",
    name: "mosh"
  }
};
