import { useEffect, useState } from 'react';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { getImages } from 'service/image-service';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [dataImages, setDataImages] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const handleSubmit = value => {
    console.log(value);
    setQuery(value);
    setPage(1);
    setDataImages([]);
    setShowLoadMore(false);
  };

  useEffect(() => {
    if (!query) return;

    getImages(query, page).then(data => {
      setDataImages(prevDataImages => [...prevDataImages, ...data.photos]);
      setShowLoadMore(page < Math.ceil(data.total_results / data.per_page));
    });
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      <SearchForm handleSubmit={handleSubmit} />
      <Grid>
        {dataImages.map(({ id, avg_color, alt, src }) => (
          <GridItem key={id}>
            <CardItem color={avg_color}>
              <img src={src.large} alt={alt} />
            </CardItem>
          </GridItem>
        ))}
      </Grid>
      {showLoadMore && (
        <Button type="button" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </>
  );
};
