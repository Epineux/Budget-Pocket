import { Card } from "@/components/ui/card";

export default function ConfirmPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="p-6 text-center">
          <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
            Verifying your email...
          </h1>
          <p className="text-gray-600">
            Please wait while we confirm your email address. You will be
            redirected automatically.
          </p>
        </div>
      </Card>
    </div>
  );
}
