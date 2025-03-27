export const magicLinkTemplate = (sender, loginLink, userName) => `
<!DOCTYPE html>
<html>

<head>
    <title>Sign In Email</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 24px;
            color: #333;
        }

        .bold {
            font-weight: 600;
            color: #333;
        }

        .content {
            font-size: 16px;
            color: #555;
        }

        .button {
            text-align: center;
            margin-top: 20px;
        }

        .button a {
            background-color: #ff9800;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #aaa;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <a href="">
                <img src="https://i.postimg.cc/P58fTnyJ/simpliauth-logo.png" alt="">
            </a>
            <h1>Welcome Back!</h1>
        </div>
        <div class="content">
            <p class="bold">Hello ${userName},</p>
            <p>You're just one click away from signing in to <span class="bold">${sender}.</span> Click the button below
                to proceed
                with
                signing in:</p>
        </div>
        <div class="button">
            <a href="${loginLink}">Sign in</a>
        </div>
        <div class="content">
            <p>If you did not request this sign-in attempt, please ignore this email.</p>
            <p> Thank you for using our service!</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${sender}. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
`;
export const signupTemplate = (sender, confirmationLink, userName) => `
<!DOCTYPE html>
<html>

<head>
    <title>Sign-Up Confirmation Email.</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }

        img {
            width: 40px;
            height: 40px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 24px;
            color: #333;
        }

        .bold {
            font-weight: 600;
            color: #333;
        }

        .content {
            font-size: 16px;
            color: #555;
        }

        .button {
            text-align: center;
            margin-top: 20px;
        }

        .button a {
            background-color: #ff9800;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #aaa;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <a href="">
                <img src="https://i.postimg.cc/P58fTnyJ/simpliauth-logo.png" alt="">
            </a>
            <h1>Welcome to ${sender}!</h1>
        </div>
        <div class="content">
            <p class="bold">Hello ${userName},</p>
            <p> To complete your registration and activate your account, please confirm your email address by clicking
                the button below:
            </p>
        </div>
        <div class="button">
            <a href="${confirmationLink}">Confirm my email</a>
        </div>
        <div class="content">
            <p>If you did not sign up for this account, please ignore this email. Your account will not be activated.
            </p>
            <p>Thank you for joining us!</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${sender}. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
`;
export const otpTemplate = (sender, otp) => `
<!DOCTYPE html>
<html>

<head>
    <title>Email Verification</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }

        img {
            width: 40px;
            height: 40px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 24px;
            color: #333;
        }

        .bold {
            font-weight: 600;
            color: #333;
        }

        .content {
            font-size: 16px;
            color: #555;
        }

        .otp-box {
            text-align: center;
        }

        .otp {
            display: inline-block;
            background: #f0f0f0;
            padding: 10px;
            border-radius: 5px;
            font-size: 24px;
            font-weight: 600;
            color: #ff9800;
            margin: 6px 0;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #aaa;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <a href="">
                <img src="https://i.postimg.cc/P58fTnyJ/simpliauth-logo.png" alt="">
            </a>
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <p class="bold">Hello,</p>
            <p>
                Thank you for registering with <span class="bold">${sender}.</span> To complete your email verification,
                please use the
                following verification code:
            </p>
        </div>
        <div class='otp-box'>
            <div class="otp">${otp}</div>
        </div>
        <div class="content">
            <p>This code is valid for the next 10 minutes. If you did not request this verification, please disregard
                this email.</p>
            <p>Thank you for joining us!</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${sender}. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
`;
export const alertChangeTemplate = (sender, changeType, changeDate, userName) => `
<!DOCTYPE html>
<html>

<head>
    <title>${changeType} Change Notification</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }

        img {
            width: 40px;
            height: 40px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 24px;
            color: #333;
        }

        .bold {
            font-weight: 600;
            color: #333;
        }

        .content {
            font-size: 16px;
            color: #555;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #aaa;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <a href="">
                <img src="https://i.postimg.cc/P58fTnyJ/simpliauth-logo.png" alt="">
            </a>
            <h1>${changeType} Change Notification</h1>
        </div>
        <div class="content">
            <p class="bold">Hello ${userName},</p>
            <p class="alert-text">We wanted to inform you that your ${changeType} has been successfully changed for your
                account with <span class="bold">${sender}</span> at ${changeDate}.</p>
        </div>
        <div class="content">
            <p>If you did not initiate this change, please contact our support team immediately to secure your account.
            </p>
            <p>Thank you!</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${sender}. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
`;
export const welcomeTemplate = (sender, link, userName) => `
<!DOCTYPE html>
<html>

<head>
    <title>Welcome to ${sender}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }

        img {
            width: 40px;
            height: 40px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 24px;
            color: #333;
        }

        .bold {
            font-weight: 600;
            color: #333;
        }

        .button {
            text-align: center;
            margin-top: 20px;
        }

        .button a {
            background-color: #ff9800;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }

        .content {
            font-size: 16px;
            color: #555;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #aaa;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <a href="">
                <img src="https://i.postimg.cc/P58fTnyJ/simpliauth-logo.png" alt="">
            </a>
            <h1>Welcome to ${sender}!</h1>
        </div>
        <div class="content">
            <p class="bold">Hello ${userName},</p>
            <p>We are excited to have you join us at <span class="bold">${sender}.</span> Thank you for signing
                up! Your journey with us starts now, and we're here to make it amazing.</p>
            <p>If you have any questions, feel free to reach out to our support team. We're
                happy to assist you!</p>
        </div>
        <div class="button">
            <a href="${link}">Get Started.</a>
        </div>
        <div class="content">
            <p>Thank you!</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${sender}. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
`;
