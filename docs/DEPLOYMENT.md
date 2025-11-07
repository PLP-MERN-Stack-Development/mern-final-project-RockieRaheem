# 🚀 EduLink UG - Deployment Guide

Complete guide for deploying EduLink UG to production.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Database Setup (MongoDB Atlas)](#database-setup-mongodb-atlas)
3. [Backend Deployment (Render)](#backend-deployment-render)
4. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
5. [Environment Variables](#environment-variables)
6. [Custom Domain Setup](#custom-domain-setup)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All tests pass locally
- [ ] No console errors in development
- [ ] Environment variables documented
- [ ] Database schema is finalized
- [ ] API endpoints tested
- [ ] Security headers configured
- [ ] CORS settings updated for production
- [ ] Rate limiting configured
- [ ] Error tracking setup (Sentry)
- [ ] Backup strategy planned

---

## Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** and create account
3. Verify email address

### 2. Create Cluster

1. Click **"Build a Database"**
2. Choose **"Shared"** (Free tier)
3. Select cloud provider: **AWS**
4. Select region: **Choose closest to Uganda** (e.g., Africa/Cape Town or Europe/Frankfurt)
5. Cluster Name: `edulink-ug-production`
6. Click **"Create Cluster"** (takes 3-5 minutes)

### 3. Configure Database Access

1. Go to **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `edulink-admin`
5. Password: Generate secure password (save it!)
6. Database User Privileges: **"Atlas Admin"**
7. Click **"Add User"**

### 4. Configure Network Access

1. Go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

> ⚠️ **Note**: For better security, use specific IPs in production

### 5. Get Connection String

1. Go to **"Database"** tab
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy connection string:
   ```
   mongodb+srv://edulink-admin:<password>@edulink-ug-production.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name: `/edulink-ug` before the `?`
   ```
   mongodb+srv://edulink-admin:YOUR_PASSWORD@edulink-ug-production.xxxxx.mongodb.net/edulink-ug?retryWrites=true&w=majority
   ```

### 6. Initialize Database

Run this locally to populate initial data:

```bash
cd backend
node scripts/seed.js  # If you have a seed script
```

---

## Backend Deployment (Render)

### 1. Create Render Account

1. Go to [Render](https://render.com)
2. Sign up with **GitHub**
3. Authorize Render to access your repositories

### 2. Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `mern-final-project-RockieRaheem`
3. Configure:
   - **Name**: `edulink-ug-api`
   - **Region**: Choose closest to Uganda
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for better performance)

### 3. Add Environment Variables

In Render dashboard, go to **"Environment"** tab and add:

```bash
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://...  # Your Atlas connection string
JWT_SECRET=your_production_jwt_secret_here
JWT_EXPIRE=7d
OPENAI_API_KEY=your_openai_key
CLIENT_URL=https://edulink-ug.vercel.app  # Your Vercel URL
```

**Generate secure JWT_SECRET**:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Your API will be live at: `https://edulink-ug-api.onrender.com`

### 5. Test API

```bash
curl https://edulink-ug-api.onrender.com/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-11-07T..."
}
```

---

## Frontend Deployment (Vercel)

### 1. Create Vercel Account

1. Go to [Vercel](https://vercel.com)
2. Sign up with **GitHub**

### 2. Import Project

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository: `mern-final-project-RockieRaheem`
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Add Environment Variables

In Vercel project settings, add:

```bash
VITE_API_URL=https://edulink-ug-api.onrender.com
VITE_SOCKET_URL=https://edulink-ug-api.onrender.com
VITE_APP_TITLE=EduLink UG
VITE_ENV=production
```

### 4. Deploy

1. Click **"Deploy"**
2. Wait for build and deployment (3-5 minutes)
3. Your site will be live at: `https://edulink-ug.vercel.app`

### 5. Update Backend CORS

Go back to Render and update `CLIENT_URL`:

```bash
CLIENT_URL=https://edulink-ug.vercel.app
```

Redeploy backend for changes to take effect.

---

## Environment Variables

### Backend Environment Variables

| Variable         | Description         | Example                         |
| ---------------- | ------------------- | ------------------------------- |
| `NODE_ENV`       | Environment mode    | `production`                    |
| `PORT`           | Server port         | `5001`                          |
| `MONGODB_URI`    | Database connection | `mongodb+srv://...`             |
| `JWT_SECRET`     | JWT signing secret  | `random_64_char_string`         |
| `JWT_EXPIRE`     | Token expiration    | `7d`                            |
| `OPENAI_API_KEY` | OpenAI API key      | `sk-...`                        |
| `CLIENT_URL`     | Frontend URL (CORS) | `https://edulink-ug.vercel.app` |

### Frontend Environment Variables

| Variable          | Description     | Example                               |
| ----------------- | --------------- | ------------------------------------- |
| `VITE_API_URL`    | Backend API URL | `https://edulink-ug-api.onrender.com` |
| `VITE_SOCKET_URL` | Socket.IO URL   | `https://edulink-ug-api.onrender.com` |
| `VITE_APP_TITLE`  | App title       | `EduLink UG`                          |
| `VITE_ENV`        | Environment     | `production`                          |

---

## Custom Domain Setup

### Option 1: Use Vercel Domain

Your site is automatically available at:

- `https://edulink-ug.vercel.app`
- `https://edulink-ug-git-main-your-username.vercel.app`

### Option 2: Add Custom Domain

#### For Frontend (Vercel)

1. Buy domain from registrar (Namecheap, GoDaddy, etc.)
2. In Vercel project → **"Settings"** → **"Domains"**
3. Add your domain: `edulink-ug.com`
4. Follow DNS configuration instructions
5. Add DNS records:

   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

6. Wait for DNS propagation (up to 48 hours)

#### For Backend (Render)

1. In Render service → **"Settings"** → **"Custom Domains"**
2. Add: `api.edulink-ug.com`
3. Add DNS record:
   ```
   Type: CNAME
   Name: api
   Value: edulink-ug-api.onrender.com
   ```

---

## CI/CD Setup

### GitHub Actions (Already Configured)

Your repository includes CI/CD workflow that:

- Runs on every push to `main`
- Executes tests
- Builds both frontend and backend
- Deploys automatically

### Required GitHub Secrets

Go to GitHub repo → **"Settings"** → **"Secrets and variables"** → **"Actions"**

Add these secrets:

- `MONGODB_TEST_URI`: Test database URI
- `JWT_SECRET`: Production JWT secret
- `VITE_API_URL`: Production API URL

---

## Monitoring & Maintenance

### Application Monitoring

#### 1. Render Monitoring

- **Dashboard**: View logs, metrics, CPU/memory usage
- **Logs**: Real-time application logs
- **Metrics**: Response times, error rates

#### 2. Set Up Sentry (Error Tracking)

1. Create account at [Sentry.io](https://sentry.io)
2. Create new project: **Node.js** (backend) and **React** (frontend)
3. Get DSN keys
4. Add to environment variables
5. Install Sentry SDK:

**Backend**:

```bash
npm install @sentry/node
```

**Frontend**:

```bash
npm install @sentry/react
```

#### 3. Set Up UptimeRobot (Uptime Monitoring)

1. Go to [UptimeRobot](https://uptimerobot.com)
2. Add monitor:
   - Type: HTTP(s)
   - URL: `https://edulink-ug-api.onrender.com/api/health`
   - Interval: 5 minutes
3. Set up email alerts

### Database Monitoring

1. **MongoDB Atlas Monitoring**:

   - Dashboard shows connections, operations, storage
   - Set up alerts for high CPU, storage, connections

2. **Automated Backups**:
   - Enable in Atlas: **"Backup"** tab
   - Schedule: Daily
   - Retention: 30 days

---

## Performance Optimization

### Backend Optimizations

1. **Enable Compression**:
   Already configured in `server.js` with `compression` middleware

2. **Database Indexing**:

   ```javascript
   // In models
   QuestionSchema.index({ subject: 1, educationLevel: 1 });
   QuestionSchema.index({ createdAt: -1 });
   ```

3. **Caching** (Future Enhancement):
   - Add Redis for frequently accessed data
   - Cache question lists, user profiles

### Frontend Optimizations

1. **Code Splitting**:

   ```javascript
   const Questions = lazy(() => import("./pages/Questions"));
   ```

2. **Image Optimization**:

   - Use WebP format
   - Implement lazy loading
   - Use CDN (Cloudinary)

3. **Performance Monitoring**:
   - Use Lighthouse CI
   - Monitor Core Web Vitals

---

## Security Checklist

- [ ] HTTPS enabled (automatic with Vercel/Render)
- [ ] Environment variables secured
- [ ] JWT secrets are strong and unique
- [ ] CORS configured for specific origins
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS protection (Helmet middleware)
- [ ] File upload restrictions
- [ ] Authentication required for sensitive endpoints
- [ ] Database access from specific IPs only (optional)

---

## Troubleshooting

### Common Issues

#### 1. "Cannot connect to database"

**Solution**:

- Check MongoDB Atlas cluster is running
- Verify connection string is correct
- Check IP whitelist includes `0.0.0.0/0`
- Ensure database user has correct permissions

#### 2. "CORS Error"

**Solution**:

- Update `CLIENT_URL` in backend environment variables
- Include Vercel production URL
- Redeploy backend after changes

#### 3. "Application not loading"

**Solution**:

- Check Render service status
- View logs for errors
- Verify all environment variables are set
- Test API health endpoint

#### 4. "Socket.IO not connecting"

**Solution**:

- Ensure `VITE_SOCKET_URL` matches backend URL
- Check firewall settings
- Verify Socket.IO is initialized in backend

---

## Backup & Recovery

### Database Backup

**Automated** (MongoDB Atlas):

- Configured in Atlas dashboard
- Daily snapshots
- 30-day retention

**Manual**:

```bash
mongodump --uri="mongodb+srv://..." --out=./backup
```

### Code Backup

- **Primary**: GitHub repository
- **Secondary**: Local clones on team machines
- **Releases**: Git tags for each version

### Restore Procedure

1. **Database**:

   ```bash
   mongorestore --uri="mongodb+srv://..." ./backup
   ```

2. **Application**:
   - Revert to previous Git commit
   - Redeploy from GitHub

---

## Post-Deployment Tasks

- [ ] Test all features in production
- [ ] Update README with live URLs
- [ ] Create demo video
- [ ] Announce launch to users
- [ ] Set up support email
- [ ] Monitor logs for first 24 hours
- [ ] Gather user feedback
- [ ] Plan next release

---

## Support

**Deployment Issues?**

- Email: deploy@edulink-ug.com
- GitHub Issues: [Create an issue](https://github.com/PLP-MERN-Stack-Development/mern-final-project-RockieRaheem/issues)

---

**Congratulations on deploying EduLink UG!** 🎉

_For God and My Country_ 🇺🇬
