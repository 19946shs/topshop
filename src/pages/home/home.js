import './home.css';
import SearchBarComponent from "../../components/searchbar/searchbar";
import Services from "../../services/services";
import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import TitleBarComponent from "../../components/titlebar/titlebar";
import HomePageBannerComponent from "../../components/homepagebanner/homepagebanner";
import { useEffect } from "react/cjs/react.development";
import CacheRequests from "../../services/apiwrapper";
import store from "../../store/store"

const cssPrefix = "homepage";
const CACHE = new CacheRequests();
const categoriesURL = 'https://fakestoreapi.com/products/categories';
const productURL = 'https://fakestoreapi.com/products/category/'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            images: [],
            productsOnBanner: [],
            productFromEachCategory: [],
        }
        this.makeAPIcalls = this.makeAPIcalls.bind(this);
        this.itemClickHandler = this.itemClickHandler.bind(this);
        this.categoryPickHandler = this.categoryPickHandler.bind(this);
    }
    
    generateRandom(lengthOfArray, maxBound) {
        const randomNumbers = [];
        for (let i = 0; i < lengthOfArray; i += 1) {
            randomNumbers.push(Math.floor( Math.random() * maxBound));
        }
        return randomNumbers;
    }

    makeAPIcalls() {
        store.dispatch({ type: 'startLoading' });
        const ApiServices = new Services();
        const bannerProducts = [];
        const randomNumbers = this.generateRandom(3,4);
        const theAPIs = [];
        const allTheAPIS = []
        ApiServices
            .get(categoriesURL)
            .then((categoriesResp) => {
                this.setState({ categories: categoriesResp.data });
                CACHE.set(categoriesURL, categoriesResp.data);
                localStorage.setItem(categoriesURL, categoriesResp.data)
                randomNumbers.forEach((randomNumber) => {
                    theAPIs.push(ApiServices.get(`${productURL}${categoriesResp.data[randomNumber]}`))
                })
                Promise.all(theAPIs)
                    .then((resp) => {
                        for (let i=0; i<10; i+=1) {
                            const randomNumbersForProductExtraction = this.generateRandom(1, resp.length);
                            const randomNumberForSpecificProduct = this.generateRandom(1, resp[randomNumbersForProductExtraction].data.length)
                            const randomProduct = resp[randomNumbersForProductExtraction].data[randomNumberForSpecificProduct]
                            bannerProducts.push(randomProduct)
                        }
                        this.setState({ bannerProducts: bannerProducts });
                        this.setState({ productsOnBanner: bannerProducts });
                        CACHE.set('bannerProducts', bannerProducts);
                        localStorage.setItem('bannerProducts', JSON.stringify(bannerProducts))
                    });
                
                categoriesResp.data.forEach((category) => {
                    allTheAPIS.push(ApiServices.get(`${productURL}${category}`))
                    Promise.all(allTheAPIS)
                        .then((resp) => {
                            const productFromEachCategory = []
                            resp.forEach(response => {
                                productFromEachCategory.push(response.data[0])
                            });
                            this.setState({ productFromEachCategory: productFromEachCategory });
                            CACHE.set('productFromEachCategory', productFromEachCategory);
                            localStorage.setItem('productFromEachCategory', JSON.stringify(productFromEachCategory))
                            store.dispatch({ type: 'stopLoading' });
                        });
                })
        });
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        if (CACHE.has(categoriesURL) && CACHE.has('bannerProducts') && CACHE.has('productFromEachCategory')) {
            this.setState({ categories: CACHE.get(categoriesURL) });
            this.setState({ productsOnBanner: CACHE.get('bannerProducts') })
            this.setState({ productFromEachCategory: CACHE.get('productFromEachCategory') })
        // } else if (localStorage.getItem(categoriesURL) && localStorage.getItem('bannerProducts') && localStorage.getItem('bannerProducts')) {
        //     this.setState({ categories: JSON.parse(localStorage.getItem(categoriesURL)) });
        //     this.setState({ productsOnBanner: JSON.parse(localStorage.getItem('bannerProducts')) });
        //     this.setState({ productFromEachCategory: JSON.parse(localStorage.getItem('productFromEachCategory')) });
        } else {
            this.makeAPIcalls()
        }
    }

    itemClickHandler(payload) {
        this.props.history.push({
            pathname: `/products`,
            search: `?category=${payload.item}`,
        });
    }

    categoryPickHandler(payload) {
        this.props.history.push({
            pathname: `/products`,
            search: `?category=${payload.category}`,
        });
    }
    
    render () {
        return (
            <>
                <div className={`${cssPrefix}__container`}>
                    <TitleBarComponent>
                        <SearchBarComponent onItemFromMenuClicked={this.itemClickHandler} items={this.state.categories} target="categories" placeholder="Search Categories"/>
                    </TitleBarComponent>
                </div>
                <HomePageBannerComponent products={this.state.productsOnBanner}/>
                <div style={{ marginTop: '36px' }}>
                    <CategoryList categoryPick={this.categoryPickHandler} categories={this.state.productFromEachCategory} />
                </div>
            </>
            )
    }
}

function CategoryList(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(props.categories)
    }, [props])

    return (
        <div className={`${cssPrefix}__category_column`} style={{ margin: 'auto', width: '70%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {
                categories.map((category, index) => {
                    return (
                    <div onClick={() => props.categoryPick(category)} key={index} className={`${cssPrefix}__category_box`} style={{ display: 'flex', height: '300px', width: '300px', backgroundImage: `url(${category.image})`, backgroundSize: 'cover', backgroundRepeat: 'none', backgroundPosition: 'center center' }}>
                        <div style={{ height: '80px', width: '100%', background: '#6332F6', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', marginTop: 'auto', color: '#C5F632', lineHeight: '80px', fontSize: '24px', fontWeight: '700' }}>
                            {category.category} 
                        </div>
                    </div>)
                })
            }
        </div>
    )
}

export default withRouter(Home)
