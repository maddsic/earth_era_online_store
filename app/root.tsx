import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import tailwindStyles from "~/tailwind.css?url";
import globalStyles from "~/globalStyles.css?url";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:wght@400;700&display=swap",
  },
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: globalStyles },
];

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <html>
        <head>
          <title>{error.status} - Not Found</title>
          <Meta />
          <Links />
        </head>
        <body className="bg-gradient-to-br from-gray-100 via-white to-gray-200 min-h-screen flex items-center justify-center">
          <main className="text-center px-4">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-500 to-pink-500 mb-4">
              {error.status}
            </h1>
            <p className="text-2xl font-semibold text-gray-800 mb-2">
              {error.status === 404 ? "Page Not Found" : "Something went wrong"}
            </p>
            <p className="text-gray-600 mb-6">
              {error.status === 404
                ? "Sorry, the page you’re looking for doesn’t exist."
                : "An unexpected error has occurred."}
            </p>

            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition duration-300"
            >
              ⬅ Back to Home
            </Link>
          </main>

          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }

  // Default error fallback
  return (
    <html>
      <head>
        <title>Error</title>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex items-center justify-center bg-red-50 text-center">
        <div>
          <h1 className="text-4xl font-bold text-red-600">Unexpected Error</h1>
          <p className="text-gray-700 mt-2">Please try again later.</p>
          <Link
            to="/"
            className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            ⬅ Back to Home
          </Link>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
