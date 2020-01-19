import React, {
  useEffect,
  useState
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import MapView, {
  Marker, // Marcar coisas no mapa.
  Callout
} from 'react-native-maps';
import {
  requestPermissionsAsync, // Usuário permitir que o aplicativo utilize sua localização.
  getCurrentPositionAsync // Pegar possição atual.
} from 'expo-location';
import {
  MaterialIcons
} from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

// Propriedade 'navigation' vem quando utilizamos essa função nas rotas com o 'createStackNavigation'.
export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState('');
  // Estados para controle do teclado:
  const [keyboardON, setKeyboardON] = useState(false); // Saber se o teclado está em tela ou não.
  const [keyboardSize, setKeyboardSize] = useState(0); // Armazenar o tamanho do teclado.

  // Função que executa algo quando algum parâmetro foi alterado.
  useEffect(() => {
    async function loadIniticalPosition() {
      const { granted } = await requestPermissionsAsync(); // Pegando a resposta do usuário. Se ele deu permissão ou não para usar a localização.

      if (granted) { // Se o usuário deu permissão.
        const { coords } = await getCurrentPositionAsync({ // Pegando a localização do usuário.
          enableHighAccuracy: false // Pegando localização precisa do usuário. Só funciona com GPS do celular ativo.
        });

        const { latitude, longitude } = coords; // Pegando a latitude e longitude das coordenadas passadas.

        setCurrentRegion({
          latitude,
          longitude,
          // Calculos de localização para zoom no mapa:
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }

    loadIniticalPosition();
  }, []); // Como o array está vazio, a função só vai ser executada uma vez, quando o componente for rodado em tela.

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  function setupWebSocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(
      latitude,
      longitude,
      techs
    );
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/devs/search', {
      // Passando informações através dos 'Query Params'.
      params: {
        latitude,
        longitude,
        techs
      }
    });

    setDevs(response.data.devs);
    setupWebSocket();
  }

  // Quando o teclado aparecer ele vai setar o estado de 'keyboardON' e a altura no 'setKeyboardSize'.
  Keyboard.addListener('keyboardDidShow', (event) => {
    setKeyboardON(true);
    setKeyboardSize(event.endCoordinates.height - 10); // Hackzinho pro teclado não ficar tão longe do input.
  });

  // Configurações quando o teclado sumir da tela.
  Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardON(false);
    setKeyboardSize(0);
  });

  // Quando o usuário mudar o mapa, a região também mudará.
  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  // Equanto não estivermos com a possisão do usuário, só será mostrado o mapa aleatoriamente.
  if (!currentRegion) {
    return null;
  }


  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        style={styles.map}
        onPress={() => Keyboard.dismiss()}
      >

        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1]
            }}>

            <Image
              style={styles.avatar}
              source={{ uri: dev.avatar_url }}
            />

            {/* O que estiver dentro desse componente, é o que será mostrado quando clicarmos no avatar */}
            <Callout onPress={() => navigation.navigate('Profile', { github_username: dev.github_username })}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Se o estado 'keyboardON' for true, ele vai aplicar um bottom do tamanho do teclado, senão ele volta para o estilo original */}
      <View style={keyboardON ? { bottom: keyboardSize } : styles.removeBottom}>
        <View style={styles.searchForm}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar devs por tecnologias..."
            placeholderTextColor="#999"
            autoCapitalize="words" // Cada palavra vai ficar com a primeira letra caixa auta.
            autoCorrect={false}
            value={techs}
            onChangeText={setTechs} // Altomaticamente o valor digitado vai ser passado para o 'setTechs'.
          />

          <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
            <MaterialIcons name='my-location' size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: 4
  },

  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },

  devBio: {
    color: '#666',
    marginTop: 5
  },

  devTechs: {
    marginTop: 5
  },

  searchForm: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 5,
    zIndex: 5,
    flexDirection: 'row'
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    // Sombras para IOS:
    shadowColor: '#000',
    shadowOpacity: 0.2,
    textShadowOffset: {
      width: 4,
      height: 4
    },
    // Sombras para Android:
    elevation: 5
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  },

  removeBottom: {
    bottom: 20
  }
});