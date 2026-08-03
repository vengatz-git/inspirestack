import { signOutAction } from "../actions/sign-out";

export function SignOutButton() {
  return (
    <form action={signOutAction} className="w-full">
      <button
        type="submit"
        className="w-full cursor-default rounded-2xl px-3 py-2 text-left text-sm font-medium text-destructive outline-hidden select-none hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive"
      >
        Sign Out
      </button>
    </form>
  );
}