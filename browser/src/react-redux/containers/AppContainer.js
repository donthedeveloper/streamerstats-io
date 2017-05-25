import React from 'react';

const AppContainer = (props) => {
  return (
    <div>
      <div className='intro'>
        <h1 className='title'>Streamer<span>Stats</span></h1>
        <div className='signup'>
          <p>This app is really cool. You should totally sign up for it.</p>
          <form>
            <input className='input-email' type='email' placeholder='Email Address' />
            <input className='input-submit' type='submit' value='Submit' />
          </form>
        </div>
      </div>
      <div className='features'>
        <ul>
          <li>
            <i className="fa fa-bar-chart" aria-hidden="true"></i>
            <p>Statistics with Google Charts</p>
            {/* img, text */}
          </li>
          <li>
            <i className="fa fa-bar-chart" aria-hidden="true"></i>
            <p>Moderation tool to help keep track of things</p>
            {/* img, text */}
          </li>
          <li>
            <i className="fa fa-bar-chart" aria-hidden="true"></i>
            <p>Add your feature</p>
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
      <div className='gotya'>
        <div>
          <p>Hello!</p>
          <form>
            <input type='email' />
            <input type='submit' value='Submit' />
          </form>
        </div>
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
