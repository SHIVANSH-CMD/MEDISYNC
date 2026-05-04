# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository layout
- `backend`: Express + MongoDB API for user, doctor, and admin workflows.
- `frontend`: Patient-facing React (Vite) web app.
- `admin`: Admin/doctor React (Vite) web app.

## Development commands
Run commands from each package directory (`backend`, `frontend`, `admin`).

### Backend (`backend`)
- Install deps: `npm install`
- Run dev server (nodemon): `npm run server`
- Run production-style server: `npm start`

### Frontend (`frontend`)
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Preview production build: `npm run preview`

### Admin (`admin`)
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Preview production build: `npm run preview`

### Tests
- There are currently no first-party test scripts configured in `backend/package.json`, `frontend/package.json`, or `admin/package.json`.
- There are no app test files in `frontend/src` or `admin/src`; backend test matches are only inside `backend/node_modules`.
- Single-test execution is not available until a test runner is added.

## Runtime/configuration details
- Frontend and admin use `VITE_BACKEND_URL` to call the API.
- Admin also uses `VITE_CURRENCY`.
- Backend requires environment variables referenced by code:
  - DB and auth: `MONGODB_URI`, `JWT_SECRET`, `PORT`
  - Cloudinary: `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`
  - Admin login: `ADMIN_EMAIL`, `ADMIN_PASSWORD`
  - Payments: `STRIPE_SECRET_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `CURRENCY`

## High-level architecture
### Backend API composition
- Entry point is `backend/server.js`.
- App initialization:
  - connects MongoDB (`config/mongodb.js`) and Cloudinary (`config/cloudinary.js`)
  - mounts role-specific routers:
    - `/api/user` (`routes/userRoute.js`)
    - `/api/doctor` (`routes/doctorRoute.js`)
    - `/api/admin` (`routes/adminRoute.js`)

### Data model and booking flow
- Core models:
  - `userModel` (`models/userModel.js`)
  - `doctorModel` (`models/doctorModel.js`)
  - `appointmentModel` (`models/appointmentModel.js`)
- Appointments persist both IDs (`userId`, `docId`) and denormalized snapshots (`userData`, `docData`) at booking time.
- Booking/cancellation logic updates both:
  - appointment documents
  - doctor `slots_booked` map (`slotDate -> [slotTime]`) to reserve/release availability.

### Auth and role separation
- JWT middleware injects identity into `req.body`:
  - user: `authUser` -> `userId`
  - doctor: `authDoctor` -> `docId`
  - admin: `authAdmin` validates token against `ADMIN_EMAIL + ADMIN_PASSWORD`
- Frontend/admin contexts send token headers named `token`, `aToken`, `dToken`; Express reads them as lowercase headers (`token`, `atoken`, `dtoken`).

### Payments
- User controller supports both payment providers:
  - Razorpay: order creation + verification endpoints
  - Stripe Checkout: session creation + verification endpoint
- Successful verification marks appointment `payment: true`.

### Frontend and admin app structure
- `frontend/src/main.jsx` wraps app with `BrowserRouter` + `AppContextProvider`.
- `frontend/src/context/AppContext.jsx` is the central data/auth layer for patient UI:
  - loads doctor list
  - stores user token/profile
  - provides shared API base URL and helpers to pages/components.
- `admin/src/main.jsx` composes `AdminContextProvider`, `DoctorContextProvider`, and `AppContextProvider`.
- `admin/src/App.jsx` gates routes by token presence, serving both admin and doctor dashboards in one SPA.
- Admin/doctor contexts centralize API side effects (appointments, dashboards, doctor availability/profile updates).

## Existing assistant instruction files
- No existing `AGENTS.md`, `WARP.md`, `CLAUDE.md`, `.cursorrules`, `.cursor/rules/*`, or `.github/copilot-instructions.md` were found in this repository.
