import { useEffect, useState } from 'react';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { getImages } from 'service/image-service';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [dataImages, setDataImages] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isEmpting, setIsEmpting] = useState(false);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [largeURL, setLargeURL] = useState('');

  const handleSubmit = value => {
    console.log(value);
    setQuery(value);
    setPage(1);
    setDataImages([]);
    setShowLoadMore(false);
  };

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);

    getImages(query, page)
      .then(data => {
        if (data.photos.length === 0) {
          return setIsEmpting(true);
        }
        setDataImages(prevDataImages => [...prevDataImages, ...data.photos]);

        setShowLoadMore(page < Math.ceil(data.total_results / data.per_page));
      })
      .catch(error => setIsError(error.message))
      .finally(setIsLoading(false));
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = url => {
    setLargeURL(url);
  };

  return (
    <>
      <SearchForm handleSubmit={handleSubmit} />
      <Grid>
        {dataImages.map(({ id, avg_color, alt, src }) => (
          <GridItem key={id}>
            <CardItem color={avg_color}>
              <img
                src={src.large}
                alt={alt}
                onClick={() => openModal(src.large2x)}
              />
            </CardItem>
          </GridItem>
        ))}
      </Grid>
      {showLoadMore && (
        <Button type="button" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
      {isEmpting && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      {isError && <Text textAlign="center">Sorry. {isError} 😭</Text>}
      {isLoading && <Loader />}
      {largeURL && <Modal imageLink={largeURL} closeModal={openModal} />}
    </>
  );
};
