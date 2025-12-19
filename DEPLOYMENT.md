# 🚀 Deployment Guide for ShopSphere E-Commerce

## Frontend Deployment (Vercel/Netlify)

### Option 1: Vercel Deployment
1. **Push your code to GitHub**
2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `Mernfrontintegration` folder as root directory

3. **Environment Variables:**
   - Add `VITE_API_URL` with your backend URL
   - Example: `https://your-backend-domain.herokuapp.com`

4. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Option 2: Netlify Deployment
1. **Build the project locally:**
   ```bash
   cd Mernfrontintegration
   npm run build
   ```

2. **Deploy to Netlify:**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository

3. **Environment Variables:**
   - Go to Site Settings > Environment Variables
   - Add `VITE_API_URL` with your backend URL

## Backend Deployment (Heroku/Railway)

### Option 1: Heroku Deployment
1. **Install Heroku CLI**
2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create Heroku app:**
   ```bash
   cd Mernbackintegration
   heroku create your-app-name
   ```

4. **Set Environment Variables:**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   heroku config:set PORT=5000
   ```

5. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 2: Railway Deployment
1. **Go to [railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Select the `Mernbackintegration` folder**
4. **Add Environment Variables:**
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: 5000

## Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account:**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create a free cluster

2. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

3. **Whitelist IP Addresses:**
   - Go to Network Access
   - Add IP Address: `0.0.0.0/0` (allow from anywhere)

## Environment Variables Summary

### Frontend (.env)
```
VITE_API_URL=https://your-backend-domain.com
```

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
PORT=5000
NODE_ENV=production
```

## Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] API calls work (check Network tab in DevTools)
- [ ] Products display properly
- [ ] Buy Now functionality works
- [ ] Cart functionality works
- [ ] Login/Logout works
- [ ] Add Product functionality works
- [ ] Database operations work

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure your backend has proper CORS configuration
   - Add your frontend domain to allowed origins

2. **API Not Found:**
   - Check if `VITE_API_URL` is set correctly
   - Verify backend is deployed and running

3. **Database Connection:**
   - Verify MongoDB URI is correct
   - Check if IP is whitelisted in MongoDB Atlas

4. **Build Errors:**
   - Run `npm run build` locally to check for errors
   - Fix any TypeScript/ESLint errors

## Performance Optimization

1. **Enable Gzip Compression**
2. **Use CDN for images**
3. **Implement lazy loading**
4. **Optimize bundle size**
5. **Add service worker for caching**

## Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files
   - Use platform-specific environment variable settings

2. **API Security:**
   - Implement rate limiting
   - Add input validation
   - Use HTTPS only

3. **Database Security:**
   - Use strong passwords
   - Limit database access
   - Regular backups

## Monitoring

1. **Frontend Monitoring:**
   - Vercel Analytics
   - Google Analytics
   - Error tracking (Sentry)

2. **Backend Monitoring:**
   - Heroku metrics
   - Database monitoring
   - API response times

---

**Need Help?** 
- Check the console for errors
- Verify all environment variables are set
- Test API endpoints directly
- Check deployment logs