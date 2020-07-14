import React from "react";
import Button from "react-bootstrap/Button";
import { isLoggedIn, signIn, signOut, onSignInOrOut } from "../firebase";

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
        <Button variant="primary" onClick={() => signIn()}>
          Sign In
        </Button>
      );
    }
  }
}

export default SignIn;
