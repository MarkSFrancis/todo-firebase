import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { isLoggedIn, onSignInOrOut, signIn, signOut } from "../../firebase";
import GoogleLogo from "./google-logo.svg";

export default () => {
  const [signedIn, setSignedIn] = useState<boolean | undefined>();

  useEffect(() => {
    return onSignInOrOut(() => {
      setSignedIn(isLoggedIn());
    });
  }, []);

  if (signedIn === undefined) {
    return <></>;
  }
  if (signedIn) {
    return (
      <Button variant="secondary" onClick={() => signOut()}>
        Sign Out
      </Button>
    );
  } else {
    return (
      <Button
        variant="outline-dark"
        style={{ paddingLeft: 0, paddingTop: 0, paddingBottom: 0 }}
        onClick={() => signIn()}
      >
        <img src={GoogleLogo} alt="google logo" width="35" className="mr-2" />
        Sign in with Google
      </Button>
    );
  }
};
