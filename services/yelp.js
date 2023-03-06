import axios from 'axios';

const YELP_API_KEY =
  'b1aDZ0hoM2OuQTdNbHqk7RiS1mL3dIoavV_EdVdAuD8DTzdhtOlSRjtDTY6-KiV2Da0xSv7l1tOttFdzUacDF945cWzq3NwRgxGjJNFOYJnzTrNp5cFvhyT5AgoFZHYx';

const api = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
    accept: 'application/json',
  },
});

const getCoffeeShops = userLocation => {
  return api
    .get('/businesses/search', {
      params: {
        limit: 10,
        categories: 'coffee,coffeeroasteries,coffeeshops',
        ...userLocation,
      },
    })
    .then(res =>
      res.data.businesses.map(business => {
        return {
          name: business.name,
          coords: business.coordinates,
        };
      })
    )
    .catch(error => console.error(error));
};

export default {
  getCoffeeShops,
};
