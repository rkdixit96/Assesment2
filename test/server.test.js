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
});
