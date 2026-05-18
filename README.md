
# Quotation-comparision

## Environment files

- Create a `.env` file in the project root to store local environment variables (do not commit secrets). Example contents:

```
PORT=4004
NODE_ENV=development
# Add other environment variables required by your setup
```

- Create a `default-env.json` file to provide service credentials for local testing (this file is typically used by the Cloud Foundry / SAP environment emulation). Example minimal structure:

```
{
    {
  "destinations": [
    {
      "name": "S4_API",
      "url": "https://my428743-api.s4hana.cloud.sap",
      "username": "<User Name>",
      "password": "<Password>",
      "authentication": "BasicAuthentication"
    }
  ]
}
	"VCAP_SERVICES": {},
	"VCAP_APPLICATION": {}
}
```

Place `default-env.json` at the project root or in the specific module folder that requires it (for example `app/router/default-env.json` or `srv/default-env.json`) depending on your layout. Never commit real credentials—add `default-env.json` and `.env` to `.gitignore` if they contain secrets.

## Run locally with CDS

1. Install dependencies:

```bash
npm install
```

2. Start the application in watch mode (from the project root):

```bash
npx cds watch
```

`npx cds watch` will use a local `@sap/cds` installation if available, or run the globally installed `cds` CLI if you have it installed. The watch command detects `srv` and `app` modules and restarts on changes.

If you prefer the globally installed CLI, run:

```bash
cds watch
```

Troubleshooting:
- If `npx cds watch` fails, ensure `@sap/cds` is installed in `node_modules` or install the CLI globally: `npm i -g @sap/cds`.
- Check that your `default-env.json` and `.env` files contain the expected variables for any external services you use.
