SPA History API Routing — Deployment Notes

When using the History API for client-side navigation (clean URLs like /projects or /playground), the web server must be configured to serve the same `index.html` page for all routes handled by the SPA.

Why: When a user requests `/projects` directly, the server must return `index.html` so the client-side router can take over and render the correct view.

Common server configurations:

- Netlify
  - Create a `_redirects` file at the site root with:
    ```
    /*    /index.html   200
    ```

- GitHub Pages
  - Use a `404.html` that loads the SPA and redirects to the correct route (common workaround).

- Nginx
  - Add a rule in your server block:
    ```nginx
    location / {
      try_files $uri $uri/ /index.html;
    }
    ```

- Apache (.htaccess)
  - Add:
    ```apache
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    ```

Notes & Security
- Make sure to still allow static assets (CSS/JS) to be served by file path; the try_files rules above do this by checking for existing files first.
- If you use a CDN or reverse proxy, configure similar fallback rules.

Local testing
- While developing locally, you can use simple servers that support SPA fallback (e.g., `npx serve -s` or `python -m http.server` with a middleware). Netlify CLI is also convenient: `netlify dev`.

