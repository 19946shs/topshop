import { useEffect, useState } from "react/cjs/react.development";
import React from "react";
import './categorymenu.css';

const cssPrefix = 'categorymenucomponent';

export default function CategoryMenuComponent(props) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setCategories(props.categories);
    }, [props])
    return (
        <>
            <div id={`${cssPrefix}__title`}>Categories</div>
            <div id={`${cssPrefix}__dropdown_container_id`} style={{ padding: '10px', height: 'fit-content', background: '#fff', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', boxShadow: '0px 0px 8px 1px #888' }}>
                
                {categories.map((item, index) => {
                    return(
                        <div  id={`${cssPrefix}__list_item`} key={index}>
                            <ItemComponent onItemClick={(payload) => { props.onItemClick(payload) }} item={item} index={index}/>
                        </div>)
                })}

            </div>
        </>
    )
}

class ItemComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div onClick={ () => { this.props.onItemClick({ item: this.props.item, index: this.props.index }) } } id={`${cssPrefix}__list_inner_item`} >{this.props.item}</div>
        )
    }
}
