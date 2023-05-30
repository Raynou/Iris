const Validator = require("../../core/validation/validator.js");

test("Test 1 - Valid phone numbers", () => {
  const phoneNumbers = [
    "7441234567",
    "6862345678",
    "4493456789",
    "8664567890",
    "2415678901",
    "8332900075",
    "2447890123",
    "9819012345",
    "4611234567",
    "6252345678",
    "5512345678",
    "9383456789",
    "6394567890",
    "3415678901",
    "7537890123",
    "8319012345",
    "6441234567",
    "4812345678",
    "8343456789",
    "9214567890",
    "3125678901",
    "2717890123",
    "7359012345",
    "7771234567",
    "6672345678",
    "6143456789",
    "7474567890",
    "9225678901",
    "6187890123",
    "6469012345",
    "4931234567",
    "3312345678",
    "4733456789",
    "6224567890",
    "6625678901",
    "4627890123",
    "9719012345",
    "2281234567",
    "8782345678",
    "6123456789",
    "3525678901",
    "4747890123",
    "4779012345",
    "6681234567",
    "7282345678",
    "3523456789",
    "3144567890",
    "8685678901",
    "7337890123",
    "6699012345",
    "9991234567",
    "2442345678",
    "2723456789",
    "7714567890",
    "6275678901",
    "4277890123",
    "3929012345",
    "8651234567",
    "7822345678",
    "2223456789",
    "3224567890",
    "4425678901",
    "8997890123",
    "8619012345",
    "3531234567",
    "4642345678",
    "8443456789",
    "6244567890",
    "4445678901",
    "6537890123",
    "5949012345",
    "4151234567",
    "7752345678",
    "8333456789",
    "9624567890",
    "2385678901",
    "3787890123",
    "7739012345",
    "3111234567",
    "5952345678",
    "6643456789",
    "2464567890",
    "7225678901",
    "8717890123",
    "7831234567",
    "9612345678",
    "4523456789",
    "2295678901",
    "9937890123",
    "4929012345",
    "7331234567",
    "3512345678",
    "7553456789",
    "3484567890",
    "8295678901",
    "6587890123",
    "2699012345",
    "9781234567",
    "8372345678",
    "2833456789",
    "5424567890",
    "6435678901",
    "4927890123",
    "9789012345",
    "6931234567",
  ];
  const results = phoneNumbers.map((phone) => Validator.isPhone(phone));
  results.forEach((result) => {
    expect(result).toBe(true);
  });
});

test("Test 2 - Invalid phone numbers", () => {
  const phoneNumbers = [
    "1234567890",
    "1111111111",
    "987654321",
    "123456789",
    "555555555",
    "999999999",
    "111111111",
    "98765432",
    "12345678",
    "55555555",
    "99999999",
    "11111111",
    "9876543",
    "1234567",
    "5555555",
    "9999999",
    "1111111",
    "987654",
    "123456",
    "555555",
    "999999",
    "111111",
    "98765",
    "12345",
    "55555",
    "99999",
    "11111",
    "9876",
    "1234",
    "5555",
    "9999",
    "1111",
    "987",
    "123",
    "555",
    "999",
    "111",
    "98",
    "12",
    "55",
    "99",
    "11",
    "12345678900",
    "11111111100",
    "1234567800",
    "555555500",
    "999999900",
    "111111100",
    "987654300",
    "123456700",
    "55555500",
    "99999900",
    "11111100",
    "98765400",
    "12345600",
    "5555500",
    "9999900",
    "1111100",
    "9876500",
    "1234500",
    "555500",
    "999900",
    "111100",
    "987600",
    "123400",
    "55550",
    "99900",
    "11100",
    "98700",
    "12300",
    "5550",
    "9900",
    "1100",
    "980",
    "120",
    "550",
    "990",
    "110",
    "9876543210-",
    "1234567890-",
    "5555555555-",
    "9999999999-",
    "1111111111-",
    "987654321-",
    "123456789-",
    "555555555-",
    "999999999-",
    "111111111-",
    "98765432-",
    "12345678-",
    "55555555-",
    "99999999-",
    "11111111-",
    "9876543-",
    "1234567-",
    "5555555-",
    "9999999-",
    "1111111-",
    "987654-",
    "123456-",
    "555555-",
    "999999-",
    "111111-",
  ];

  const results = phoneNumbers.map((phone) => Validator.isPhone(phone));

  results.forEach((result) => {
    expect(result).toBe(false);
  });
});
