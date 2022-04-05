import { React } from "react";
import { loadZage } from "@zage/zage-js"; // zage js package

import Button from "react-bootstrap/Button";

const PUBLIC_KEY = "sandbox_key_";
const CREATE_TOKEN_SAMPLE_BACKEND = "https://127.0.0.1:8000/zage/create-token/";

function App() {
  const onComplete = (responsePayload) =>
    alert(
      `payment completed, backend returned payload: ${JSON.stringify(
        responsePayload
      )}`
    );

  const onExit = () => alert("user_exited_prematurely");

  const onInfoClick = async () => {
      const zage = await loadZage(PUBLIC_KEY);
      zage.openModal();
  }

  const onPayClick = async () => {
    /** this is your backend endpoint that will create the token
    with the correct amount (in cents) to charge the user
    we recommend handling the amount on the backend */
    const response = fetch(CREATE_TOKEN_SAMPLE_BACKEND, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "*",
      },
      mode: "cors",
    })
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        return null;
      })
      .catch((error) => console.error(error));

    const data = await response;
    const token = data && data.token;

    // load the zage object with your public key
    const zage = await loadZage(PUBLIC_KEY);

    /** using the token from the backend, start the user's payment process
      onComplete: callback when the payment is successfully completed
      onExit: callback if the user exists before completing the payment */
    zage.openPayment(token, onComplete, onExit);
  };

  return (
    <div className="main">
      <Button
          onClick={onInfoClick}
          variant="success"
          size="lg"
          className="zage-button"
      >
        Info Modal
      </Button>
      <Button
        onClick={onPayClick}
        variant="success"
        size="lg"
        className="zage-button"
      >
        Pay
      </Button>
    </div>
  );
}

export default App;
