import React from 'react'

const FeedCard = ({ user }) => {
    const { firstName, lastName, photoUrl, about } = user;

    return (
        <div className="card bg-base-500 w-96 bg-black shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <p>{about}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    );
};

export default FeedCard;