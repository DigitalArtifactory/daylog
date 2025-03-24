# daylog

![daylog_portrait](resources/readme_portrait.jpg)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=DavidArtifacts_daylog&metric=alert_status&token=454f2e190f81f0af13315e8abff724843c1e5665)](https://sonarcloud.io/summary/new_code?id=DavidArtifacts_daylog)

✨ A board based note taking and markdown editor web app.

### Features

- **Self-Hosting:** daylog is a pure Next.js application, allowing you to host it on your own server or preferred hosting service.
- **Boards:** daylog is board-based, giving you the flexibility to organize notes by context, projects, or as folders.
- **Notes:** Your notes can be simple text or formatted using Markdown.
- **Editor:** daylog includes a Markdown editor with essential formatting options, perfect for beginners.
- **Search:** Easily find notes or boards with a single keyword using the built-in search feature.

### Production Installation

To install and run daylog in a production environment, follow these steps:
*(I'm currently working in simplifying this steps)*

1. **Clone the repository:**
  ```bash
  git clone https://github.com/DavidArtifacts/daylog.git
  cd daylog
  ```

2. **Install dependencies:**
  ```bash
  npm install
  ```

3. **Set up environment variables:**
  Create a `.env` file in the root directory and configure the necessary environment variables. Refer to `.env.example` for the required variables. 
  **Important:** by default daylog uses SQLite, you can change your conection string to a postgress or any other database engine supported by Prisma ORM. You can follow their [guide](https://www.prisma.io/docs/orm/reference/connection-urls) to achieve this step.

4. **Edit the Prisma schema:**
  Open the `prisma/schema.prisma` file and update the `datasource` provider to your desired database engine. For example, to use PostgreSQL, modify the provider and connection URL as follows:
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  ```
  Ensure that you removed `prisma/migrations` directory and changed the `DATABASE_URL` environment variable in your `.env` file is set to the correct connection string for your database.

5. **Initialize the Prisma database:**
  ```bash
  npx prisma migrate dev --name init
  npx prisma migrate deploy
  ```

6. **Build the application:**
  ```bash
  npm run build
  ```

7. **Start the application:**
  ```bash
  npm start
  ```

8. **Configure a process manager:**
  Use a process manager like PM2 to keep your application running:
  ```bash
  npm install -g pm2
  pm2 start npm --name "daylog" -- start
  pm2 save
  pm2 startup
  ```

9. **Set up a reverse proxy:**
  Configure a reverse proxy using Nginx or another web server to forward requests to your Node.js application.

10. **Secure your application:**
  Ensure your application is served over HTTPS and configure appropriate security headers.

Your daylog application should now be running in a production environment.

### TODOs
- [ ] Improve grammar 📖
- [ ] Enhance MD editor 🖊
- [ ] Improve user security (data encryption, account recovery, email verification) 🔐
- [ ] Create breadcrumbs navigation 🚢
- [ ] Create public link sharing option ✉
- [ ] Create shared boards 📰
- [ ] Improve production deployment instructions 🛠
- [ ] And many more cool features in the future 🚀...


### Build with

- NextJS
- Prisma ORM
- Bootstrap
- Tabler UI
- Marked
- Zod
- Nodemailer
- Crypto

### External components

- qrcode.react
- relative-time-element
- input-otp

### Local Development

To set up a local development environment for daylog, follow these steps:

1. **Clone the repository:**
  ```bash
  git clone https://github.com/DavidArtifacts/daylog.git
  cd daylog
  ```

2. **Install dependencies:**
  ```bash
  npm install
  ```

3. **Set up environment variables:**
  Create a `.env` file in the root directory and configure the necessary environment variables. Refer to `.env.example` for the required variables.

5. **Initialize the Prisma dev database:**
  ```bash
  npx prisma migrate dev
  ```

4. **Run the development server:**
  ```bash
  npm run dev
  ```

Your daylog application should now be running locally at `http://localhost:3000`.

### Running Tests

To run tests for the daylog application, use the following command:
```bash
npm run test
```

This will execute the test suite and provide feedback on the application's functionality.

### Disclaimer

This project is provided "as is" without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

### License

This project is licensed under the AGPL-3.0 License. See the [LICENSE](LICENSE) file for details.


### About The Author
Hi! I'm David, and I'm glad to have you in this repo. This is my first open-source project, and there's still a lot of work to do to enhance the user experience and implement new features I have in mind.

Feel free to use it as your personal note-taking app or share it with your friends, colleagues, and family. I’d truly appreciate any feedback to improve the code in this repo or any kind of collaboration.

**Thank you!** ❤
