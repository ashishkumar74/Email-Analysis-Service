# 🚀 Deploy Email Analysis System on Render

## Quick Deployment Steps

### 1. Push Code to GitHub (if not already done)
```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### 2. Deploy on Render

#### Option A: Using render.yaml (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. Click "Apply" to deploy both frontend and backend

#### Option B: Manual Deployment

**Backend Deployment:**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `email-analysis-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

**Frontend Deployment:**
1. Click "New" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `email-analysis-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

### 3. Environment Variables

**Backend Environment Variables:**
```
NODE_ENV=production
MONGODB_URI=<your-mongodb-connection-string>
PORT=10000
FRONTEND_URL=<your-frontend-url-from-render>
```

**Frontend Environment Variables:**
```
VITE_API_URL=<your-backend-url-from-render>
```

### 4. MongoDB Setup
1. Create free MongoDB Atlas account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier)
3. Create database user
4. Get connection string
5. Add to Render backend environment variables

## Expected URLs After Deployment

**Backend URL:** `https://email-analysis-backend-xxxx.onrender.com`
**Frontend URL:** `https://email-analysis-frontend-xxxx.onrender.com`

## 🔧 Troubleshooting

- **Build fails**: Check Node.js version compatibility
- **CORS errors**: Update backend CORS configuration with frontend URL
- **Database connection**: Verify MongoDB connection string
- **Cold start**: Free tier services sleep after 15 minutes of inactivity

## 📝 Post-Deployment Updates

After getting your live URLs, update:
1. Backend CORS origin with frontend URL
2. Frontend API URL with backend URL

Your Email Analysis System will be live and ready for demonstration!
