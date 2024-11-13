import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCheck, XCircle } from "lucide-react";
import Link from "next/link";

const SuccessRoute = () => {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-80">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <CheckCheck className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              Payment Successful
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you for your order, you will receive an email confirmation
              shortly.
            </p>

            <Button className="w-full mt-6">
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SuccessRoute;
