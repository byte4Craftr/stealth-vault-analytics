# Vercel Deployment Guide for Stealth Vault Analytics

This guide provides step-by-step instructions for deploying the Stealth Vault Analytics application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Domain name (optional, for custom domain)

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" or "Import Project"
   - Select "Import Git Repository"
   - Choose `byte4Craftr/stealth-vault-analytics`
   - Click "Import"

### 3. Configure Project Settings

#### Framework Preset
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in Vercel dashboard:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
```

**How to add environment variables:**
1. In project settings, go to "Environment Variables"
2. Click "Add New"
3. Add each variable with its value
4. Make sure to add to "Production", "Preview", and "Development" environments

### 4. Deploy

1. **Deploy Now**
   - Click "Deploy" button
   - Wait for the build process to complete (usually 2-3 minutes)

2. **Monitor Build Logs**
   - Watch the build logs for any errors
   - Common issues and solutions:
     - **Build timeout**: Increase build timeout in settings
     - **Memory issues**: Upgrade to Pro plan if needed
     - **Dependency errors**: Check package.json for compatibility

### 5. Post-Deployment Configuration

#### Custom Domain (Optional)
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

#### Performance Optimization
1. **Enable Edge Functions** (if needed)
2. **Configure Caching**:
   - Static assets: 1 year
   - API routes: 1 hour
   - HTML: 1 hour

### 6. Environment-Specific Configurations

#### Production Environment
```env
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
```

#### Preview Environment
Use the same environment variables as production for consistency.

#### Development Environment
```env
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
```

## Deployment Checklist

- [ ] Repository is pushed to GitHub
- [ ] Vercel project is created and connected
- [ ] Environment variables are configured
- [ ] Build settings are correct
- [ ] Initial deployment is successful
- [ ] Custom domain is configured (if applicable)
- [ ] SSL certificate is active
- [ ] Performance monitoring is set up

## Troubleshooting

### Common Issues

#### 1. Build Failures
**Error**: `Module not found` or `Import error`
**Solution**: 
- Check all imports in your code
- Ensure all dependencies are in package.json
- Verify file paths are correct

#### 2. Environment Variables Not Working
**Error**: `process.env.VITE_* is undefined`
**Solution**:
- Ensure variables start with `VITE_`
- Check variable names match exactly
- Redeploy after adding variables

#### 3. Wallet Connection Issues
**Error**: Wallet not connecting on production
**Solution**:
- Verify WalletConnect Project ID is correct
- Check RPC URL is accessible
- Ensure network configuration matches

#### 4. Performance Issues
**Error**: Slow loading times
**Solution**:
- Enable Vercel's Edge Network
- Optimize images and assets
- Use Vercel's Analytics for insights

### Performance Optimization Tips

1. **Enable Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```

2. **Optimize Images**
   - Use WebP format
   - Implement lazy loading
   - Use Vercel's Image Optimization

3. **Code Splitting**
   - Use dynamic imports
   - Implement route-based splitting
   - Optimize bundle size

## Monitoring and Maintenance

### 1. Set Up Monitoring
- Enable Vercel Analytics
- Set up error tracking (Sentry)
- Monitor performance metrics

### 2. Regular Updates
- Keep dependencies updated
- Monitor security vulnerabilities
- Update environment variables as needed

### 3. Backup Strategy
- Regular database backups (if applicable)
- Code repository backups
- Environment variable documentation

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive data to repository
   - Use Vercel's secure environment variable storage
   - Rotate API keys regularly

2. **HTTPS**
   - Vercel provides automatic HTTPS
   - Ensure all external resources use HTTPS

3. **Content Security Policy**
   - Configure CSP headers
   - Restrict external resource loading

## Support and Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **Project Repository**: [github.com/byte4Craftr/stealth-vault-analytics](https://github.com/byte4Craftr/stealth-vault-analytics)

## Deployment URLs

After successful deployment, you'll receive:
- **Production URL**: `https://stealth-vault-analytics.vercel.app`
- **Preview URLs**: Generated for each branch/PR
- **Custom Domain**: Your configured domain (if applicable)

## Next Steps

1. Test all functionality on the deployed site
2. Set up monitoring and analytics
3. Configure custom domain (if needed)
4. Set up automated deployments for future updates
5. Document any custom configurations

---

**Note**: This deployment guide is specific to the Stealth Vault Analytics project. Adjust configurations as needed for your specific requirements.
