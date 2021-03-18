# O que será desenvolvido
- Você já aprendeu como tornar um componente funcional, a usar o `useState`, `useContext` e o `useEffect`, então, agora é hora de ir um pouquinho além e começarmos a fazer manipulações de estados de uma forma um pouco mais complexa.

- No exemplo de hoje, nós vamos criar uma aplicação que pega os dados de uma série de uma *API* e a partir desses dados, vamos renderizar na tela cards dos episódios para que possamos adicionar episódios aos favoritos e fazer filtros simples.

- A aplicação foi pensada para ter duas páginas, uma com todos os episódios e uma apenas com os favoritos. Para colocar a opção de ir para a página de favoritos ou de volta à inicial de uma forma que a aplicação fique um pouco mais interessante, teremos um header nas duas páginas. Fora isso, teremos os campos dos filtros. Vamos lá?

# Mãos à obra
## Criar React App
- `npx create-react-app bears-beets-battlestar-galactica`.
- `npm install`
- A seguir, criar as pastas que iremos utilizar para deixar mais organizado.
  - Criar, dentro da pasta `src`, as pastas `Services`, `Components`, `Pages`, `Context` e `images`.
**OE** O conteúdo da pasta `images` você pode copiar deste repositório
**OE** Copiar e colar a estilização de `index.css` desta aplicação.

## Criando o `Context`
- Dentro da pasta `Context`, criaremos nosso arquivo de contexto que chamaremos de `TheOfficeContext`:

``` JS
// TheOfficeContext.js

import { createContext } from 'react';

const TheOfficeContext = createContext();

export default TheOfficeContext;

```

## Requisição à API
- No arquivo `FetchAPI` que está dentro da pasta `Services` faremos a requisição para a *API*:

``` JS
// FetchAPI.js

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

```

## Criando o `Provider`
- De volta à pasta `Context`, criaremos o arquivo `Provider.jsx`;
- Como vamos fazer filtragens, o retorno da `API` foi salvo em dois estados diferentes, um que não será modificado, funcionando como um estado original e outro que será como uma cópia, onde serão armazenados os resultados dos filtros;
- Chamar a requisição à `API` no `useEffect` sem dependências, que tem função correspondente a do `componentDidMount`;
  - Lembrar de prestar atenção na documentação da API para usar as chaves certas para o retorno que você espera;
- Criar um objeto chamado `contextValue` e colocar os estados que desejamos tornar acessíveis para os outros componentes nele para que possamos passá-los como `props` no `Provider`;

``` JS
// Provider.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './TheOfficeContext';
import FetchAPI from '../Services/FetchAPI';

function TheOfficeProvider({ children }) {
  const [allEpisodes, setAllEpisodes] = useState([]);
  const [allEpisodesCopy, setAllEpisodesCopy] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getEpisodes = async () => {
      const { _embedded: { episodes } } = await FetchAPI();
      setAllEpisodes(episodes);
      setAllEpisodesCopy(episodes);
    };
    getEpisodes();
  }, []);

  const contextValue = {
    allEpisodesCopy,
    favorites,
  };

  return (
    <main>
      <Context.Provider value={ contextValue }>
        {children}
      </Context.Provider>
    </main>
  );
}

TheOfficeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TheOfficeProvider;

```

## Componentes
- Teremos duas páginas na aplicação e com base na ideia da nossa aplicação já podemos criar, na pasta `Components`, os arquivos dos componentes que iremos utilizar para já podermos inseri-los nas páginas;
- Os componentes serão: `Header.jsx`, `EpisodesCards.jsx`, `FavoritesCards.jsx` e `Filters.jsx`;

``` JS
// Header.jsx

import React from 'react';
export default function Header({ history }) {
  return (
    <div>
    </div>
  );
}

```

``` JS
// EpisodesCards.jsx

import React from 'react';
export default function EpisodesCards() {
  return (
    <div>
    </div>
  );
}

```

``` JS
// FavoritesCards.jsx

import React from 'react';
export default function FavoritesCards() {
  return (
    <div>
    </div>
  );
}

```

