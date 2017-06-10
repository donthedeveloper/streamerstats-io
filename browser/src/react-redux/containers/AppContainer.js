import React from 'react';
import {connect} from 'react-redux';

class AppContainer extends React.Component {
  handleEmailSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const subscribeForm = {
      email: data.get('input-email')
    };
  }

  render() {
    return (
      <div>
        <div className='intro'>
          <div className='intro-container'>
            <h1 className='title'>Streamer<span>Stats</span></h1>
            <div className='signup'>
              <p className='signup-slogan'>Grow Your Twitch Channel.</p>
              <p>StreamerStats is a web app, containing features and tools that help you grow and manage your Twitch channel.</p>
              <p>Subscribe to our newsletter to be notified when we launch.</p>
              <form>
                <input className='input-email' type='email' placeholder='Email Address' />
                <input className='input-submit' type='submit' value='Subscribe' />
              </form>
            </div>
          </div> 
        </div>
        <div className='features'>
          <ul>
            <li>
              <i className="fa fa-area-chart fa-2x" aria-hidden="true"></i>
              <p className="features-title">Statistics with Google Charts</p>
              <p>Have you ever wondered how long lurkers really stay in your channel? View channel statistics in much more depth.</p>
            </li>
            <li>
              <i className="fa fa-eercast fa-2x" aria-hidden="true"></i>
              <p className="features-title">Moderation tools with action logs</p>
              <p>Mark and see previously problem viewers, as well as users who have a positive impact on your community.</p>
            </li>
            <li>
              <i className="fa fa-plus fa-2x features-custom-icon" aria-hidden="true"></i>
              <p className="features-title">Add your feature</p>
              <p>If we could build any tool that you needed as a streamer, what would it be?</p>
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
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchProps)(AppContainer);
