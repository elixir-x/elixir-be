## Elixir Platform

### Installation (for local development)

#### Certificates
+ install [mkcert](https://github.com/FiloSottile/mkcert) and generate localhost certificates, put them in the root of the project.
+ rename your certificates to `cert.pem` and `cert-key.pem` respectively.
+ run `yarn dev` to start the backend project, you're all set up!

#### Environment Variables
+ rename the `.env.example` to `.env`
+ Generate a session secret by opening your terminal and running `node`
  then running `require('crypto').randomBytes(64).toString('hex')` to generate a secret
  and put it into the `SECRET` field in the `.env` file.
### Build
+ Run `yarn build` to build the backend project.
+ You are now ready to deploy for production!