import { useState } from 'react';
import { Layout } from './Layout';
import { BreedSelect } from './BreedSelect';
import { fetchDogByBreed } from 'api';
import { Dog } from './Dog';
import { ErrorMessage } from './ErrorMessage';
import { DogSkeleton } from './DogSkeleton';

const ERROR_MSG =
  'Something went wrong, please try again 😇';

export const App = () => {
  const [dog, setDog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDog = async breedId => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedDog = await fetchDogByBreed(breedId);
      setDog(fetchedDog);
    } catch (error) {
      setError(ERROR_MSG);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <BreedSelect onSelect={fetchDog} />
      {isLoading && <DogSkeleton />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {dog && !isLoading && <Dog dog={dog} />}
    </Layout>
  );
};
