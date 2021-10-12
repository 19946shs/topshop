import React from "react";
import SearchBarComponent from "../../components/searchbar/searchbar";
import { withRouter } from 'react-router-dom';
import Services from "../../services/services";
import TitleBarComponent from "../../components/titlebar/titlebar";
import CategoryMenuComponent from "../../components/categorymenu/categorymenu";
import store from "../../store/store"
import './product.css';
import ProductCardList from "./productcardlist/productcardlist";
import CacheRequests from "../../services/apiwrapper";
import ProductDetailDisplayCard from "./productdetaildisplaycard/productdetaildisplaycard";
import ButtonComponent from "../../components/buttoncomponent/buttoncomponent";

const cssPrefix = "product";
const categoriesURL = 'https://fakestoreapi.com/products/categories';
const CACHE = new CacheRequests();

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productsAndTheirDetails: [],
            productsList: [],
            categories: [],
            selectedProduct: null,
        }
        this.itemClickHandler = this.itemClickHandler.bind(this);
        this.makeAPICalls = this.makeAPICalls.bind(this);
        this.onProductPick = this.onProductPick.bind(this);
        this.searchItemClickHandler = this.searchItemClickHandler.bind(this);
        this.goToHome = this.goToHome.bind(this);
    }

    makeAPICalls(idparam=0) {
        store.dispatch({ type: 'startLoading' });
        const ApiServices = new Services();
        const params = new URLSearchParams(this.props.location.search); 
        const category = params.get('category');
        const id = idparam === 0 ? params.get('id') : idparam;
        const productsURL = `https://fakestoreapi.com/products/category/${category}`;

        ApiServices.get(productsURL).then((resp) => {
            this.setState({ productsAndTheirDetails: resp.data });
            CACHE.set(productsURL, resp.data);
            const productsList = resp.data.map((item, index) => {
                return item.title;
            });
            const selectedProduct = this.state.productsAndTheirDetails.filter(product => product.id === id )[0];
            this.setState({ productsList: productsList });
            ApiServices.get(categoriesURL).then((resp) => {
                this.setState({ categories: resp.data });
                CACHE.set(categoriesURL, resp.data);
                store.dispatch({ type: 'stopLoading' });
                selectedProduct ? this.setState({ selectedProduct: selectedProduct[0] }) : this.setState({ selectedProduct: this.state.productsAndTheirDetails[0] });
                if(!category) {
                    this.props.history.push({
                        pathname: `/products`,
                        search: `?category=${resp.data[0]}&id=1`,
                    });
                    this.checkCACHE();
                }
            });
        });
    }
    
    checkCACHE(categoryCheck = '') {
        const params = new URLSearchParams(this.props.location.search); 
        const category = params.get('category');
        const id = params.get('id');
        const productsURL = `https://fakestoreapi.com/products/category/${category}`;
        if (CACHE.has(categoriesURL) && CACHE.has(productsURL)) {
            this.setState({ categories: CACHE.get(categoriesURL) });
            this.setState({ productsAndTheirDetails: CACHE.get(productsURL) });
            const selectedProduct = this.state.productsAndTheirDetails.filter(product => {return product.id === parseInt(id)} )[0];
            this.setState({ selectedProduct: selectedProduct ? selectedProduct : this.state.productsAndTheirDetails[0] });
        } else {
            categoryCheck === '' ? this.makeAPICalls(id) : this.getProducts(categoryCheck);
        }
    }

    componentDidMount() {
        this.checkCACHE();
    }

    getProducts(category) {
        const ApiServices = new Services();
        store.dispatch({ type: 'startLoading' });
        
        ApiServices.get(`https://fakestoreapi.com/products/category/${category}`).then((resp) => {
            this.setState({ productsAndTheirDetails: resp.data });
            const productsList = resp.data.map((item, index) => {
                return item.title;
            });
            const selectedProduct = this.state.productsAndTheirDetails.filter(product => product.id === parseInt(resp.data[0].id) )[0];
            selectedProduct ? this.setState({ selectedProduct: selectedProduct[0] }) : this.setState({ selectedProduct: this.state.productsAndTheirDetails[0] });
            this.setState({ productsList: productsList });
            this.setState({ selectedProduct: this.state.productsAndTheirDetails[0] });
            store.dispatch({ type: 'stopLoading' });
            this.props.history.push({
                pathname: `/products`,
                search: `?category=${selectedProduct.category}&id=${selectedProduct.id}`,
            });
        });
    }

    itemClickHandler(payload) {
        this.props.history.push({
            pathname: `/products`,
            search: `?category=${payload.item}`,
        });
        this.getProducts(payload.item);
    }

    async searchItemClickHandler(payload) {
        const selectedProduct = await this.state.productsAndTheirDetails.filter(product => product.title === payload.item )[0];
        this.props.history.push({
            pathname: `/products`,
            search: `?category=${selectedProduct.category}&id=${selectedProduct.id}`,
        });
        this.checkCACHE();
    }

    onProductPick(product) {
        window.scroll({
            top: 0,
            behavior: 'smooth' 
        });
        const selectedProduct = this.state.productsAndTheirDetails.filter(prod => prod.id === product.id )[0];
        this.setState({ selectedProduct: selectedProduct });
        this.props.history.push({
            pathname: `/products`,
            search: `?category=${selectedProduct.category}&id=${selectedProduct.id}`,
        });
    }

    goToHome() {
        this.props.history.push({
            pathname: `/home`,
        });
    }

    render() {
        return (
            <>
                <div className={`${cssPrefix}__container`}>
                    <TitleBarComponent>
                        <SearchBarComponent onItemFromMenuClicked={this.searchItemClickHandler} items={this.state.productsList} placeholder="Search Products"/>
                    </TitleBarComponent>
                </div>
                <div className={`${cssPrefix}__main_content_container`}>
                    <div className={`${cssPrefix}__categorieslist_container`}>
                        <div style={{ marginBottom: '15px' }}>
                            <ButtonComponent width='100%' buttonName="Go to home" buttonClicked={this.goToHome} />
                        </div>
                        <div>
                            <CategoryMenuComponent categories={this.state.categories} onItemClick={this.itemClickHandler}/>
                        </div>
                    </div>
                    <div className={`${cssPrefix}__productsdisplay_container`}>
                        {
                            this.state.selectedProduct ?
                            <ProductDetailDisplayCard product={JSON.stringify(this.state.selectedProduct)}/> :
                            null
                        }
                        <ProductCardList products={this.state.productsAndTheirDetails} productPick={this.onProductPick}/>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Product);
