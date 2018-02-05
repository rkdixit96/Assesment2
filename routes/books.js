const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function getBookRating(id) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', `https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${id}`, false);
  xmlHttp.send(null);
  const ratingObj = JSON.parse(xmlHttp.responseText);
  return ratingObj.rating;
}

function filterBasedOnAuthor(bookArray) {
  const groupedDict = {};
  const bookData = bookArray.slice();
  for (let book = 0; book < bookArray.length; book += 1) {
    bookData[book].rating = getBookRating(bookData[book].id);
    if (groupedDict[bookData[book].Author] === undefined) {
      groupedDict[bookData[book].Author] = [];
      groupedDict[bookData[book].Author].push(bookData[book]);
    } else {
      (groupedDict[bookData[book].Author]).push(bookData[book]);
    }
  }
  // console.log(groupedDict);
  return groupedDict;
}


function jsonParser(data) {
  const parsedJSON = JSON.parse(data);
  const bookArray = parsedJSON.books;
  // console.log(bookArray);
  return filterBasedOnAuthor(bookArray);
}


function getURLData(url) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false); // false for synchronous request
  xmlHttp.send(null);
  return jsonParser(xmlHttp.responseText);
//   https.get(url, (response) => {
//     response.setEncoding('UTF8');
//     response.on('data', data => jsonParser(data));
//   });
}

module.exports =
  {
    method: 'GET',
    path: '/books',
    handler: (request, response) => {
      const books = getURLData('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks');
      console.log(books);
      response(books);
    },
    // {
    //     method: 'GET',
    //     path: '/uploadData'
    //     handler:(request, response)=>{
    //         const books = getURLData('http://localhost:9876/books');
    //         console.log(books)
    //     }
    // }
  };

