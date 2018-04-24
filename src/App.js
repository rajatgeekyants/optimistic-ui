import React, {Component} from 'react';

function deleteItemRequest(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 750);
  });
}

export default class App extends Component {
  state = {
    items: Array.from(Array(5), (_, i) => ({
      id: i + 1,
      title: `Item ${i + 1}`,
    })),
    loading: false,
  };

  deleteItem = id => {
    this.setState({loading: true});
    deleteItemRequest(id).then(() => {
      this.setState(state => ({
        items: state.items.filter(item => item.id !== id),
        loading: false,
      }));
    });
  };

  render() {
    const {items, loading} = this.state;
    return (
      <div>
        <h4>Optimistic UI update in React using setState()</h4>
        <ul style={{opacity: loading ? 0.6 : 1}}>
          {items.map(item => (
            <li key={item.id}>
              {item.title}{' '}
              <button onClick={() => this.deleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
