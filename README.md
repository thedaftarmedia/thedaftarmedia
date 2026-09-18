# Here are your Instructions

## Convex backend setup

The backend is a JavaScript Convex project. Convex stores contact form leads in the `leads` table and exposes HTTP actions compatible with the frontend at `/api/` and `/api/leads`.

1. Create a project at [convex.dev](https://www.convex.dev/) and copy its deployment URL when prompted.
2. Copy the environment templates:

	```powershell
	Copy-Item backend\.env.example backend\.env
	Copy-Item frontend\.env.example frontend\.env
	```

3. Install backend dependencies and connect the local Convex project:

	```powershell
	cd backend
	npm install
npx convex dev
	```

	When prompted, select the Convex project you created. This generates `backend/convex/_generated` and prints the HTTP actions URL ending in `.convex.site`.

4. Set that HTTP actions URL in `frontend/.env`:

	```env
	REACT_APP_BACKEND_URL=https://your-deployment.convex.site
	```

5. In a second terminal, install and start the frontend:

	```powershell
	cd frontend
npm install
npm start
	```

The frontend runs at `http://localhost:3000`. The Convex API health check is `${REACT_APP_BACKEND_URL}/api`, and submitted forms are stored in the Convex `leads` table.
