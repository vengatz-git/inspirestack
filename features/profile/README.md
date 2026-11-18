# Profile Feature

## Current behavior

- Load and display public user profiles
- Let users edit their profile and profile images
- Show Pins, Collections, and Saved tabs
- Follow and unfollow other users
- Display post, follower, and following counts
- Open paginated follower and following lists in a dialog
- Hide a creator's Pins from the signed-in viewer's feed without changing follows or profile access

## Services

- `getProfileByUsername()` loads a profile by username.
- `updateProfileService()` updates profile details.
- `followUserService()` and `unfollowUserService()` manage follow relationships.
- `getIsFollowingService()` checks the viewer's follow status.
- `getProfileFollowListService()` returns paginated follower or following lists.
- `getProfileStatsService()` returns post, follower, and following counts.
- `getIsUserMutedService()` and `setUserMutedService()` manage viewer-specific feed mutes.

## Routes and UI

- The profile page is `app/(app)/profile/[username]/page.tsx`.
- Follow lists are loaded from `app/api/profile/[username]/follows/route.ts` and displayed in a dialog.
- Users can mute or unmute a creator from that creator's profile; their public profile and Pins remain accessible.
