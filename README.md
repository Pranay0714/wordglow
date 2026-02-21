# WordGlow

Lightweight AI-powered grammar enhancer built with Node.js, Express and EJS.

## What this repo contains
- `app.js` - main Express app
- `views/` - EJS templates (`index.ejs`, `contact.ejs`)
- `package.json` - project metadata and dependencies

## Prerequisites
- Node.js (>= 16) and `npm`

## Install and run locally

```bash
npm install
node app.js
# open http://localhost:3000 (or the port configured in `app.js`)
```

## Publish this project to GitHub

1. Initialize a local git repo (if you haven't already):

```bash
git init
git add .
git commit -m "Initial commit"
```

2a. Create a new repository on GitHub via the website, then add the remote and push:

```bash
git remote add origin https://github.com/<your-username>/ai-grammer.git
git branch -M main
git push -u origin main
```

2b. Or use the GitHub CLI (`gh`) to create and push in one step:

```bash
gh repo create <your-username>/ai-grammer --public --source=. --remote=origin --push
```

3. After pushing, set repository details (description, topics, README) on GitHub as desired.

## Notes
- Replace `<your-username>` with your GitHub username in the remote URL above.
- Add a `.env` file for any secrets — `.env` is ignored by `.gitignore`.
