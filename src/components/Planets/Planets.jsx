import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import './Planets.css'
import { Residents } from '../Residents/Residents';

const PlanetSpinner = () => {
    const data = new Array(12).fill(0);
    return (
        data.map((_, index) => (
            <div key={index} className="loading-spinner planet__card">
                <div className='planet__header loading'></div>

                <div className='planet__content loading'>
                    <div className="info__box loading">
                        <p className="loading"></p>
                    </div>
                    <div className="info__box loading">
                        <p className="loading"></p>
                    </div>
                    <div className="info__box loading">
                        <p className="loading"></p>
                    </div>
                </div>
            </div>
        ))
    )
};


export const Planet = () => {
    const [planetsData, setPlanetsData] = useState({
        planets: [],
        loading: true,
        error: null,
        previous: null,
        next: null,
    });

    const fetchPlanets = useCallback(async (url = 'https://swapi.dev/api/planets/?format=json') => {
        try {
            setPlanetsData((prevState) => ({ ...prevState, loading: true, error: null }));
            const response = await fetch(url);
            const data = await response.json();
            setPlanetsData((prevState) => ({
                ...prevState,
                loading: false,
                planets: data.results,
                previous: data.previous,
                next: data.next,
            }));
        } catch (error) {
            setPlanetsData((prevState) => ({ ...prevState, error: 'Error fetching planets', loading: false }));
        }
    }, [])

    useEffect(() => {
        fetchPlanets();
    }, [fetchPlanets]);

    return (
        <div className="planet__info">
            <h1 className='planets__directory__title'>Planets Directory</h1>

            <div className='planet__container'>
                {
                    planetsData.loading ? (
                        <PlanetSpinner />
                    ) : planetsData.error ? (
                        <span className="error-message">{planetsData.error}</span>
                    ) : (
                        planetsData.planets.map((planet) => <PlanetCard key={planet.name} planet={planet} loading={planetsData.loading} />)
                    )
                }

            </div>

            <div className='pagination'>
                <button disabled={!planetsData.previous}
                    className='prev__button'
                    onClick={() => {
                        fetchPlanets(planetsData.previous)
                    }}
                >Prev</button>
                <button disabled={!planetsData.next}
                    className='next__button'
                    onClick={() => {
                        fetchPlanets(planetsData.next)
                    }}

                >Next</button>
            </div>
        </div >
    )
}


const PlanetCard = ({ planet, loading = false }) => {
    return (
        <div className={`planet__card  ${loading ? 'simmer' : ''}`}>
            <div className='planet__header'>
                <div>
                    <span className='planet__header__title'>{planet.name}</span>
                    <div className='planet__header__info'>
                        <span><strong>Climate:</strong> {planet.climate}</span> |
                        <span><strong>Population:</strong> {planet.population}</span> |
                        <span><strong>Terrain:</strong> {planet.terrain}</span>
                    </div>
                </div>
            </div>
            <Residents planet={planet} />
        </div>
    );
};

PlanetCard.propTypes = {
    planet: PropTypes.object.isRequired,
    loading: PropTypes.bool,
};