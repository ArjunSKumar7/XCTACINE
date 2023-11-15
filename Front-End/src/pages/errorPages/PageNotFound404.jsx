import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@material-tailwind/react";

const PageNotFound404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-8xl font-semibold text-gray-800 mb-4">404</h1>
      <h1 className="text-4xl font-semibold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-8">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button
          color="indigo"
          ripple="light"
          className="px-8 py-3"
        >
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default PageNotFound404;
