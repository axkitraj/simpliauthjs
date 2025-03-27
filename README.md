# SimpliAuthJs

SimpliAuthJs is a simple, secure, and easy-to-integrate authentication solution for web and mobile apps. It supports various authentication methods, including magic link sign-ins, social logins like Google and GitHub, and more. With minimal setup, SimpliAuth streamlines user authentication, ensuring seamless login, sign-up, and account management. It's the perfect choice for developers who want to quickly and efficiently implement secure authentication.

## Installation

To get started with SimpliAuthJs, follow these steps:

```bash
npm install simpliauthjs
```

## Features

- **Multiple Authentication Methods:** Supports magic link sign-ins, social logins like Google and GitHub etc, and traditional email/password authentication.

- **Secure Authentication:** Utilizes JSON Web Tokens (JWT) for secure user authentication and session management.

- **Email Verification:** Sends verification emails to confirm user identity during registration.

- **Password Reset:** Includes a built-in feature for resetting passwords via email.

- **User Account Management:** Easy-to-use tools for user registration, login, and account updates.

- **Secure Cookies:** Supports cookie-based authentication for secure, persistent sessions.

- **Database Integration:** Seamlessly integrates with MySQL for storing and managing user data.

- **Minimal Setup:** Quick and simple configuration for developers with customizable options.

- **Scalable & Flexible:** Easily customizable to suit different project needs and scalable for larger applications.

## Usage

**Client Setup**

```bash
import simpliauth from "simpliauthjs";

const simpliClient = simpliauth.client("https://your-server.com", "your-token-name");
```

**Server Setup**

```bash
import express from "express";
import mysql from "mysql2";
import simpliauth, { simpliMysql, simpliMailer } from "simpliauthjs";

const connection = await mysql.createConnection({ /* MySQL Config */ });

const database = simpliMysql(connection);
const mailer = simpliMailer({ /* Mailer Config */ });

app = express();

const simpliServer = simpliauth().server(
  "https://your-client.com",
  "https://your-server.com",
  "https://your-client.com/dashboard",
  database,
  mailer,
  "your_jwt_secret_key",
  "1h"
);

app.use("/auth", simpliServer.route());
app.listen(port, () => console.log(`Server is running at Port:${port}`));

```

## Documentation

[Documentation](https://axkitraj.github.io/simpliauthjs/)

## Authors

- [SimpliAuth](https://)
- [@axkitraj](https://github.com/axkitraj)

## License

SimpliAuthJs is distributed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for more info.
