import { Component } from 'react';
import Select from 'react-select';
import { fetchBreeds } from 'api';
import { ErrorMessage } from './ErrorMessage';

const ERROR_MSG =
  'Something went wrong, please reload the page 🥹';

export class BreedSelect extends Component {
  state = {
    breeds: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true, error: null });
      const fetchedBreeds = await fetchBreeds();
      this.setState({ breeds: fetchedBreeds });
    } catch (error) {
      this.setState({ error: ERROR_MSG });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { breeds, isLoading, error } = this.state;
    const options = breeds.map(breed => ({
      value: breed.id,
      label: breed.name,
    }));

    return (
      <div>
        <Select
          options={options}
          isLoading={isLoading}
          onChange={option => this.props.onSelect(option.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
}
