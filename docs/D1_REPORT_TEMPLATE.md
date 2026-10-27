# SIT313 — D1 Subscription

**Student:** Pratham Alohia  
**Student ID:** 2510994816  
**GitLab repository:** [Paste your Task D1 repository URL]  
**Panopto video:** [Paste your video URL]

## 1. Overview

I extended my existing DEV@Deakin React application with session-aware navigation, a subscription pricing page, and a demo upgrade flow. Firebase Authentication manages sign-in and sign-out. Cloud Firestore stores user profile and subscription-plan information, and stores newly submitted questions/articles.

## 2. Application screenshots

**Figure 1 — Home page:** [Insert screenshot]  
**Figure 2 — Logged-in navigation showing current plan:** [Insert screenshot]  
**Figure 3 — Pricing page comparing Free and Paid:** [Insert screenshot]  
**Figure 4 — Upgrade modal and validation:** [Insert screenshot]  
**Figure 5 — Paid plan shown after upgrade:** [Insert screenshot]

## 3. Firestore screenshots

**Figure 6 — `posts` collection:** [Insert screenshot showing a submitted post and its fields]  
**Figure 7 — `users` collection:** [Insert screenshot showing a user document with `email`, `name`, and `plan`]  
**Figure 8 — Paid user document:** [Insert screenshot showing `plan: Paid` and `upgradedAt`]

## 4. Implementation

Firebase Authentication tracks the active session. The navigation bar reacts to the current user and displays the plan. The Pricing page compares the Free and Paid tiers. The upgrade button checks whether the user is logged in and whether the current plan is Free. The modal validates the entered demo payment fields before updating the user's Firestore document. It saves only the subscription plan and upgrade timestamp; payment details are not stored and no real payment is processed.

The post form validates the content and writes questions/articles to the Firestore `posts` collection with author metadata and a server timestamp. Firestore rules are included in the project and must be published in the Firebase Console.

## 5. Testing

| Test | Expected result | Actual result |
|---|---|---|
| Open Pricing while logged out | Upgrade prompts user to log in | [Fill after testing] |
| Register and log in | Navigation shows signed-in user | [Fill after testing] |
| Submit invalid payment fields | Validation message appears; plan remains Free | [Fill after testing] |
| Submit valid dummy payment fields | Plan changes to Paid in Firestore | [Fill after testing] |
| Refresh after upgrade | Paid plan remains visible | [Fill after testing] |
| Click Upgrade as a Paid user | Upgrade is disabled / notification appears | [Fill after testing] |
| Submit a question/article | New document appears in `posts` | [Fill after testing] |
| Log out | Session is cleared and logged-out links appear | [Fill after testing] |

## 6. Learning and limitations

This task helped me connect React session state with Firebase Authentication and persist user-specific subscription information in Firestore. I also practised form validation, conditional UI states, and database security rules. The checkout is a demonstration only; it does not charge a card. I tested the application using my own Firebase configuration and verified the saved documents before submission. [Edit this paragraph to accurately reflect your actual testing and learning.]

## 7. Repository and video

- GitLab repository: [Paste URL]
- Panopto video: [Paste URL]