``` JS
// Filters.jsx

import React from 'react';
export default function Filters() {
  return (
    <div>
    </div>
  );
}

```

## Páginas
- Agora, na pasta Pages, criaremos nossas páginas: `Episodes` e `Favorites`:
  - Importar os componentes que criamos e iseri-los no `return`;
  - Para construirmos um `Header` dinâmico usando o `pathname`, vamos passar como `props` o `history` nas duas páginas e, para não termos problemas com o `ESLint` por isso, teremos que colocar também os `propTypes`;
  - Importação de uma imagem para ser usada como footer da pasta images;
**OE** É importante que sejam inseridas as `className`s nestes arquivos para que o arquivo `index.css` possa aplicar a estilização corretamente.

``` JS
// Episodes.js

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import EpisodesCards from '../Components/EpisodesCards';
import Filters from '../Components/Filters';
import footerImage from '../images/DunderMifflin.png';

export default function Episodes({ history }) {
  return (
    <div className="App">
      <Header history={ history } />
      <Filters />
      <EpisodesCards />
      <footer className="footer">
        <img className="footer" src={ footerImage } alt="the office logo" width="250px" />
      </footer>
    </div>
  );
}

Episodes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

```

``` JS
// Favorites.js

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import footerImage from '../images/DunderMifflin.png';
import FavoritesCards from '../Components/FavoritesCards';

export default function Favorites({ history }) {
  return (
    <div className="App">
      <Header history={ history } />
      <FavoritesCards />
      <footer className="footer">
        <img src={ footerImage } alt="the office logo" width="250px" />
      </footer>
    </div>
  );
}

Favorites.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

```

## Rotas
- Hora de adicionar as rotas das páginas no arquivo `App.js`:

``` JS
// App.js

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './Context/Provider';
import Episodes from './Pages/Episodes';
import Favorites from './Pages/Favorites';

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={ Episodes }
          />
          <Route
            path="/fav"
            component={ Favorites }
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

```
- Agora você já consegue ver a imagem que colocamos como `footer`.
**OE** Talvez você precise instalar `npm install -S react-router-dom`, interromper e dar um `npm start` novamente para resolver o erro *"Module not found: Can't resolve 'react-router-dom'"*.

## Components - Header
- Importar imagem da logo da página images;
- Passar `history` como parâmetro da função do componente e desestruturá-lo para pegar também o `pathname`.
- Adiciona a imagem da logo da série; 
- Com base no caminho da página em que se está cria um título dinâmico para a página e para o botão que redireciona para a outra página, *Todos os Episódios* ou *Favoritos*.
- Preencher propTypes;
**OE** É importante que sejam inseridas as `className`s para que o arquivo `index.css` possa aplicar a estilização corretamente.

``` JSX
// Header.jsx

import React from 'react';
import PropTypes from 'prop-types';
import logo from '../images/theOffice.png';

export default function Header({ history }) {
  const { location: { pathname } } = history;
  const path = pathname;

  const goToFav = () => {
    history.push('/fav');
  };

  const goToHome = () => {
    history.push('/');
  };

  return (
    <div>
      <div className="header d-flex flex-row align-items-center justify-content-around">
        <img src={ logo } alt="the office logo" width="350px" />
        <h1>{ path === '/' ? 'Todos os Episódios' : 'Lista de Favoritos'}</h1>
        <button
          type="button"
          className="show-fav-btn btn"
          onClick={ path === '/' ? goToFav : goToHome }
        >
          {path === '/' ? 'Favoritos' : 'Todos os Episódios' }
        </button>
      </div>
      <hr />
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
};

```

- Agora, além da imagem de `footer`, o `header` também está visível na aplicação.

