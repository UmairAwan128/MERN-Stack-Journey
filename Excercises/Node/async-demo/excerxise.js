console.log("Before");

// getCustomer(1, customer => {
//   console.log("Customer: ", customer);
//   if (customer.isGold) {
//     getTopMovies(movies => {
//       console.log("Top movies: ", movies);
//       sendEmail(customer.email, movies, () => {
//         console.log("Email sent...");
//       });
//     });
//   }
// });

//excercise is to wrote the above code written callback manner in the async/await manner.
//so created a method with async/await and changed the methods as they were using callback so we
//used there promise obj to return "resolve" object.
displayCommits();

console.log("After");
async function displayCommits() {
  try {
    const customer = await getCustomer(1);
    console.log("Coustomer", customer);
    if (customer.isGold) {
      const movies = await getTopMovies();
      console.log("top Movies", movies);
      await sendEmail(customer.email, movies);
      console.log("Email sent!");
    }
  } catch (err) {
    console.log(err);
  }
}

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Mosh Hamedani",
        isGold: true,
        email: "email"
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}
