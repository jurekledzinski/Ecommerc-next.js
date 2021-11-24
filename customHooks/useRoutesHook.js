import { useRouter } from 'next/router';

export const useRoutesHook = () => {
  const router = useRouter();
  const baseurl = [{ name: 'Home', url: '/' }];
  const queries = router.query;
  delete queries.category;
  delete queries.id;
  delete queries.model;
  const indexModel = router.asPath.indexOf('model');
  const condition =
    indexModel === -1 ? router.asPath : router.asPath.slice(0, indexModel - 1);
  let arrQueries = Object.values(queries).map((item, index) => {
    return {
      name: item.charAt(0).toUpperCase() + item.substr(1).replace(/\-/g, ' '),
      url: index === 0 ? condition : router.asPath,
    };
  });
  arrQueries = arrQueries.filter(
    (item) => item.name !== '1' && item.name !== '/shipping'
  );
  return { endpoints: baseurl.concat(arrQueries) };
};