##  Components - EpisodesCards
- Importar o `useContext` e o contexto criado na aplicação ( `TheOfficeContext`)
- Pegar o estado `epCopy` armazenado no `Provider`, fazer um `map` nele e renderizar os cards com uma *thumbnail*, o nome do episódio, a temporada e o número do episódio;
- Não esquecer de colocar uma `key`;
- Botão muda texto caso o episódio do card esteja nos favoritos, mas como ainda não tem função, só mostra no console a mensagem "ainda não funciono";
**OE** É importante que sejam inseridas as `className`s para que o arquivo `index.css` possa aplicar a estilização corretamente.


``` JSX
// EpisodesCards.jsx

import React, { useContext } from 'react';
import TheOfficeContext from '../Context/TheOfficeContext';

export default function EpisodesCards() {
  const { allEpisodesCopy, favorites } = useContext(TheOfficeContext);

  return (
    <div>
      <section className="body">
        {
          allEpisodesCopy
            .map((episode) => (
              <div key={ episode.id } className="container">
                <img src={ episode.image.medium } alt={ episode.name } />
                <h3>
                  {episode.name}
                </h3>
                <p>
                  Temporada:
                  {' '}
                  {episode.season}
                  {' '}
                  Episódio:
                  {' '}
                  {episode.number}
                </p>
                <button
                  type="button"
                  className="btn"
                  onClick={ () => console.log('ainda não funciono') }
                >
                  {favorites && favorites
                    .some((ep) => ep.id === episode.id)
                    ? 'Remover dos Favoritos'
                    : 'Favoritar'}
                </button>
              </div>
            ))
        }
      </section>
    </div>
  );
}

```

- Neste momento, os cards e a aparência da página principal já está pronta.

## Components - FavoritesCards

- O estado `favorites` continua vazio no `Provider` e para podermos ter algo para renderizar na página de favoritos, temos que criar uma função que adiciona cards aos favoritos.

### Voltando ao `Provider`

  - Criar a `const zero` para evitar *magic numbers*
  - Criar a função que adiciona e remove ítens dos favoritos
  - Dentro dessa função, lembrar que ao setar o estado de `favorites` que não seja o retorno de um `filter` (que já retorna um `array`), é necessário envolver o estado a ser setado em um `array`;
  - Lembrar de fazer o `spread` de favorites para acumular o que já está no estado e não sobreescrever
  - Colocar a função no `ContextValue`

``` JSX
// Provider.js

// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Context from './TheOfficeContext';
// import FetchAPI from '../Services/FetchAPI';

// function TheOfficeProvider({ children }) {
//   const [allEpisodes, setAllEpisodes] = useState([]);
//   const [allEpisodesCopy, setAllEpisodesCopy] = useState([]);
//   const [favorites, setFavorites] = useState([]);
     const zero = 0;

//   useEffect(() => {
//     const getEpisodes = async () => {
//       const { _embedded: { episodes } } = await FetchAPI();
//       setAllEpisodes(episodes);
//       setAllEpisodesCopy(episodes);
//     };
//     getEpisodes();
//   }, []);

     const toggleFavorites = (item) => (favorites
      .length !== zero && favorites.some((episode) => episode.id === item.id)
      ? setFavorites(favorites.filter((ep) => ep.id !== item.id))
      : setFavorites([...favorites, item]));

//   const contextValue = {
//     favorites,
//     setAllEpisodesCopy,
       toggleFavorites,
//   };

//   return (
//     <main>
//       <Context.Provider value={ contextValue }>
//         {children}
//       </Context.Provider>
//     </main>
//   );
// }

// TheOfficeProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default TheOfficeProvider;

```

### Voltando ao componente EpisodesCards
- Importar função função de adicionar aos Favoritos;
- Chamá-la no botão de favoritar na página dos Episódios, colocando `episode` como parâmetro.

