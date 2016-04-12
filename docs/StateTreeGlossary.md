## Glossary of terms in blip's state tree

### Preliminary

> **PWD**: Person With Diabetes (or, conveniently enough for us at Tidepool, Person With Data). Used as a shorthand for a user that has a Tidepool account *with* data storage, as opposed to a Tidepool user (such as a clinic worker, diabetes educator, endocrinologist etc.) whose account is not set up for data storage.

blip's state tree forks into two branches from the outset: `routing` for routing-related state and `blip` for everything else. You shouldn't (need to) manipulate the `routing` branch of the state tree directly; this is handled by React Router and `react-router-redux`.

The document gives more information on what you'll find in the `blip` branch of the state tree, in four sections:

#### actions and working

There are several top-level properties within the `blip` branch of the state tree that are simple Booleans recording whether or not an action has taken place during the active session. Their names are, for the most part, self-explanatory:

- `isLoggedIn`
- `passwordResetConfirmed`
- `sentEmailVerification`
- `resentEmailVerification`
- `showingWelcomeMessage` (The "welcome message" is a prompt to set up data storage for users who log in and don't have access to view anyone's data (including their own) and don't have any pending invitations; it is dismissible, whereupon this property is set to `false` to avoid reprompting in the same session.)

The `working` sub-branch within `blip` records asynchronous actions in progress (for the purposes of rendering loading indicators, etc.) and their status as succeeded or failed once concluded. Each leaf on the branch takes the form:

```JavaScript
{
  inProgress: true || false,
  notification: null || {
    type: 'error',
    message: 'Error message'
  }
}
```

The various leaves are fairly self-explanatory, but just in case (and with the route where the action takes place noted, where relevant):

- `acceptingReceivedInvite` occurs when a logged-in user clicks "Join the Team!" in response to an incoming care team invitation (`/patients`)

- `acceptingTerms` occurs on acceptance of the Terms of Service and Privacy Policy (`/terms`)

- `cancellingSentInvite` occurs when a logged-in user decides to revoke a still-pending, outgoing invitation to the target care team (`/patients/:id/share`)

- `confirmingPasswordReset` occurs when a user submits a new password during the password reset process (`/confirm-password-reset`)

- `confirmingSignup` occurs on verification of a signing-up user's e-mail address (by clicking a link sent in an e-mail after submission of initial sign-up form) (`/login`)

- `fetchingMessageThread` occurs during the fetch of a message thread (after clicking on a yellow sticky note in the message "pool" of the Daily data view) (`/patients/:id/data`)

- `fetchingPatient` occurs when fetching a PWD's profile (various)

- `fetchingPatientData` occurs when fetching a PWD's diabetes device data (`/patients/:id/data`)

- `fetchingPatients` occurs when fetching the profiles of the PWDs whose data the logged-in user has access to (`/patients`)

- `fetchingPendingReceivedInvites` occurs when fetching the incoming care team invitations for the logged-in user (`/patients`)

- `fetchingPendingSentInvites` occurs when fetching the outgoing but still pending invitations to the target care team sent by the logged-in user (`/patients/:id/share`)

- `fetchingUser` occurs when fetching the logged-in user's info (various)

- `loggingIn` occurs when logging in, duh (`/login`)

- `loggingOut` occurs when logging out, double duh (anywhere)

- `rejectingReceivedInvite` occurs when a logged-in user clicks "Ignore" in response to an incoming care team invitation (`/patients`)

- `removingMemberFromTargetCareTeam` occurs when a logged-in user revokes access to the target user's data for an individual that had accepted an invitation to the target user's care team sometime in the past (`/patients/:id/share`)

- `removingMembershipInOtherCareTeam` occurs when a logged-in user decides to leave another user's care team (`/patients`)

- `requestingPasswordReset` occurs when a user requests a password reset (`/request-password-reset`)

- `resendingEmailVerification` occurs when a user requests an additional verification e-mail (`/email-verification`)

- `sendingInvite` occurs when a logged-in user issues an invitation to the target care team (`/patients/:id/share`)

- `settingMemberPermissions` occurs when a logged-in user changes the permissions granted to a member of the target care team (`/patients/:id/share`)

- `settingUpDataStorage` occurs when a logged-in user sets up data storage for himself or herself or for a target PWD under his or her care (`/patients/new`)

- `signingUp` occurs when a user submits the initial sign-up form

- `updatingPatient` occurs when updating the profile info for a PWD (`/patients/:id/profile`)

- `updatingUser` occurs when updating the user info for the logged-in user (`/profile`)

#### notification

#### logged-in user

#### all PWDs