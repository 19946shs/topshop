import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import './cartitemcomponent.css';
import store from '../../../store/store';

export default function CartItemComponent(props) {
    const cssPrefix = "cartitemcomponent"
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [image, setImage] = useState();
    const [addToCartClicked, setAddToCartClicked] = useState(false);
    let [quantity, setQuantity] = useState(0);
    useEffect(() => {
        const product = JSON.parse(props.product)
        setTitle(product.title)
        setPrice(product.price)
        setDescription(product.description)
        setCategory(product.category)
        setImage(product.image)
    }, [props]);

    const addToCart = () => {
        setQuantity(1)
        store.dispatch({ type: 'addToCart', payload: { ...JSON.parse(props.product), quantity: quantity } });
        setAddToCartClicked(true)
    }

    const addQuantity = () => {
        setQuantity(quantity+=1)
        store.dispatch({ type: 'editQuantity', payload: { id: JSON.parse(props.product).id, quantity: quantity } });
    }

    return (
        title !== null ? 
        <div className={`${cssPrefix}__main_container`}>
            <img src={image} alt="Product"/>
            <div className={`${cssPrefix}__detail_container`}>
                <span>{title}</span>
                <span>₹ {price}</span>
                <div onClick={addToCart}>
                    ADD TO CART
                </div>
            </div>
            <span className={`${cssPrefix}__description`}>{description}</span>
        </div> :
        null
    )
}
