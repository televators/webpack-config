import '../styles/index.scss';
import Recipes from './Recipes';
import sword from '../images/swc-sword.png';
import swordSvg from '../images/sword.svg';
import Whatever from './Thing';

// import React from 'react'; //* Not needed if you're only using JSX. Only have to import React if you're actually using state and methods from the lib.

const App = () => {
  return (
    <>
      <section className="hero"></section>
      <main>
        <section>
          <h1>Oh hai, React</h1>
        </section>
        <section>
          <Whatever />
        </section>
        {/* <img src={ sword } alt="sword" width="250"/>
        <img src={ swordSvg } alt="sword" width="250"/> */}
        <Recipes/>
      </main>
    </>
  );
};

export default App;
