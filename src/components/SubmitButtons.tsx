"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  buttonName: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitButton({ buttonName, variant }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant={variant} disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {buttonName}
        </Button>
      )}
    </>
  );
}
