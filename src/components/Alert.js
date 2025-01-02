import React from "react";

const myAlert = (type, message) => {
    return (
        <div className={'uk-alert-' + type} uk-alert="true">
            <a href class="uk-alert-close" uk-close="true">x</a>
            <p>{message}</p>
        </div>
    )
}

export default myAlert;