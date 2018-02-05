const https = require('https');


function filterBasedOnAuthor(bookArray) {
  const groupedDict = {};
  bookArray.forEach((element) => {
    if (groupedDict[element.Author] === undefined) {
      groupedDict[element.Author] = [];
      groupedDict[element.Author].push(element);
    } else {
      (groupedDict[element.Author]).push(element);
    }
  }, this);
  console.log(groupedDict);
  return groupedDict;
}


function jsonParser(data) {
  const parsedJSON = JSON.parse(data);
  const bookArray = parsedJSON.books;
  return filterBasedOnAuthor(bookArray);
}

function getURLData(url) {
  https.get(url, (response) => {
    response.setEncoding('UTF8');
    response.on('data', data => jsonParser(data));
  });
}

module.exports =
  {
    method: 'GET',
    path: '/books',
    handler: (request, response) => {
      const books = getURLData('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks');
      response(books);
    },
  };

