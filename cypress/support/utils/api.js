const checkApiCypress = () => {
  describe("API Demo", function () {
    it("should make an API request and verify JSON response", function () {
      // Make an API request using cy.request()
      cy.request(Cypress.env("apiUrl")).then((response) => {
        // Assert that the response status is 200
        expect(response.status).to.equal(200);

        // Assert specific properties in the response body
        expect(response.body).to.have.property("page", 1);
        expect(response.body).to.have.property("per_page", 6);
        expect(response.body).to.have.property("total", 12);
        expect(response.body).to.have.property("total_pages", 2);

        // Assert the 'data' property is an array with at least one item
        expect(response.body.data).to.be.an("array").that.is.not.empty;

        // Assert properties of the first item in the 'data' array
        const firstUserData = response.body.data[0];
        expect(firstUserData).to.have.property("id", 1);
        expect(firstUserData).to.have.property("email","george.bluth@reqres.in" );
        expect(firstUserData).to.have.property("first_name", "George");
        expect(firstUserData).to.have.property("last_name", "Bluth");
        expect(firstUserData).to.have.property("avatar","https://reqres.in/img/faces/1-image.jpg");

        // Additional assertions or actions based on the response can be added here
      });
    });
  });
};




// querying the database from Node
function queryDB(connectionInfo, query) {
  const connection = mysql.createConnection(connectionInfo)

  connection.connect()

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error)
      }

      connection.end()

      return resolve(results)
    })
  })
}


export { checkApiCypress,queryDB, };
