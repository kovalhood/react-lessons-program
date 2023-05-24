import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchBreeds } from 'api';
import { ErrorMessage } from './ErorrMessage';

const ERROR_MSG =
  'Something went wrong, please reload the page 🥹';

export const BreedSelect = ({ onSelect }) => {
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getBreeds() {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedBreeds = await fetchBreeds();
        setBreeds(fetchedBreeds);
      } catch (error) {
        setError(ERROR_MSG);
      } finally {
        setIsLoading(false);
      }
    }
    getBreeds();
  }, []);

  const options = breeds.map(breed => ({
    value: breed.id,
    label: breed.name,
  }));

  return (
    <div>
      <Select
        options={options}
        isLoading={isLoading}
        onChange={option => onSelect(option.value)}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};
