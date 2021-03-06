import * as React from 'react'

import './credits.css'

const Credits = () => (
  <div className="credits">
    <h2>👏 Credits</h2>
    <div className="credits-list">
      <h3>"Good artists borrow, great artists steal" - Pablo Picasso</h3>
      <ul>
        <li>
          <a className="link--regular-font" href="https://icons8.com/">
            Icons8 (Icons)
          </a>
        </li>
        <li>
          <a className="link--regular-font" href="https://fontawesome.com/">
            Font Awesome (Icons)
          </a>
        </li>
        <li>
          <a className="link--regular-font" href="https://blog.matsu.io/">
            Matsu (Inspired the general asthetic)
          </a>
        </li>
        <li>
          <a
            className="link--regular-font"
            href="https://chronoblog-hacker.vercel.app/"
          >
            Ivan Ganev (Inspired the author component and layout)
          </a>
        </li>
        <li>
          <a className="link--regular-font" href="https://brittanychiang.com/">
            Brittany Chiang (Inspired the programming experience component)
          </a>
        </li>
        <li>
          <a className="link--regular-font" href="https://marguerite.io/">
            Marguerite Roth (Inspired the bookshelf component)
          </a>
        </li>
        <li>
          <a className="link--regular-font" href="https://www.joshwcomeau.com/">
            Josh Comeau (Rss icon)
          </a>
        </li>
      </ul>
    </div>
  </div>
)

export default Credits
