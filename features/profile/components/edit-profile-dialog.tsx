"use client";

import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useProfileForm } from "../hooks/use-profile-form";
import type { UpdateProfileInput } from "../schemas/profile-schema";
import type { Profile } from "../types/profile";
import { updateProfileAction } from "../actions/update-profile";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type EditProfileDialogProps = {
  profile: Profile;
};

export function EditProfileDialog({ profile }: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useProfileForm(profile);

  const router = useRouter();

  const onSubmit: SubmitHandler<UpdateProfileInput> = async (data) => {
    const result = await updateProfileAction(data);

    if (!result.success) {
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, message]) => {
          if (!message) return;

          form.setError(field as keyof UpdateProfileInput, {
            message,
          });
        });
      }

      toast.error(result.error ?? "Failed to update profile.");

      return;
    }

    form.reset(data);
    setOpen(false);
    router.refresh();

    toast.success("Profile updated successfully.");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          form.reset({
            displayName: profile.displayName ?? "",
            bio: profile.bio ?? "",
            website: profile.website ?? "",
            location: profile.location ?? "",
          });
        }

        setOpen(nextOpen);
      }}
    >
      <DialogTrigger render={<Button>Edit Profile</Button>} />

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>

          <DialogDescription>
            Update your public profile information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <Field>
            <FieldLabel htmlFor="displayName">Display Name</FieldLabel>

            <FieldContent>
              <Input
                id="displayName"
                aria-invalid={!!form.formState.errors.displayName}
                {...form.register("displayName")}
              />

              <FieldError errors={[form.formState.errors.displayName]} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>

            <FieldContent>
              <Textarea
                id="bio"
                rows={4}
                aria-invalid={!!form.formState.errors.bio}
                {...form.register("bio")}
              />

              <FieldError errors={[form.formState.errors.bio]} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="website">Website</FieldLabel>

            <FieldContent>
              <Input
                id="website"
                placeholder="https://example.com"
                aria-invalid={!!form.formState.errors.website}
                {...form.register("website")}
              />

              <FieldError errors={[form.formState.errors.website]} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>

            <FieldContent>
              <Input
                id="location"
                placeholder="Chennai, India"
                aria-invalid={!!form.formState.errors.location}
                {...form.register("location")}
              />

              <FieldError errors={[form.formState.errors.location]} />
            </FieldContent>
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
            >
              {form.formState.isSubmitting
                ? "Saving Changes..."
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
