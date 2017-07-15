import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            list: []
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);

        this.refresh();
    }

    handleAdd() {
        const description = this.state.description;
        axios.post(URL, { description }).then(resp => {
            this.setState({
                description: '',
            });

            this.refresh();
        })
    }

    refresh(description = '') {
        const search = description ? '&description__regex=/' + description + '/ig' : '';
        axios.get(`${URL}?sort=-createdAt${search}`).then(resp => {
            this.setState({
                list: resp.data
            });
        });
    }

    handleClear(){
        this.setState({
            description: ''
        });
        this.refresh();
    }

    handleSearch() {
        this.refresh(this.state.description);
    }

    handleChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`).then(resp => this.refresh());
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true }).then(resp => this.refresh());
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false }).then(resp => this.refresh());
    }

    render() {
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro" />
                <TodoForm
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                    description={this.state.description} />
                <TodoList list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending} />
            </div>
        );
    }
}