# BlockBound — GitHub Pages

This version is prepared for **GitHub Pages**.

## Uploading it

1. Create a GitHub repository.
2. Extract this ZIP and upload the files (`index.html`, `app.js`, `styles.css`, `registry.js`, and `server-icon.png`) to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save and wait for GitHub Pages to deploy.

The site is static, so it does not require Node.js or `server.js`.

### Important

GitHub Pages cannot run the original Node.js backend. Any server-side account/login functionality from the original project therefore cannot run on GitHub Pages by itself.

The current site does still use the public `mcstatus.io` API for the server-status display.
