import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Page not found
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-6 space-x-3">
            <Button onClick={() => window.history.back()}>
              Go back
            </Button>
            <Link href="/">
              <Button variant="outline">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}