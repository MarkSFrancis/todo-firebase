import React from "react";
import Button from "react-bootstrap/Button";
import { isLoggedIn, onSignInOrOut, signIn, signOut } from "../../firebase";
import GoogleLogo from "./google-logo.svg";

class SignIn extends React.Component<{}, { isSignedIn: boolean }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isSignedIn: false,
    };
  }

  subscriptions: (() => void)[] = [];

  componentDidMount() {
    let sub = onSignInOrOut(() => {
      this.setState({ isSignedIn: isLoggedIn() });
    });

    this.subscriptions.push(sub);
  }

  componentWillUnmount() {
    this.subscriptions.map((cleanup) => cleanup());
  }

  render() {
    if (this.state.isSignedIn) {
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
  }
}

export default SignIn;
