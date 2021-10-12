import React, { useState } from "react";
import './homepagebanner.css';
import Services from "../../services/services";
import { withRouter } from 'react-router-dom';

const cssPrefix = 'homepagebannercomponent';

 class HomePageBannerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.redirectToProductsPage = this.redirectToProductsPage.bind(this);
    }

    componentDidMount() {
    }

    redirectToProductsPage(payload) {
        this.props.history.push({
            pathname: `/products`,
            search: `?category=${payload.category}&id=${payload.id}`,
        });
    }

    render() {
        return (
            <div id="homepagebannercomponentid" className={`${cssPrefix}__whole_container`}>
                <ListOfImagesOnBanner productSelect={this.redirectToProductsPage} images={this.props.images} products={this.props.products}/>
            </div>
        )
    }
}

function ListOfImagesOnBanner(props) {

    return (
        <div className={`${cssPrefix}__inner_container`}>
            {
                props.products.map((product, index) => {
                    return (<div onClick={() => {
                        props.productSelect(product)
                    }} className={`${cssPrefix}__unit_container`} key={index} style={{ background: "#fff", boxShadow: "1px 1px 1px 1px solid black" }}><img src={product.image} alt="shopper"/></div>)
                })
            }
        </div>
    )
}

export default withRouter(HomePageBannerComponent);
