import React, { useState } from 'react';

export const Posts = () => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [displayFormStatus, setDisplayFormStatus] = useState('block');
    const [displayDetailsStatus, setDisplayDetailsStatus] = useState('none');

    const handleSubmit = async (e) => {
        if (id === '') {
            alert(`Please insert an id`);
            return;
        }

        e.preventDefault();

        const response = await fetch(`https://shore-bronze-lip.glitch.me/posts/${id}`, {
            headers: new Headers({
                'Access-Control-Allow-Origin': '*',
            }),
            method: 'GET'
        });

        const data = await response.json();

        if (response.status === 404) {
            alert(`Post with id ${id} not found`);
            setId('');
        } else if (response.status === 400) {
            alert(`Bad request, review id`);
            setId('');
        } else if (data.title === undefined || data.body === undefined || data.title === null || data.body === null) {
            alert(`Error, post doesn't have a title or body`);
            setId('');
        } else {
            setTitle(data.title);
            setDescription(data.body);
            setDisplayFormStatus('none');
            setDisplayDetailsStatus('block')
        }
    }

    const handleBack = async (e) => {
        e.preventDefault();
        setDisplayFormStatus('block');
        setDisplayDetailsStatus('none');
        setId('');
        setTitle('');
        setDescription('');
    }

    return (
        <div className="row">
            <div style={{ margin: "auto", display: `${displayFormStatus}` }} className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input
                            type="number"
                            onChange={e => setId(e.target.value)}
                            value={id}
                            className="form-control"
                            placeholder="Post Id"
                            autoFocus
                        />
                    </div>
                    <button className="btn btn-primary btn-block">
                        Search
                    </button>
                </form>
            </div>
            <div style={{ margin: "auto", padding: "20px", marginTop: "20px", display: `${displayDetailsStatus}`, backgroundColor: "white" }} className="col-md-10">
                <form onSubmit={handleBack} className="card card-body">
                    <h2><b>Details</b></h2>
                    <h4>{title}</h4>
                    <textarea rows="5" cols="60" name="text" value={description}></textarea>
                    <button className="btn btn-primary btn-block">
                        Back
                    </button>
                </form>
            </div >
        </div >
    )
}