import { useContext, useActionState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currentFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgress";
import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3020/orders", requestConfig, null);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish(){
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries()); // {email:test@example.com}

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    );
  }

  const [formState,formAction,pending] = useActionState(checkoutAction,null);

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (pending) {
    actions = <span>Sending order data...</span>;
  }

  if(data && !error){
    return (
      <Modal
        open={userProgressCtx.progress==='checkout'}
        onClose={handleFinish}
      >
        <h2>Sucess!</h2>
        <p>Your order sumbmitted succesfully</p>
        <p>We will get back to you with more detail</p>

        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currentFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title='Failed to fetch meals' message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
