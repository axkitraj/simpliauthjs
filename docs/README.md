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

- **Database Integration:** Seamlessly integrates with MongoDb, MySQL and PostgresSQL for storing and managing user data.

- **Minimal Setup:** Quick and simple configuration for developers with customizable options.

- **Scalable & Flexible:** Easily customizable to suit different project needs and scalable for larger applications.

## Client Setup

To get started with SimpliAuthJs Client, follow these steps:

#### Initialization

```bash
import simpliauth from "simpliauthjs";

const simpliClient = simpliauth.client("https://your-server.com", "your-token-name");
```

#### API References

**Getting the auth user :**

```bash
const { user, error } = simpliClient.AuthUser();

if(!error.error){
    console.log(user);
    ({/* your logic */})
}else{
    console.log(error.message);
}
```

**SignIn :**

```bash
const { error } = simpliClient.VerifyEmail('your-email@xyz.com');

if(!error.error){
    const { token, error } = simpliClient.SignIn('your-email@xyz.com','password','verification-code');

    if(!error.error){
        console.log(user);
        ({/* your logic */})
    }
}
```

**SignUp :**

```bash
const { error } = simpliClient.VerifyEmail('your-email@xyz.com');

if(!error.error){
    const { token, error } = simpliClient.SignUp('your-email@xyz.com','password','verification-code','username','profile_image');

    if(!error.error){
        console.log(user);
        ({/* your logic */})
    }
}
```

**Magic Link SignIn :**

```bash
const { error } = simpliClient.SignInWithMagicLink('your-email@xyz.com');

if(!error.error){
    ({/* your logic */})
}
```

**Social SignIn :**

```bash
const { error } = simpliClient.SocialSignInWith('google');

if(!error.error){
    ({/* your logic */})
}
```

## Server Setup

To get started with SimpliAuthJs Server, follow these steps:

#### Initialization

```bash
import express from "express";
({/* import database of your choice. eg: mysql */})

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

#### API Reference

**Get Auth User :**

```http
  GET /auth/user
```

| Parameter    | Type     | Description                                    |
| :----------- | :------- | :--------------------------------------------- |
| `auth_token` | `string` | Authentication token in header **(required).** |

Auto fetch your auth token, if using SimpliAuthJs Client.

**SignIn :**

```http
  POST /auth/signin
```

| Parameter          | Type     | Description                                                 |
| :----------------- | :------- | :---------------------------------------------------------- |
| `email`            | `string` | **Required**. Email address for authentication.             |
| `password`         | `string` | **Required**. Account password.                             |
| `verificationCode` | `string` | **Required**. Verification code sent to the provided email. |

**SignUp :**

```http
  POST /auth/signup
```

| Parameter          | Type     | Description                                                 |
| :----------------- | :------- | :---------------------------------------------------------- |
| `email`            | `string` | **Required**. Email address for authentication.             |
| `password`         | `string` | **Required**. Account password.                             |
| `verificationCode` | `string` | **Required**. Verification code sent to the provided email. |
| `userName`         | `string` | Name of user, Not mandatory.                                |
| `image`            | `string` | Profile image of user, Not mandatory.                       |

**Verify User Email :**

```http
  POST /auth/email-validation
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `email`   | `string` | **Required**. Email address for authentication. |

**Magic Link SignIn :**

```http
  POST /auth/magic-signin
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `email`   | `string` | **Required**. Email address for authentication. |

**Social SignIn :**

```http
  GET /auth/google
```

No parameter required.

**Your app deserves the best—install SimpliAuthJs and unlock endless possibilities!**

## Authors

- **[SimpliAuth](https://simpliauth.netlify.app)**
- **[Ankit Raj](https://github.com/axkitraj)**

## Links

[![github](https://img.shields.io/badge/github-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/axkitraj/simpliauthjs/) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/axkit-raj/) [![portfolio](https://img.shields.io/badge/portfolio-ff9800?style=for-the-badge&logo=portfolio&logoColor=white)](https://github.com/axkitraj/simpliauthjs/) [![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=x&logoColor=white)](https://x.com/axkitraj/) [![support](https://img.shields.io/badge/support-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/axkitraj)

## Donate

Please consider donating if you think SimpliAuthJs is helpful to you or that my work is valuable. I am happy if you can help me [buy me a cup of coffee](https://buymeacoffee.com/axkitraj). :hearts:

## License

SimpliAuthJs is distributed under the [MIT License.](https://github.com/axkitraj/simpliauthjs/blob/main/LICENCE)

####

Copyright (c) 2025 [SimpliAuth.](https://simpliauth.netlify.app)
