const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashed_password: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashed_password);
};

export class JWTSigner {
  private secret: string;
  private config: { [param: string]: string };

  constructor(privateKeyPath: string, algorithm: string = "RS256") {
    this.secret = require("fs").readFileSync(privateKeyPath, "utf8");
    this.config = { algorithm };
  }

  sign(payload: string | object): string {
    return jsonwebtoken.sign(payload, this.secret, this.config);
  }

  verify(token: string): string | object {
    return jsonwebtoken.verify(token, this.secret, this.config);
  }
}
