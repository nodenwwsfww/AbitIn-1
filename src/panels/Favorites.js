import React, {useState, useEffect} from 'react';
import {
    Placeholder,
    Panel,
    Search
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import HeaderSlider from '../components/HeaderSlider';
import FooterMain from '../components/FooterMain';
import {Icon20StarCircleFillGray} from '@vkontakte/icons';
import Cards from '../components/Cards';
const Favorites = ({id, go, setActiveModal, favoritiesIds, addToFavorites}) => {
    const [favorites, setFavorities] = useState([]);
    useEffect(() => {
        // тут типо получаем из бд по id из favoritiesId все нужные карточи и кладем их.
        
    });

    return (
        <Panel id={id}>
            <HeaderSlider setActiveModal={setActiveModal}/>
            <Search/>
            {!favorites.length &&
            <Placeholder
                icon={<Icon20StarCircleFillGray width={154.74} height={
                    148.61}/>}
            >
                Нет избранных вузов
            </Placeholder>
            }
            {favorites.length > 0 &&
            <Cards go={go} cards={favorites} addToFavorites={addToFavorites}/>
            }
            <FooterMain go={go} selectedText={ROUTES.FAVORITES}/>
        </Panel>
    );
};

Favorites.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    setActiveModal: PropTypes.func.isRequired,
    favoritiesIds: PropTypes.array.isRequired,
    addToFavorites: PropTypes.func.isRequired,
};

export default Favorites;
