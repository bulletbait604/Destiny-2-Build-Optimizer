# Deployment Guide: Destiny 2 Build Optimizer

## 🚀 Deploy to GitHub & Vercel

### Step 1: Push to GitHub

#### 1.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: Destiny 2 Build Optimizer with class selection"
```

#### 1.2 Create GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" button in the top right and select "New repository"
3. Name it: `destiny-2-build-optimizer`
4. Description: `AI-Powered Destiny 2 Build Optimization Tool`
5. Make it **Public** (required for Vercel free tier)
6. **Don't** initialize with README (we already have files)
7. Click "Create repository"

#### 1.3 Push to GitHub
```bash
# Add your repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/destiny-2-build-optimizer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### 2.1 Connect Vercel to GitHub
1. Go to [Vercel](https://vercel.com) and sign up with your GitHub account
2. Click "Add New..." → "Project"
3. Import your `destiny-2-build-optimizer` repository
4. Vercel will automatically detect it's a Next.js app

#### 2.2 Configure Deployment Settings
```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### 2.3 Environment Variables (if needed)
For now, no environment variables are required. Skip this step.

#### 2.4 Deploy
1. Click "Deploy"
2. Wait for deployment to complete (usually 2-3 minutes)
3. Your app will be live at: `https://destiny-2-build-optimizer.vercel.app`

### Step 3: Custom Domain (Optional)

#### 3.1 Add Custom Domain
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `d2-optimizer.com`)
4. Follow DNS instructions provided by Vercel

### Step 4: Future Updates

#### 4.1 Make Changes Locally
```bash
# Make your changes
git add .
git commit -m "Added new feature"
git push
```

#### 4.2 Automatic Deployments
- Vercel will automatically redeploy when you push to GitHub
- No manual deployment needed!

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Build Fails on Vercel
```bash
# Check if all dependencies are in package.json
npm ls

# Install missing dependencies
npm install [package-name]
```

#### Tailwind CSS Not Working
```bash
# Ensure tailwind.config.js exists and is correct
# Check that globals.css imports Tailwind
```

#### TypeScript Errors
```bash
# Check tsconfig.json has correct paths
npm run build  # Test build locally
```

#### 404 Errors After Deploy
- Ensure `next.config.js` is properly configured
- Check that all pages are in `/src/app/` directory

### Useful Commands

#### Local Testing Before Deploy
```bash
# Build locally to test
npm run build

# Start production build locally
npm start

# Type checking
npx tsc --noEmit
```

#### Git Commands
```bash
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes
git pull
```

## 📋 Pre-Deployment Checklist

- [ ] App runs locally with `npm run dev`
- [ ] `npm run build` completes without errors
- [ ] All pages load correctly
- [ ] Responsive design works on mobile
- [ ] No console errors in browser
- [ ] Git repository is clean (no uncommitted changes)
- [ ] README.md is updated (optional)

## 🎯 Next Steps After Deployment

1. **Share your app**: Send the Vercel URL to friends
2. **Add analytics**: Consider Google Analytics or Vercel Analytics
3. **Monitor performance**: Use Vercel's speed insights
4. **Add features**: Continue building your build optimizer

## 📞 Support

If you run into issues:
- Check Vercel's deployment logs
- Review GitHub Actions (if enabled)
- Test locally with `npm run build && npm start`
- Check the browser console for errors

---

**Your Destiny 2 Build Optimizer will be live at:**
`https://destiny-2-build-optimizer.vercel.app`

Good luck, Guardian! 🛡️
