# Slidev Presentations

This repository contains multiple Slidev presentations for various topics related to agency-to-SaaS transitions and business strategies.

## Presentations

- **should-my-agency-start-saas** - A comprehensive guide to evaluating and starting your agency-to-SaaS journey
- **basecamp-case-study** - Analysis of Basecamp's journey from agency to SaaS
- **agency-to-saas-playbook** - Tactical playbook for agency founders
- **saas-for-agencies** - Overview of SaaS opportunities for agencies

## Deployment to GitHub Pages

This repository is configured to automatically deploy the `should-my-agency-start-saas` presentation to GitHub Pages.

### Setup Instructions

1. **Create a GitHub Repository**
   ```bash
   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin alpha
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - The deployment will happen automatically when you push to the `alpha` branch

3. **Access Your Presentation**
   - After the first deployment completes, your presentation will be available at:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### How It Works

The deployment is handled by a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. Installs Node.js and pnpm
2. Installs dependencies for the `should-my-agency-start-saas` presentation
3. Builds the Slidev presentation
4. Deploys the built files to GitHub Pages

### Local Development

To run the presentation locally:

```bash
cd should-my-agency-start-saas
pnpm install
pnpm dev
```

### Building for Production

```bash
cd should-my-agency-start-saas
pnpm build
```

The built files will be in the `dist/` directory.

## Configuration

The Slidev presentation is configured with:
- `routerMode: hash` for GitHub Pages compatibility
- Apple Basic theme
- Custom styling via `style.css`

## Adding More Presentations

To deploy additional presentations, you can:

1. Modify the GitHub Actions workflow to build multiple presentations
2. Create separate workflows for each presentation
3. Use a monorepo approach with different deployment paths

## License

This project is private and proprietary.
