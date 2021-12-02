import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { 
	useAdaptivity,
	AppRoot,
	SplitLayout,
	SplitCol,
	ViewWidth,
	View,
	ModalRoot,
	PanelHeader,
	ScreenSpinner,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Main from './panels/Main';
import CardInfo from './panels/CardInfo';
import Favorites from './panels/Favorites';

import Filters from './Modals/Filters';
import SelectCity from './Modals/SelectCity';

import {STORAGE_KEYS} from './config';

import HeaderSlider from './components/HeaderSlider';


const App = () => {
	const { viewWidth, platform, VKCOM } = useAdaptivity();
	const isMobile = viewWidth <= ViewWidth.MOBILE;
	const hasHeader = platform !== VKCOM;
	const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;

	const [fetchedUser, setUser] = useState(null);
	const [userFavorites, setUserFavorites] = useState([]);
	const [selectedCard, setSelectedCard] = useState(-1);

	const [activePanel, setActivePanel] = useState(ROUTES.MAIN);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [modalHistory, setModalHistory] = useState([]);
	const [activeModal, setActiveModal] = useState(null);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const storageData = await bridge.send('VKWebAppStorageGet', {
				keys: Object.keys(STORAGE_KEYS)
			});

			const data = [];
			storageData.keys.forEach(({key, value}) => {
				try {
					data[key] = value ? JSON.parse(value) : {};

					switch(key) {
						case STORAGE_KEYS.FAVORITES: {
							if (data[key]) {
								if (!data[key].isArray()) data[key] = [];
								setUserFavorites(...data[key]);
							}
							break;
						}
					}
				} catch (error) {
					console.log(error);
				}
			});

			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
		console.log(e.currentTarget.dataset.to);
	};
	const _setActiveModal = e => {
		const modalName = e.currentTarget.dataset.modal;

		let _modalHistory = modalHistory ? [...modalHistory] : [];

		if (modalName === null) {
			_modalHistory = [];
		  } else if (_modalHistory.indexOf(modalName) !== -1) {
			_modalHistory = _modalHistory.splice(0, modalHistory.indexOf(modalName) + 1);
		  } else {
			_modalHistory.push(modalName);
		}

		setModalHistory(..._modalHistory);
		setActiveModal(modalName);
		console.log("modalName = ", modalName);
	}

	const modalBack = () => {
		setActiveModal(modalHistory[modalHistory.length - 2]);
	};

	const modal = (
		<ModalRoot activeModal={activeModal}>
			<Filters isMobile={isMobile} setActiveModal={_setActiveModal} modalBack={modalBack}/>
			<SelectCity isMobile={isMobile} setActiveModal={_setActiveModal} modalBack={modalBack}/>
		</ModalRoot>
	);

	return (
	  <AppRoot>
		<SplitLayout modal={modal} style={{ justifyContent: "center" }} header={hasHeader && <PanelHeader separator={false} />}>
		  <SplitCol           animate={!isDesktop}
          spaced={isDesktop}
          width={isDesktop ? '560px' : '100%'}
          maxWidth={isDesktop ? '560px' : '100%'}>
		  	<View activePanel={activePanel} popout={popout}>
				<Main id={ROUTES.MAIN} go={go} setActiveModal={_setActiveModal} setSelectedCard={setSelectedCard}/>
				<CardInfo id={ROUTES.CARDINFO} go={go} selectedCard={selectedCard}/>
				<Favorites id={ROUTES.FAVORITES} go={go} setActiveModal={_setActiveModal} favorites={userFavorites}/>
			</View>
		  </SplitCol>
		</SplitLayout>
	  </AppRoot>
	);
  };

  
export default App;

  
