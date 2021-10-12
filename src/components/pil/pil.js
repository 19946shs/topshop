import React from 'react';

export default class PILComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const classes = this.isLoading ? 'PIL' : 'PIL hide'

        return (
            this.props.isLoading ? 
            <div className={classes} style={{ height: '100vh', width: '100vw', zIndex: '23559', background: '#fff', top: 0, left: 0, position: 'absolute', display: 'flex' }}>
                <svg style={{margin: 'auto', background:' rgb(255, 255, 255)', display: 'block', shapeRendering: 'auto' }} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" r="32" strokeWidth="8" stroke="#6332f6" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                    </circle>
                    <circle cx="50" cy="50" r="23" strokeWidth="8" stroke="#c5f632" strokeDasharray="36.12831551628262 36.12831551628262" strokeDashoffset="36.12831551628262" fill="none" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
                    </circle>
                </svg>
            </div> :
            null
        )
    }
}
