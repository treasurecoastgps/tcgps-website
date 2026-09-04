import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import Seo from "@/components/Seo";

export default function NotFound() {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist." path={location} noindex />
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