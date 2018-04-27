import React, {Component} from 'react';

// Fake request. Fail for id 3
function deleteItemRequest(id) {
  return new Promise((resolve, reject) => {
    setTimeout(id === 3 ? reject : resolve, 750);
  });
}

export default class App extends Component {
  state = {
    items: Array.from(Array(5), (_, i) => ({
      id: i + 1,
      title: `Item ${i + 1}`,
    })),
    loading: false,
    error: null,
  };

  // Non-optimistic UI update
  deleteItemLoading = id => {
    // Immediately indicate loading
    this.setState({loading: true});
    deleteItemRequest(id)
      .then(() => {
        this.setState(state => ({
          // Update state
          items: state.items.filter(item => item.id !== id),
          // Stop loading
          loading: false,
        }));
      })
      .catch(() =>
        // 2b) Show error to user
        this.setState({
          error: `Request failed for item ${id}`,
          loading: false,
        })
      );
  };

  deleteItemOptimistic = id => {
    const originalItems = this.state.items;

    // 1) Assume success. Immediately update state.
    this.setState(state => ({
      items: state.items.filter(item => item.id !== id),
    }));

    // 2b) If the request failed revert state and display error.
    deleteItemRequest(id).catch(() =>
      this.setState({
        items: originalItems,
        error: `Request failed for item ${id}`,
      })
    );
  };

  render() {
    const {items, loading, error} = this.state;
    return (
      <div>
        <h4>Optimistic UI update in React using setState()</h4>
        <ul style={{opacity: loading ? 0.6 : 1}}>
          {items.map(item => (
            <li key={item.id}>
              {item.title}{' '}
              <button onClick={() => this.deleteItemOptimistic(item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        {error && <p>{error}</p>}
      </div>
    );
  }
}
