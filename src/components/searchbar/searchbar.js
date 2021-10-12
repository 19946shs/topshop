import React from "react";
import './searchbar.css';
// import {
//     useNavigate 
//   } from "react-router-dom";

const cssPrefix = 'searchcomponent';

export default class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: props.items,
            showDropDownOrNah: false,
        }
        this.filterSearch = this.filterSearch.bind(this);
        this.setupClickListener = this.setupClickListener.bind(this);
        this.itemClickHandler = this.itemClickHandler.bind(this)
    }

    filterSearch(event, items) {
        const keyword = event.target.value.toLowerCase();
        const filtered_users = items.filter((item) => {
            return item.toLowerCase().indexOf(keyword) > -1; 
        });
        return filtered_users;
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.state.items) {
            this.setState({ items: nextProps.items });
        }
    }

    setupClickListener() {
        document.onclick = function(e) {
            try {
                if(![...[...document.getElementById('searchbox').children].map((elem) => {
                    return elem.id
                }), `${cssPrefix}__input_container_id`, `${cssPrefix}__list_item`, `${cssPrefix}__list_inner_item`, 'searchcomponent__input'].includes(e.target.id)) {
                    this.setState({ showDropDownOrNah: false })
                }
            } catch(error) {
                console.warn(error)
            }
        }.bind(this)
    }

    setupMouseMoveOutListener() {
        document.onmouseleave = function(e) {
            try {
                if(![...[...document.getElementById('searchbox').children].map((elem) => {
                    return elem.id
                }), `${cssPrefix}__input_container_id`, `${cssPrefix}__list_item`, `${cssPrefix}__list_inner_item`, 'searchcomponent__input'].includes(e.target.id)) {
                    this.setState({ showDropDownOrNah: false })
                }
            } catch(error) {
                console.warn(error)
            }
        }.bind(this) 
    }

    itemClickHandler(payload) {
        this.setState({showDropDownOrNah: false});
        this.props.onItemFromMenuClicked(payload)
    }

    render() {
        this.setupClickListener();
        this.setupMouseMoveOutListener();
        return (
            <div id="searchbox" className={`${cssPrefix}__whole_container`}
                >
                <div id={`${cssPrefix}__input_container_id`} className={`${cssPrefix}__input_container`}>
                    <input placeholder={this.props.placeholder} id={`${cssPrefix}__input`} onChange={(event) => { 
                       this.setState({ items: this.filterSearch(event, this.props.items) })
                    }}
                     onClick={() => { this.setState({ showDropDownOrNah: true }) }} />
                </div>
                {
                    this.state.showDropDownOrNah ? (
                        <div id={`${cssPrefix}__dropdown_container_id`} style={{ padding: '10px', height: 'fit-content', background: '#fff', zIndex: 82020, borderTopLeftRadius: '0px', borderTopRightRadius: '0px', borderRadius: '10px', boxShadow: '0px 0px 8px 1px #888' }}>
                            <ListComponent onItemClick={this.itemClickHandler} items={this.state.items} visibility={this.state.showDropDownOrNah} />
                        </div>
                    ) : null
                }
            </div>
        )
    }
}

export function ListComponent(props) {
    if(props.visibility) {
        return props.items.map((item, index) => { return(<div  id={`${cssPrefix}__list_item`} key={index}><ItemComponent onItemClick={(payload) => { props.onItemClick(payload) }} item={item} index={index}/></div>) })
    }
    return null;
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

