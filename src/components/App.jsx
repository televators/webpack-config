import '../styles/index.scss';
import Recipes from './Recipes';

// import React from 'react'; //* Not needed if you're only using JSX. Only have to import React if you're actually using state and methods from the lib.

const App = () => {
  return (
    <>
      <section className="hero"></section>
      <main>
        <section>
          <h1>Oh hai, React</h1>
        </section>
      </main>

      <Recipes/>
    </>
  );
};

export default App;
