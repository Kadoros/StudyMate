"use client";

import Spinner from "@/components/global/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs"; 
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Heading = () => {
  const { isSignedIn, isLoaded } = useAuth(); // `useAuth` provides `isSignedIn` and `isLoaded`.

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Kotion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Kotion is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {!isLoaded && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isSignedIn && isLoaded && (
        <Button asChild>
          <Link href="/documents">
            Enter Kotion
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isSignedIn && isLoaded && (
        <SignInButton
          mode="modal"
          signUpForceRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
        >
          <Button>
            Get Kotion free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;