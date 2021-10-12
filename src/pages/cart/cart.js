import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import './cart.css';
import store from "../../store/store";
import TitleBarComponent from "../../components/titlebar/titlebar";

export default function Cart(props) {
    const cssPrefix = "cart"
    const [title, setTitle] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [category, setCategory] = useState()
    const [image, setImage] = useState()
    useEffect(() => {
        const product = JSON.parse(props.product)
        setTitle(product.title)
        setPrice(product.price)
        setDescription(product.description)
        setCategory(product.category)
        setImage(product.image)
    }, [props]);

    const addToCart = () => {
        store.dispatch({ type: 'addToCart', payload: { ...props.product, quantity: 1 } });
    }

    return (
        <>
            <div className={`${cssPrefix}__container`}>
                <TitleBarComponent>
                </TitleBarComponent>
            </div>
            <div className={`${cssPrefix}__main_content_container`}>
                <div className={`${cssPrefix}__categorieslist_container`}>
                    {/* <CategoryMenuComponent categories={this.state.categories} onItemClick={this.itemClickHandler}/> */}
                </div>
            </div>
        </>
    )
}
