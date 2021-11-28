import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';
import { 
	useAdaptivity,
	AppRoot,
	SplitLayout,
	SplitCol,
	ViewWidth,
	View,
	Panel,
	PanelHeader,
	PanelHeaderButton,
	ScreenSpinner,
	CardGrid,
	ContentCard,
	Group,
	Search,
	Tabbar,
	TabbarItem,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const Filter = ({id, go}) => {
	return (
        <Panel id={id}>
            <Header/>
            <Search/> 
            <Cards/>
            <Footer/>
        </Panel>
	);
  };

  Filter.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
}; 
  
export default Filter;

  