``` JSX
// EpisodesCards.jsx

// import React, { useContext } from 'react';
// import TheOfficeContext from '../Context/TheOfficeContext';

// export default function EpisodesCards() {
     const { allEpisodesCopy, favorites, toggleFavorites } = useContext(TheOfficeContext);

//   return (
//     <div>
//       <section className="body">
//         {
//           allEpisodesCopy
//             .map((episode) => (
//               <div key={ episode.id } className="container">
//                 <img src={ episode.image.medium } alt={ episode.name } />
//                 <h3>
//                   {episode.name}
//                 </h3>
//                 <p>
//                   Temporada:
//                   {' '}
//                   {episode.season}
//                   {' '}
//                   Episódio:
//                   {' '}
//                   {episode.number}
//                 </p>
//                 <button
//                   type="button"
//                   className="btn"
                     onClick={ () => toggleFavorites(episode) }
//                 >
//                   {favorites && favorites
//                     .some((ep) => ep.id === episode.id)
//                     ? 'Remover dos Favoritos'
//                     : 'Favoritar'}
//                 </button>
//               </div>
//             ))
//         }
//       </section>
//     </div>
//   );
// }
```
- Agora, clicando no botão, vemos que o texto muda dinamicamente e, ao checar no `React Dev Tools`, vemos que o estado de `favorites` já está sendo alterado ao clique do botão.

### Components - FavoritesCards
- Com o estado de favoritos, a construção do componente é igual ao da página inicial com a unica exceção de que o `map` é feito a partir de `favorites`, que é o estado a ser importado do nosso contexto junto com a função de adicionar ou remover dos favoritos.
**OE** É importante que sejam inseridas as `className`s para que o arquivo `index.css` possa aplicar a estilização corretamente.

``` JSX
// FavoritesCards.jsx

import React, { useContext } from 'react';
import TheOfficeContext from '../Context/TheOfficeContext';

export default function FavoritesCards() {
  const { favorites, toggleFavorites } = useContext(TheOfficeContext);

  return (
    <div>
      <section className="body">
        {
          favorites && favorites
            .map((episode) => (
              <div key={ episode.id } className="container">
                <img src={ episode.image.medium } alt={ episode.name } />
                <h3>
                  {episode.name}
                </h3>
                <p>
                  Temporada:
                  {' '}
                  {episode.season}
                  {' '}
                  Episódio:
                  {' '}
                  {episode.number}
                </p>
                <button
                  type="button"
                  className="btn"
                  onClick={ () => toggleFavorites(episode) }
                >
                  {favorites && favorites.some((ep) => ep.id === episode.id)
                    ? 'Remover dos Favoritos'
                    : 'Favoritar'}
                </button>
              </div>
            ))
        }
      </section>
    </div>
  );
}

```
- Agora, se você adicionar algum episódio aos favoritos, já poderá vê-lo na página `Favorites`, clicando no botão do `Header`.

## Filtros
- Agora, precisamos construir nossos filtros para tornar possível selecionar temporadas ou episódios.
- Começaremos pelo componente `Filters.jsx`:
  - Faremos dois `inputs` do tipo `radio button` para determinar se o filtro será feito por temporada ou por episódio
  - Um `input` do **tipo número** para pegar o comparativo numérico para o episódio ou a temporada a ser filtrado;
  - Setaremos estados locais para armazenar os valores dos `inputs` e fazermos as comparações
  - Já podemos ver os estados sendo alterados no `React Dev Tools`;
  - Como o botão de filtrar ainda não tem uma função associada, simplesmente mostra no console a mensagem "Ainda não funciono";
**OE** É importante que sejam inseridas as `className`s para que o arquivo `index.css` possa aplicar a estilização corretamente.

``` JSX
// Filters.jsx

import React, { useState } from 'react';

export default function Filters() {
  const [filterBy, setFilterBy] = useState('season');
  const zero = 0;
  const [number, setNumber] = useState(zero);

  return (
    <div>
      <label htmlFor="season">
        Temporada
        <input
          type="radio"
          name="filter"
          value="season"
          checked={ filterBy === 'season' }
          onChange={
            ({ target: { value } }) => setFilterBy(value)
          }
        />
      </label>
      <label htmlFor="episode">
        Episódio
        <input
          type="radio"
          name="filter"
          value="episode"
          checked={ filterBy === 'episode' }
          onChange={
            ({ target: { value } }) => setFilterBy(value)
          }
        />
      </label>
      <input
        className="input-number"
        type="number"
        placeholder="Número"
        min="1"
        onChange={
          ({ target: { value } }) => setNumber(value)
        }
      />
      <button
        className="btn"
        type="button"
        onClick={ () => console.log('ainda não funciono') }
      >
        Filtrar
      </button>
    </div>
  );
}

```
- Por uma questão de organização, faremos a função que efetivamente filtra os cards no `Provider`.

