import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

// Configurando as rotas da aplicação: 
// O 'createAppContainer' tem que fica em torno de todas as rotas.
const Routes = createAppContainer(
  createStackNavigator({
    // Configurações de cada tela:
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'DevRadar',
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Perfil no Github'
      }
    }
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#FFF',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#7D40E7'
      },
      headerTitleAlign: "center" 
    }
  })
);

export default Routes;