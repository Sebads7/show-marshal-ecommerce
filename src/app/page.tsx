import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div>
      <Button asChild>
        <LoginLink>Sign in</LoginLink>
      </Button>
      <Button asChild>
        <RegisterLink>Sign up</RegisterLink>
      </Button>
      <Button asChild>
        <LogoutLink>LOGOUT</LogoutLink>
      </Button>
    </div>
  );
}
