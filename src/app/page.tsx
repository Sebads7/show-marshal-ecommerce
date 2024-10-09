import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="flex gap-4 p-10">
      <Button asChild>
        <LoginLink>Login</LoginLink>
      </Button>
      <Button asChild>
        <RegisterLink>Sign up</RegisterLink>
      </Button>
      {/* <Button asChild>
        <LogoutLink>LOGOUT</LogoutLink>
      </Button> */}
    </div>
  );
}
