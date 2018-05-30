import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Components/Search/Search'
import Table from './Components/Table/Table'
import Button from './Components/Button/Button'

const DEFAULT_QUERY='redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

const list = [
];

class App extends Component 
{
  constructor(props)
  {
    super(props);

    this.state = {
      searchTerm : DEFAULT_QUERY,
      result: null
    }
     
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  onSearchSubmit(event){
     console.log("onSearchSubmit");
     const { searchTerm } = this.state;
     this.fetchSearchTopStories(searchTerm);
     event.preventDefault();
  }
  
  setSearchTopStories(result)
  {
    const { hits, page } = result;
    
    const oldHits = page !== 0
      ? this.state.result.hits
      : [];
    
    console.log("Old Hits ", oldHits);
    console.log("Latest Hits", hits);

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({result});
  }
  
  fetchSearchTopStories(searchTerm, page =0)
  {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;
    console.log(" Url in fetchSearchTopStories " , url);
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }
  
  componentDidMount(){
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }
  
  onSearchChange(event)
  {
      console.log("Changing");
      this.setState({
        searchTerm: event.target.value
      });
  }

  onDismiss(id)
  {
      console.log("Dismiss Clicked ", id);
      const updatedList = this.state.result.hits.filter(item => item.objectID !== id);
      
      this.setState({
        result: {...this.state.result, hits: updatedList}
      })

      console.log("New Result ", this.state.result);
  }

  render() 
  {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;
    if( !result )
      return null;

    return (
      <div className="page">
        <h1> Hacker News Portal </h1>
        <div className ="interactions">
          <Search
                  value={searchTerm}
                  type="text" 
                  onChange = {this.onSearchChange}
                  onSubmit = {this.onSearchSubmit}
          >
              Submit
          </Search>
        </div>
        <Table
            list={result.hits}
            onDismiss={this.onDismiss}
            />
        <div className="interactions">
        <Button onClick = { () => this.fetchSearchTopStories(searchTerm, page + 1)}>
            More
        </Button>
        </div>
      </div>
    );
  }
}

export default App;