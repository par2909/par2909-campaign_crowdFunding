import React from 'react';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import {Link} from '../routes';
const Header = (props) => {
    return(
      <Menu style={{marginTop:"10px"  }}>
      {/* two sets of  curly braces are require for custom styling  */}
        <Link route="/"><a className='item'>
            CrowdCampaign</a>
        </Link>
        <Menu.Menu position='right'>
        <Link route="/"><a className='item'>
            Campaign</a>
        </Link>
        <Link route="/campaigns/new"><a className='item'>
            +</a>
        </Link>
        </Menu.Menu>
      </Menu>
    );
  };
  export default Header;
