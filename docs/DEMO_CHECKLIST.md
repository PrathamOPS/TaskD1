# D1 3–6 minute walkthrough checklist

1. Introduce DEV@Deakin and explain that this is the D1 Subscription extension.
2. Show the Pricing navigation link and compare Free with Paid.
3. Show the logged-out upgrade action prompting the user to log in.
4. Log in and show the signed-in user and current Free plan in the navigation.
5. Open Upgrade Plan and demonstrate invalid field validation with dummy details.
6. Enter valid dummy details (never real card details), submit, and show the Paid plan in the navigation.
7. Refresh the page and show that the Paid plan persists.
8. Show that a Paid user cannot upgrade again, then log out and show the session ends.
9. Create a sample Question or Article and show the new document in Firestore `posts`.
10. Show the user's Firestore document in `users`, including `plan` and `upgradedAt`.
11. Briefly explain that card details are not stored and no real payment is processed.

Before recording, configure `.env`, publish Firestore rules, and test the full flow in your own Firebase project.
