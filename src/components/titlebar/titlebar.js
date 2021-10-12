import { withRouter } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "./titlebar.css";
import store from '../../store/store';
const cssPrefix = "titlebarcomponent";

export default function TitleBarComponent({ children }) {
    const [isCartHovered, setIsCartHovered] = useState(false);
    const [isUserHovered, setIsUserHovered] = useState(false);
    const [cartItemsLength, setCartItemsLength] = useState(0);
    store.subscribe(() => {
        setCartItemsLength(store.getState().cartItems.length);
    })
    return (
        <div className={`${cssPrefix}__container`} style={{ position: 'sticky', top: '0px' }}>
            <div className="titleicon" style={{ display: 'flex' }}>
                <svg onClick={() => { console.log('Stevie Wonder ::') }} style={{ top: 0, marginLeft: 'auto', marginRight: '20px', cursor: 'pointer' }} height="60px" version="1.1" preserveAspectRatio="xMidYMid meet" viewBox="568 539 575 148"><g data-item-type="text" data-item="Business" id="logo__item--business" className="logo__item">
                                <g className="logo__item__inner" transform="translate(570.1163635253906 662.0987407345274) scale(4.109868637552265 4.109868637552265) rotate(0 0 0)">
                                    <text data-part-id="logo__item--business" dy="0" dominantBaseline="auto" alignmentBaseline="auto" fontFamily="JockeyOne" fontSize="32px" fill="#6332F6" letterSpacing="5" fontWeight="normal" fontStyle="normal" datafontfamily="JockeyOne" datafontweight="normal" datafontstyle="normal">TOPSHOP</text>
                                </g>
                            </g><g data-item-type="image" data-item="Image" data-logo-item="" id="logo__item--logo_0" className="logo__item">
                    <g className="logo__item__inner" transform="translate(725.5691395667217 538.5) scale(0.9704817238726569 0.9704817238726569) rotate(24.20464351696065 61.82496643066406 59.589798678644)">

                    <g>
                    	<path fill="none" d="M42.3,32.3c-0.2-0.2-0.4-0.4-0.6-0.6c-8-7.8-18.2-10.9-22.4-6.6c-1.6,1.7-2.1,4.3-1.6,7.3l0.4,0.2   c0.9,4.3,3.7,9.2,8,13.5c4.1,4,8.7,6.7,12.8,7.7L37.7,37C37.5,34.6,39.5,32.7,42.3,32.3z" data-part-id="logo__item--logo_0__0"></path>
                    	<path fill="none" d="M49.6,44c-0.5-1.7-1.3-3.4-2.3-5.2l-1.1-0.1c-1.1-0.1-2,0.6-1.9,1.5l1.2,13.5c0.4-0.2,0.9-0.4,1.2-0.7   C46.3,52,46,51,46,49.8C46,47.2,47.4,45,49.6,44z" data-part-id="logo__item--logo_0__1"></path>
                    	<path fill="#6332F6" d="M49.6,44c0.9-0.4,1.9-0.7,2.9-0.7c0.9,0,1.8,0.2,2.6,0.5c-0.4-1.4-0.9-2.9-1.5-4.4l-6.3-0.7   C48.3,40.5,49.1,42.3,49.6,44z" data-part-id="logo__item--logo_0__2"></path>
                    	<path d="M132.4,104.3l-0.2-0.2L86.4,58.7c-5.4-5.3-12.6-2.8-18.7,3c-6.1,5.8-8.9,12.7-3.5,18.1l0,0l36.8,36.9   c1.3,1.3,7-3.8,5.6-5.3L69.7,74.5l0,0c-2.6-2.7-0.5-5.4,2.5-8.3c3-2.9,5.9-4.9,8.6-2.3l0,0l45.5,45.1l0.3,0.3l0.2,0.2   c4.5,4.7,0.5,9-4.9,14c-5.3,5-10.1,8.9-14.8,4.2L47.9,69.1c0,0-0.1-0.1-0.1-0.1c-0.4-0.5-1-0.9-1-1.4L46,58.8   c-2,0.5-4.3,0.6-6.7,0.2l0.8,11.4c0.1,1.4,0.9,2.8,2.1,3.9l0,0l31.3,31l28.1,27.8c7.5,7.4,16.6,3.1,25-4.9   C134.9,120.3,139.6,111.7,132.4,104.3z" data-part-id="logo__item--logo_0__3"></path>
                    	<path d="M42.3,32.3c-2.8,0.4-4.8,2.3-4.6,4.7l1.2,16.7c2.5,0.6,4.8,0.6,6.6-0.1l-1.2-13.5c-0.1-0.9,0.8-1.6,1.9-1.5l1.1,0.1   l6.3,0.7l20.7,2.1c0.2,0,0.8,0.5,1.4,1.1l0.1,0.1l50.3,50c1.4,1.4,6.9-3.7,5.6-5.3L81.2,37.4l0,0c-1.4-1.2-3.4-2.1-5.5-2.3l-26-2.3   l-5.2-0.5C43.7,32.2,43,32.2,42.3,32.3z" data-part-id="logo__item--logo_0__4"></path>
                    	<path d="M49.6,44C47.4,45,46,47.2,46,49.8c0,1.1,0.3,2.2,0.8,3.2c0.3-0.2,0.5-0.4,0.8-0.6c1.2-1.3,1.7-3.1,1.7-5.2l4.9,2.3   c-0.3,2.5-1.3,4.8-3,6.5c-0.1,0.1-0.2,0.1-0.3,0.2c0.5,0.1,1,0.2,1.6,0.2c3.6,0,6.5-2.9,6.5-6.5c0-2.7-1.6-5-3.9-6   c-0.8-0.3-1.7-0.5-2.6-0.5C51.5,43.3,50.5,43.5,49.6,44z" data-part-id="logo__item--logo_0__5"></path>
                    	<path fill="#00aee9" d="M46,58.8c1.9-0.5,3.5-1.4,4.9-2.7c0.1-0.1,0.2-0.1,0.3-0.2c1.7-1.7,2.6-4,3-6.5l-4.9-2.3   c0,2.1-0.4,4-1.7,5.2c-0.2,0.2-0.5,0.4-0.8,0.6c-0.4,0.3-0.8,0.5-1.2,0.7c-1.8,0.7-4.1,0.7-6.6,0.1c-4.1-1-8.8-3.7-12.8-7.7   c-4.3-4.3-7.1-9.2-8-13.5l-0.4-0.2c-0.5-3,0-5.6,1.6-7.3c4.2-4.2,14.4-1.2,22.4,6.6c0.2,0.2,0.4,0.4,0.6,0.6   c0.7-0.1,1.4-0.1,2.1-0.1l5.2,0.5c-1.2-1.7-2.6-3.3-4.2-4.8c-10.4-10.2-23.5-13.1-29.9-6.6c-2.3,2.4-3.4,5.6-3.3,9.3l0.5,0.2   c0.4,5.9,3.8,12.9,9.8,18.8c5.3,5.2,11.4,8.4,16.8,9.3C41.7,59.4,44,59.3,46,58.8z" data-part-id="logo__item--logo_0__6"></path>
                    </g>

                    </g>
                </g></svg>
            </div>
            {children}
            <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
                <div style={{ display: "flex", width: "60px", height: "60px" }}>
                    <svg
                        onMouseEnter={() => setIsCartHovered(true)}
                        onMouseLeave={() => setIsCartHovered(false)}
                        id="cart"
                        style={{display:'block', margin:'auto'}}
                        width="30px"
                        height="30px"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="shopping-cart"
                        className="titlebarcomponent__svgfellas svg-inline--fa fa-shopping-cart fa-w-18"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                    >
                        <path
                          d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                        ></path>
                        {
                            cartItemsLength ? 
                            <g>
                                <circle style={{ fill: 'red' }} cx="350" cy="150" r="170">
                                </circle>
                                <text fill="#000" x="60%" y="50%" fontSize="300px" textAnchor="middle" stroke="#000" strokeWidth="3px" >{cartItemsLength}</text>
                            </g> :
                            null
                        }
                        
                    </svg>
                </div>
                <div id="user" style={{ display: "flex", width: "60px", height: "60px" }}>
                    <svg  onMouseEnter={() => setIsUserHovered(true)} onMouseLeave={() => setIsUserHovered(false)} style={{display:'block', margin:'auto'}} width="30px" height="30px"aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="titlebarcomponent__svgfellas svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    	<path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                    	</path>
                    </svg>
                </div>
            </div>
        </div>
    );
}


