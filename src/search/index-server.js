'use strict';

// import React from 'react';
// import logo from './images/logo.png';
// import './search.less';
// 修改
const React = require('react');
const logo = require('./images/logo.png').default
const s = require('./search.less');

class Search extends React.Component {

    constructor() {
        super(...arguments);

        this.state = {
            Text: null
        };
    }

    loadComponent() {
        import('./text.js').then((Text) => {
            this.setState({
                Text: Text.default
            });
        });
    }

    render() {
        const { Text } = this.state;
        const addResult = 'addresult'
        return <div className="search-text">
            {
                Text ? <Text /> : null
            }
            { addResult }
            搜索文字的内容<img src={ logo } onClick={ this.loadComponent.bind(this) } />
        </div>;
    }
}
// 这里不同
module.exports = <Search />;