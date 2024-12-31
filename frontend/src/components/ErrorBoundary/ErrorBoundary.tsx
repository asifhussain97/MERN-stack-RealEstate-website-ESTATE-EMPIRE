import React, { useState, useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";
import notfound from "../../assets/img/error.jpg";
interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error("Error caught by Error Boundary:", event.error);
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <img
            src={notfound}
            width={300}
            height={300}
            alt="404 Illustration"
            className="mx-auto mb-8"
          />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Oops, something went wrong!
          </h1>
          <p className="mt-4 text-muted-foreground">
            We're sorry, but an unexpected error has occurred. Please try again
            later or contact support if the issue persists.
          </p>
          <div className="mt-6">
            <Link
              to="#"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;