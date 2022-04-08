import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './scroll.css';

export default class ColoredScrollbars extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = { top: 0 };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.renderView = this.renderView.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
    }

    handleUpdate(values) {
        const { top } = values;
        this.setState({ top });
    }

    renderView({ style, ...props }) {
        const { top } = this.state;
        const viewStyle = {
            padding: 15,
            backgroundColor: `transparent`,
            color: `rgb(${Math.round(255)}, ${Math.round(255)}, ${Math.round(255)})`
        };
        return (
            <div
                className="box"
                style={{ ...style, ...viewStyle }}
                {...props} />
        );
    }

    renderThumb({ style, ...props }) {
        const { top } = this.state;
        const thumbStyle = {
            backgroundColor: `rgb(${Math.round(255)}, ${Math.round(255)}, ${Math.round(255)})`,
            color: "red"
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props} />
        );
    }

    render() {
        return (
            <Scrollbars
                renderView={this.renderView}
                renderThumbHorizontal={this.renderThumb}
                renderThumbVertical={this.renderThumb}
                onUpdate={this.handleUpdate}
                {...this.props} />
        );
    }
}