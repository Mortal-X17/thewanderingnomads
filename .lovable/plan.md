# Fix owner account creation in the Studio dashboard

## What's actually happening

Your first sign-up did work — the account `wanderwithkrish@gmail.com` exists, but it was never email-confirmed, and no admin role was granted.

Because email confirmation is on, sign-up returns no active session, so the follow-up step that grants owner rights fails immediately. The dashboard shows the generic "Something went wrong" message (it currently swallows the real reason), and retrying hits the auth service's one-per-minute confirmation-email limit — that's the cooldown you saw.

## The fix

1. **Turn off email confirmation for this project** so creating the owner account signs you straight in (no inbox round-trip, no 60-second email cooldown).
2. **One-time owner bootstrap that doesn't depend on email.** A secure server-side step that, only while no administrator exists, confirms/creates the owner account for the given email + password and grants the admin role. This unsticks your already-created unconfirmed account — you'll be able to set the password and sign in on the next attempt.
3. **Show real error messages** in the sign-in / setup form instead of "Something went wrong", including a friendly message for the rate-limit case ("please wait a minute and try again").
4. After the owner exists, the setup form disappears and only normal sign-in is offered — unchanged from today.

## Technical notes

- `supabase--configure_auth` with `auto_confirm_email: true`, `disable_signup` left as-is, anonymous users off.
- New server function (auth-free, guarded) in a client-safe `*.functions.ts` module: refuses to run if `public.user_roles` already contains an admin; otherwise uses the service-role Auth Admin API (imported inside the handler) to create-or-confirm the user and set the password, then inserts the `admin` role and a profile row.
- `src/components/admin/AdminAuth.tsx`: call that bootstrap in the setup branch, then `signInWithPassword`; propagate `error.message` to the toast.
- No schema migration required; no changes to the pre-launch countdown gate or public site.
