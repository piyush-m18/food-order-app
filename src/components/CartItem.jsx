import { currentFormatter } from "../utils/formatting";

export default function CartItem({name, quantity, price, onIncrease, onDecrease}){
    return (
        <li>
            <p className="cart-item">
                {name} - {quantity} x {currentFormatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    );
}