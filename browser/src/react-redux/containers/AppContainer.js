import React from 'react';

const AppContainer = (props) => {
  return (
    <div>
      <div>
        <p>Some random text</p>
        <form>
          <input type='email' />
          <input type='submit' value='Submit' />
        </form>
      </div>
      <div>
        <ul>
          <li>
            {/* img, text */}
          </li>
          <li>
            {/* img, text */}
          </li>
          <li>
            {/* img, text */}
          </li>
          <li>
            {/* img, text */}
          </li>
          <li>
            {/* img, text */}
          </li>
          <li>
            {/* img, text */}
          </li>
        </ul>
      </div>
      <div>
        <p>Hello!</p>
        <form>
          <input type='email' />
          <input type='submit' value='Submit' />
        </form>
        <ul>
          {/*<li><a href='' target='_blank'><icon></li>
          <li><a href='' target='_blank'><icon></li>
          <li><a href='' target='_blank'><icon></li>*/}
        </ul>
      </div>
    </div>
  );
};

export default AppContainer;
