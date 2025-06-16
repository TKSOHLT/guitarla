import React from 'react';

export default function Header(){

    return(
        //<> = fragment, tambien <Fragment> y tambien <React.Fragment>, entonces <> = <Fragment> = React.Fragment
        <React.Fragment>
            <h1>Hola {name}</h1>
        </React.Fragment>
    )
}