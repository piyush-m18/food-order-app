import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgress';

export default function Header(){
    const cartCtx=useContext(CartContext);
    const UserProgressCtx=useContext(UserProgressContext);

    const totalCartItems= cartCtx.items.reduce((totalNumber,item)=>{
        return totalNumber+item.quantity;
    },0);

    function handleShowCart(){
        UserProgressCtx.showCart();
    }

    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="restro" />
            <h1>Food App</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>({totalCartItems})</Button>
        </nav>
    </header>
}