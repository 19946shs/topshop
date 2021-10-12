import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import './productdetaildisplaycard.css';
import store from '../../../store/store';
import CounterComponent from "../../../components/countercomponent/countercomponent";
import ButtonComponent from "../../../components/buttoncomponent/buttoncomponent";

export default function ProductDetailDisplayCard(props) {
    const cssPrefix = "productdetaildisplaycard";
    
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [image, setImage] = useState();
    const [ID, setID] = useState();
    const [itemInCart, setItemInCart] = useState();
    let [quantity, setQuantity] = useState(0);
    useEffect(() => {
        const product = JSON.parse(props.product)
        setTitle(product.title)
        setPrice(product.price)
        setDescription(product.description)
        setCategory(product.category)
        setImage(product.image)
        setID(product.id)
        // itemInCart ? setQuantity(itemInCart.quantity) : setQuantity(quantity)
        const itemInCart = store.getState().cartItems.filter((item) => {
            return item.id === parseInt(ID)
        })[0]
        if(itemInCart) {
            setQuantity(itemInCart.quantity)
        } else {
            setQuantity(0)
        }
    }, [props, quantity, itemInCart, ID]);

    const addToCart = () => {
        setQuantity(1)
        store.dispatch({ type: 'addToCart', payload: { ...JSON.parse(props.product), quantity: 1 } });
    }

    const changeQuantity = (quantity) => {
        setQuantity(quantity)
        quantity !== 0 ? 
            store.dispatch({ type: 'editQuantity', payload: { id: ID, quantity: quantity } }) :
            store.dispatch({ type: 'removeFromCart', payload: { id: ID } })
    }

    return (
        title !== null ? 
        <div className={`${cssPrefix}__main_container`}>
            <img src={image} alt="Product"/>
            <div className={`${cssPrefix}__detail_container`}>
                <span style={{ marginBottom: '10px', fontWeight: '700' }}>{title}</span>
                <span style={{ marginBottom: '10px', color: '#F66332', fontWeight: '600' }}>$ {price}</span>
                <div >
                    {
                        quantity ? <CounterComponent counterValueChange={changeQuantity} counterValue={quantity}/> : <ButtonComponent width="100%" buttonClicked={addToCart} buttonName="Add to cart"/>
                    }
                </div>
            </div>
            <div style={{ width: '100%', background: '#555', borderRadius: '10px', fontSize: '16px', fontWeight: '600', color: '#C5F632', padding: '10px', marginTop: '20px' }}>
                <p className={`${cssPrefix}__description`}>{description}</p>
            </div>
        </div> :
        null
    )
}
