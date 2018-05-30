import React, { Component } from 'react';


class Search extends Component 
{    
    constructor(props){
        super(props);
    }
    
    render()
    {
        const { value, onChange, onSubmit, children } = this.props;
        return (
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value = {value}
                    onChange = {onChange}
                />
                <button type="submit">
                    {children}
                </button>
            </form>
        )
    }
}

export default Search;