import React from 'react'

const UserCard = ({user}) => {
    const { firstName, lastName, about, photoUrl, age, skills } = user;

    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={user?.photoUrl}
                        alt="user-photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{user?.firstName} {user.lastName}</h2>
                    <p>{user?.about}</p>
                    <div>{user?.skills}</div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Interested</button>
                        <button className="btn btn-secondary">Ignore</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
