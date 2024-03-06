import { useEffect, useState } from "react";
import "./Residents.css";
import PropTypes from 'prop-types';


export const Residents = ({ planet }) => {
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchResidents = async () => {
            try {
                setLoading(true);
                const residentsData = await Promise.all(
                    planet.residents.map(async (residentUrl) => {
                        const response = await fetch(residentUrl);
                        return response.json();
                    })
                );
                setResidents(residentsData);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error('Error fetching residents:', error);
            }
        };

        fetchResidents();
    }, [planet.residents]);

    return (
        <div className="resident__container">
            {
                loading ? <ResidentSkeleton /> : <>

                    <h3 className="resident__title">Residents:</h3>
                    {
                        residents.length === 0 ? (
                            <span>No residents</span>
                        )
                            :
                            <>
                                <div className={`planet__resident`}>
                                    {
                                        residents.map((resident) => (
                                            <ResidentsCard key={resident.name} resident={resident} loading={loading} />
                                        ))
                                    }
                                </div>
                            </>
                    }
                </>
            }
        </div>
    )
}

const ResidentsCard = ({ resident }) => {
    return <div className={`resident__card`}>
        <div className={`resident__header`}>
            <span className={`resident__header__title`}>{resident.name}</span>
        </div>

        <div className={`resident__content`}>
            <div className="info__box">
                <p className="info__header__text">
                    <strong>Height:</strong>
                </p>
                <p className="info__value__text">{resident.height}</p>
            </div>

            <div className="info__box">
                <p className="info__header__text">
                    <strong>Mass:</strong>
                </p>
                <p className="info__value__text">{resident.mass}</p>
            </div>

            <div className="info__box">
                <p className="info__header__text">
                    <strong>Gender:</strong>
                </p>
                <p className="info__value__text">{resident.gender}</p>
            </div>
        </div>
    </div>
}

const ResidentSkeleton = () => {

    return <div className={`resident__card loading`}>
        <div className={`resident__header loading`}>
            <span className={`resident__header__title loading`}></span>
        </div>

        <div className={`resident__content loading`}>
            <div className="info__box loading">
                <p className="info__header__text loading">

                </p>
                <p className="info__value__text loading"></p>
            </div>

            <div className="info__box loading">
                <p className="info__header__text loading">
                </p>
                <p className="info__value__text loading"></p>
            </div>

            <div className="info__box loading">
                <p className="info__header__text loading">
                </p>
                <p className="info__value__text loading"></p>
            </div>
        </div>
    </div>
}

Residents.propTypes = {
    planet: PropTypes.object.isRequired,
};

ResidentsCard.propTypes = {
    resident: PropTypes.object.isRequired,
    loading: PropTypes.bool,
};
