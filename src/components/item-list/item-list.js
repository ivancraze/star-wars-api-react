import React, { Component } from 'react';

import './item-list.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

export default class ItemList extends Component {

    swapiService = new SwapiService();

    state = {
        peolpleList: null
    }

    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then((peopleList) =>{
                this.setState({
                    peopleList
                });
            });
    };

    renderItem(arr) {
        return arr.map(({id, name}) => {
            return (
                <li className="list-group-item"
                key={id}
                onClick={() => this.props.onItemSelected(id)}>
                    {name}
                </li>
            );
        });
    };

    render() {

        const {peopleList} = this.state;

        if (!peopleList) {
            return <Spinner />
        }

        const items = this.renderItem(peopleList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}