import { useEffect, useState } from 'react';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { getImages } from 'service/image-service';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = value => {
    console.log(value);
    setQuery(value);
  };

  useEffect(() => {
    if (!query) return;

    getImages(query, page).then(data => {
      console.log(data);
    });
  }, [query, page]);

  return (
    <>
      <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      <SearchForm handleSubmit={handleSubmit} />
    </>
  );
};
