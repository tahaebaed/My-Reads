import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div class='mainbox'>
      <div class='err'>4</div>
      <div class='far'>0</div>
      <div class='err2'>4</div>
      <div class='msg'>
        Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
        existed in the first place?
        <p>
          Let's go <Link to='/'>home</Link> and try from there.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
