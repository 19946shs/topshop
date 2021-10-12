import './productcardlist.css';
import { useState, useEffect } from 'react';

export default function ProductCardList (props) {
    const cssPrefix = "productcardlist";
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(props.products)
    }, [props])

    return (
        <div className={`${cssPrefix}__category_column`} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {
                products.map((category, index) => {
                    return (
                    <div onClick={() => props.productPick(category)} key={index} className={`${cssPrefix}__category_box ${cssPrefix}__category_box_title`} style={{ display: 'flex', height: '250px', width: '250px', backgroundImage: `url(${category.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
                        <div className={`${cssPrefix}__category_box_title`}>
                            {/* <span style={{ margin: '5px', width: '200px' }}>{category.title}</span> */}
                            {/* <span>{category.price}</span> */}
                            <span style={{ marginBottom: '10px', fontWeight: '700' }}>{category.title}</span>
                            <span style={{ marginBottom: '10px', color: '#F66332', fontWeight: '600' }}>$ {category.price}</span>
                        </div>
                    </div>)
                })
            }
        </div>
    )
}
