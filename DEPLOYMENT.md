# Deployment Guide

## PNC IPE Engagement Plan

### Development Access

The component is available at:
```
http://localhost:5173/strat/pnc/pnc-ipe.html
```

**Note:** Make sure the dev server is running with `npm run dev`

### Production Build

Build files are located in the `dist/` directory:

```
dist/
├── strat/
│   └── pnc/
│       └── pnc-ipe.html          (0.61 kB)
└── assets/
    ├── pnc-ipe-DoG1UUkH.js       (19.76 kB, 5.53 kB gzipped)
    └── index-D-4qCMdh.js          (146.95 kB, 47.03 kB gzipped)
```

### Deployment Options

#### Option 1: Static Hosting (Recommended)

Deploy the entire `dist/` folder to any static hosting service:

**Netlify:**
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

**Vercel:**
1. Import your repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

**GitHub Pages:**
```bash
# Build the project
npm run build

# Deploy dist folder to gh-pages branch
npm install -g gh-pages
gh-pages -d dist
```

**AWS S3 + CloudFront:**
```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

#### Option 2: Server Deployment

If deploying to a traditional web server:

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist/` folder contents to your web server's public directory

3. Configure your web server to serve the HTML files:
   - **Nginx:** Ensure proper MIME types for `.js` and `.html` files
   - **Apache:** Enable mod_rewrite if using clean URLs

4. Access the application at:
   ```
   https://your-domain.com/strat/pnc/pnc-ipe.html
   ```

### Build Verification

To verify the build is correct:

```bash
# Type check
npm run type-check

# Build
npm run build

# Preview production build locally
npm run preview
```

### Environment Variables

No environment variables are required for this deployment.

### Dependencies

All dependencies are bundled in the production build. No Node.js runtime is required on the server.

### File Structure

```
dist/
├── strat/
│   ├── pnc/
│   │   └── pnc-ipe.html          # Entry point
│   └── solutionengineering/
│       └── ipe-playbook.html     # Other component
└── assets/
    ├── *.js                       # Bundled JavaScript
    └── *.css                      # Bundled CSS
```

### Troubleshooting

**Issue:** Blank page after deployment
- **Solution:** Check browser console for errors. Ensure all asset paths are correct and the server is configured to serve `.js` files with correct MIME type.

**Issue:** 404 errors for assets
- **Solution:** Verify the `dist/assets/` folder is deployed and accessible. Check server configuration for static file serving.

**Issue:** Component not rendering
- **Solution:** Ensure Tailwind CSS CDN is accessible (included in HTML). Check network tab for failed resource loads.

### Quick Deploy Commands

```bash
# Full build and verify
npm run type-check && npm run build && npm run preview

# Build only
npm run build

# Check build size
du -sh dist/
```

