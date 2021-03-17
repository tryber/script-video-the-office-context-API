const endpoint = 'https://api.tvmaze.com/singlesearch/shows?q=the-office&embed=episodes';
const getEpisodes = () => (
  fetch(endpoint)
    .then((response) => (
      response.json()
        .then((data) => (response.ok
          ? Promise.resolve(data)
          : Promise.reject(data)))
    ))
);

export default getEpisodes;
