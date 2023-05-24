import { Component } from 'react';
import { Layout } from './Layout';
import { BreedSelect } from './BreedSelect';
import { fetchDogByBreed } from 'api';
import { Dog } from './Dog';
import { ErrorMessage } from './ErorrMessage';
import { DogSkeleton } from './DogSkeleton';

const ERROR_MSG =
  'Something went wrong, please try again 😇';

export class App extends Component {
  state = {
    dog: null,
    isLoading: false,
    error: null,
  };

  fetchDog = async breedId => {
    try {
      this.setState({ isLoading: true, error: null });
      const fetchedDog = await fetchDogByBreed(breedId);
      this.setState({ dog: fetchedDog });
    } catch (error) {
      this.setState({ error: ERROR_MSG });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { dog, isLoading, error } = this.state;
    return (
      <Layout>
        <BreedSelect onSelect={this.fetchDog} />
        {isLoading && <DogSkeleton />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {dog && !isLoading && <Dog dog={dog} />}
      </Layout>
    );
  }
}