### De volta ao Provider

  - Criar a função de filtrar;
    - Usar método `Number()` para transformar retorno do input de `string` para `number`
    - Criando uma cópia do estado para fazer as filtragens sem que os valores do estado de comparação seja alterado;
    - Colocar a função para ser exportada no `ContextValue`;

``` JSX
// Provider.jsx

// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Context from './TheOfficeContext';
// import FetchAPI from '../Services/FetchAPI';

// function TheOfficeProvider({ children }) {
//   const [allEpisodes, setAllEpisodes] = useState([]);
//   const [allEpisodesCopy, setAllEpisodesCopy] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const zero = 0;

     const applyFilters = (filterBy, number) => {
       if (Number(number) > zero) {
         const newArray = [...allEpisodes];
         switch (filterBy) {
         case ('episode'):
           setAllEpisodesCopy(newArray.filter((ep) => Number(ep.number) ===  Number(number)));
           break;
         case ('season'):
           setAllEpisodesCopy(newArray.filter((ep) => Number(ep.season) ===  Number(number)));
           break;
         default:
           return newArray;
         }
       }
     };

//   useEffect(() => {
//     const getEpisodes = async () => {
//       const { _embedded: { episodes } } = await FetchAPI();
//       setAllEpisodes(episodes);
//       setAllEpisodesCopy(episodes);
//     };
//     getEpisodes();
//   }, []);

//   const toggleFavorites = (item) => (favorites
//     .length !== zero && favorites.some((episode) => episode.id === item.id)
//     ? setFavorites(favorites.filter((ep) => ep.id !== item.id))
//     : setFavorites([...favorites, item]));

//   const contextValue = {
//     favorites,
//     allEpisodesCopy,
//     toggleFavorites,
       applyFilters,
//   };

//   return (
//     <main>
//       <Context.Provider value={ contextValue }>
//         {children}
//       </Context.Provider>
//     </main>
//   );
// }

// TheOfficeProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default TheOfficeProvider;
```

### Em Filters.jsx
- Agora que a função de filtrar já existe, só precisamos:
  - importar `useContext`;
  - importar contexto;
  - desestruturar o contexto para trazer a função `applyFilters`;
  - inserir a função no click do botão setando como parâmetros os estados `filterBy` e `number`.

``` JSX
// Filters.jsx

import React, { useState, useContext } from 'react';
import TheOfficeContext from '../Context/TheOfficeContext';

export default function Filters() {
     const { applyFilters } = useContext(TheOfficeContext);
  // const [filterBy, setFilterBy] = useState('season');
  // const zero = 0;
  // const [number, setNumber] = useState(zero);

//   return (
//     <div>
//       <label htmlFor="season">
//         Temporada
//         <input
//           type="radio"
//           name="filter"
//           value="season"
//           checked={ filterBy === 'season' }
//           onChange={
//             ({ target: { value } }) => setFilterBy(value)
//           }
//         />
//       </label>
//       <label htmlFor="episode">
//         Episódio
//         <input
//           type="radio"
//           name="filter"
//           value="episode"
//           checked={ filterBy === 'episode' }
//           onChange={
//             ({ target: { value } }) => setFilterBy(value)
//           }
//         />
//       </label>
//       <input
//         className="input-number"
//         type="number"
//         placeholder="Número"
//         min="1"
//         max="9"
//         onChange={
//           ({ target: { value } }) => setNumber(value)
//         }
//       />
//       <button
//         className="btn"
//         type="button"
           onClick={ () => applyFilters(filterBy, number) }
//       >
//         Filtrar
//       </button>
//     </div>
//   );
// }
```

- E aí, tá pronto o sorvetinho.
