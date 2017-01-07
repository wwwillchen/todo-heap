import * as React from 'react';
// import { Button } from 'semantic-ui-react'
import './app.css';


import { Grid, Image } from 'semantic-ui-react'

// const MainGrid = () => (
//   <div>
//     <Grid centered>
//       <Grid.Column mobile={16} computer={12}>
//         <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
//       </Grid.Column>
//     </Grid>
//   </div>
// )

import { Input, Menu } from 'semantic-ui-react'

class MainMenuWidget extends React.Component<any, any> {
  state = { activeItem: 'home' }

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item name='home' active={activeItem === 'home'}/>
        <Menu.Item name='messages' active={activeItem === 'messages'}/>
        <Menu.Item name='friends' active={activeItem === 'friends'}/>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item name='logout' active={activeItem === 'logout'}/>
        </Menu.Menu>
      </Menu>
    )
  }
}


// const ButtonExampleButton = () => (
//   <Button>
//     Click Here
//   </Button>
// )

class App extends React.Component<null, null> {
  render() {
    return (
        <div id='app'>
          <Grid centered>
            <Grid.Row>
              <MainMenuWidget/>
            </Grid.Row>
            <Grid.Row>
              <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default App;
