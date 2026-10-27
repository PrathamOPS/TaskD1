# DEV@Deakin — Task D1 Subscription

This project extends the existing DEV@Deakin React/Vite app for SIT313 D1. It includes Firebase Authentication, session-aware navigation, a Free/Paid pricing page, a validated demo upgrade modal, and Firestore user-plan persistence. Creating a Question or Article saves it in the Firestore `posts` collection.

## Setup

1. Install Node.js (LTS) and run `npm install` in this folder.
2. Copy `.env.example` to `.env` and fill in the Firebase web-app config from your Firebase project.
3. In Firebase Console, enable **Authentication → Email/Password** and create a **Cloud Firestore** database.
4. Review `firestore.rules` and publish the rules in Firebase Console → Firestore Database → Rules.
5. Run `npm run dev` and open the local URL Vite prints.

## D1 features

- Session state is tracked with Firebase `onAuthStateChanged` and is shown in the navigation bar.
- Login/logout use Firebase Authentication; logout clears the active Firebase session.
- Pricing compares Free and Paid features.
- Only signed-in Free users can start the upgrade flow. Signed-out users are prompted to log in, and Paid users cannot upgrade again.
- The upgrade modal validates the name, 16-digit card number, expiry and CVV. This is a **demonstration only**: no payment is processed and payment details are never stored. Only `plan: "Paid"` and an upgrade timestamp are written to `users/{uid}`.
- New posts are stored in the `posts` collection with author and timestamp metadata.

## Firestore collections

- `users/{uid}`: name, email, plan, createdAt, and (after upgrade) upgradedAt.
- `posts/{postId}`: type, title, content fields, tags, author metadata, and createdAt.

## Before submission

- Create a GitLab project named **Task D1**, set visibility to **Internal**, and commit project files with meaningful commit messages. Do not commit `.env` or `node_modules`.
- Run and test registration, login, logout, post creation, upgrade validation, plan persistence after refresh, and the Paid-user restriction using your own Firebase project.
- Capture screenshots of the app and Firestore `posts` and `users` collections.
- Record a 3–6 minute walkthrough and upload it to Panopto. Add the GitLab and video links to your short report before uploading to OnTrack.

## Important

The checkout is a UI demonstration, not a real payment integration. Use dummy details only. Firebase configuration and Firestore rules must be set up in your own project for authentication and persistence to work.
# TaskD1
