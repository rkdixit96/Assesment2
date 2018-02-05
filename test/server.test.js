const Server = require('../source/server');

describe('Testing Hapi server', () => {
  test('Successful get request', () => {
    const options = {
      method: 'GET',
      url: '/books',
    };
    Server.inject(options, (result) => {
      expect(result.statusCode).toBe(200);
    });
  });

  test('Invalid URL request returns error 404', () => {
    const options1 = {
      method: 'GET',
      url: '/invalidURL',
    };
    Server.inject(options1, (result) => {
      expect(result.statusCode).toBe(404);
    });
  });

  test('Successful get request', () => {
    const options = {
      method: 'GET',
      url: '/uploadData',
    };
    Server.inject(options, (result) => {
      expect(result.statusCode).toBe(200);
    });
  }); 
});
